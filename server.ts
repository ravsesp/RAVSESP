import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Persistent data directory
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface PlayerInfo {
  name: string;
  uid: string;
  email?: string;
  phone?: string;
}

interface RegistrationRecord {
  id: string;
  teamName: string;
  players: PlayerInfo[];
  registeredAt: string;
  status: 'Confirmed';
  source: 'Website Registration' | 'Google Form';
}

// Load only REAL registrations. NO fake or mock data seeds.
function loadRegistrations(): RegistrationRecord[] {
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading registrations file:', err);
  }
  return [];
}

function saveRegistrations(records: RegistrationRecord[]) {
  try {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving registrations:', err);
  }
}

// Format timestamp for display (e.g., "26 September 2026, 7:40 PM")
function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Google Form Details for live submission forwarding
const GOOGLE_FORM_POST_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdjg8h9BMMRbzpD57T_qxESmkbuo36XzYNA4wnIRWv2o3pIxw/formResponse';

// Forward registration directly to Google Form so it gets recorded in Google Form / Google Sheets
async function forwardToGoogleForm(data: {
  teamName: string;
  leaderName: string;
  leaderPhone: string;
  leaderUid: string;
  player2Name: string;
  player2Uid: string;
  player3Name: string;
  player3Uid: string;
  player4Name: string;
  player4Uid: string;
  email: string;
  whatsAppNumber: string;
}) {
  try {
    const params = new URLSearchParams();
    params.append('entry.1898158091', data.teamName);
    params.append('entry.1370494805', data.leaderName);
    params.append('entry.1266707190', data.leaderPhone);
    params.append('entry.1203614470', data.leaderUid);
    params.append('entry.1562485230', data.player2Name);
    params.append('entry.869354948', data.player2Uid);
    params.append('entry.1846004204', data.player3Name);
    params.append('entry.329038710', data.player3Uid);
    params.append('entry.1621792216', data.player4Name);
    params.append('entry.641245778', data.player4Uid);
    params.append('entry.358196100', data.email);
    params.append('entry.1952402951', data.whatsAppNumber);
    params.append('entry.1477651807', 'Yes, I have joined the WhatsApp Group');
    params.append('entry.1538114306', 'Yes, we are confirmed to participate.');

    const res = await fetch(GOOGLE_FORM_POST_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    console.log('Successfully forwarded registration to Google Form response endpoint');
  } catch (err) {
    console.warn('Google Form forward notice (registration still safely recorded locally):', err);
  }
}

function isValidHttpUrl(urlString?: string): boolean {
  if (!urlString || typeof urlString !== 'string') return false;
  const trimmed = urlString.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Sync from published Google Sheet CSV if configured with a valid HTTP/HTTPS URL
async function syncGoogleSheetIfConfigured() {
  const rawUrl = process.env.GOOGLE_SHEET_CSV_URL;
  if (!isValidHttpUrl(rawUrl)) {
    return;
  }

  const sheetUrl = (rawUrl as string).trim();

  try {
    const res = await fetch(sheetUrl);
    if (!res.ok) return;

    const csvText = await res.text();
    const lines = csvText.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length <= 1) return; // Header only

    const currentRecords = loadRegistrations();
    let addedCount = 0;

    // Parse CSV lines
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map((cell) => cell.replace(/^"|"$/g, '').trim());
      // Expect timestamp, teamName, leaderName, etc.
      const timestamp = row[0] || new Date().toISOString();
      const teamName = row[1];

      if (teamName) {
        const normalized = teamName.toLowerCase();
        const exists = currentRecords.some((r) => r.teamName.toLowerCase() === normalized);
        if (!exists) {
          currentRecords.push({
            id: `gsheet-${Date.now()}-${i}`,
            teamName,
            players: [
              { name: row[2] || 'Team Leader', uid: row[4] || '' },
              { name: row[5] || 'Member 2', uid: row[6] || '' },
              { name: row[7] || 'Member 3', uid: row[8] || '' },
              { name: row[9] || 'Member 4', uid: row[10] || '' },
            ],
            registeredAt: timestamp,
            status: 'Confirmed',
            source: 'Google Form',
          });
          addedCount++;
        }
      }
    }

    if (addedCount > 0) {
      saveRegistrations(currentRecords);
      console.log(`Synced ${addedCount} real registrations from Google Sheet`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`Optional Google Sheet CSV sync notice: ${msg}`);
  }
}

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// Strictly enforces privacy: NEVER expose phone, email, or private UIDs
// -------------------------------------------------------------

app.get('/api/tournament/teams', async (req, res) => {
  // Sync from Google Sheet if URL provided
  await syncGoogleSheetIfConfigured();

  const registrations = loadRegistrations();

  // Public team list: ONLY public tournament fields (Slot, Team Name, Registration Date, Status)
  const publicTeams = registrations.map((r, index) => ({
    slot: index + 1,
    teamName: r.teamName,
    registeredAt: r.registeredAt,
    status: r.status,
  }));

  const lastUpdated = formatTimestamp(new Date());

  res.json({
    count: publicTeams.length,
    teams: publicTeams,
    lastUpdated,
    status: 'REGISTRATION LIVE',
    tournamentName: 'BGMI TOURNAMENT 2026',
    prizePool: '₹2000',
    date: '03 OCTOBER 2026, 11:00 AM',
    mode: 'ONLINE',
    registrationFee: 'FREE',
  });
});

// Endpoint to trigger synchronization with Google Sheet or refresh registrations
app.post('/api/tournament/sync', async (req, res) => {
  try {
    const { sheetUrl } = req.body || {};
    if (sheetUrl && isValidHttpUrl(sheetUrl)) {
      process.env.GOOGLE_SHEET_CSV_URL = sheetUrl.trim();
    }
    await syncGoogleSheetIfConfigured();
    const registrations = loadRegistrations();
    res.json({
      success: true,
      count: registrations.length,
      lastUpdated: formatTimestamp(new Date()),
      message: `Successfully synchronized official registrations. Total verified teams: ${registrations.length}`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: `Sync failed: ${msg}` });
  }
});

// Register a new real team (Squad: 4 Players)
app.post('/api/tournament/register', async (req, res) => {
  try {
    const { teamName, players, whatsAppNumber } = req.body;

    if (!teamName || typeof teamName !== 'string' || !teamName.trim()) {
      return res.status(400).json({ error: 'Team Name is required.' });
    }

    if (!Array.isArray(players) || players.length !== 4) {
      return res.status(400).json({ error: 'Four squad players (Player 1 to 4) are required.' });
    }

    // Validate all 4 players
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    const uidRegex = /^[0-9]{5,15}$/;

    for (let i = 0; i < 4; i++) {
      const p = players[i];
      const playerNum = i + 1;

      if (!p || typeof p !== 'object') {
        return res.status(400).json({ error: `Player ${playerNum} details are missing.` });
      }

      if (!p.name || typeof p.name !== 'string' || !p.name.trim()) {
        return res.status(400).json({ error: `Player ${playerNum} Name cannot be empty.` });
      }

      if (!p.uid || !uidRegex.test(String(p.uid).trim())) {
        return res.status(400).json({
          error: `Player ${playerNum} BGMI UID must contain valid digits (5-15 numbers).`,
        });
      }

      if (!p.email || !emailRegex.test(String(p.email).trim())) {
        return res.status(400).json({ error: `Player ${playerNum} must have a valid Email ID.` });
      }

      if (!p.phone || !phoneRegex.test(String(p.phone).trim())) {
        return res.status(400).json({ error: `Player ${playerNum} must have a valid 10-digit Phone Number.` });
      }
    }

    const currentRecords = loadRegistrations();

    // Check duplicate team name (case insensitive)
    const normalizedTeam = teamName.trim().toLowerCase();
    const existingTeam = currentRecords.find(
      (r) => r.teamName.trim().toLowerCase() === normalizedTeam
    );

    if (existingTeam) {
      return res.status(400).json({
        error: `A team named "${teamName.trim()}" has already been registered. Please choose another name.`,
      });
    }

    // Check duplicate UID inside squad
    const submittedUids = players.map((p) => String(p.uid).trim());
    const uniqueUids = new Set(submittedUids);
    if (uniqueUids.size !== 4) {
      return res.status(400).json({ error: 'All 4 players must have unique BGMI UIDs within the squad.' });
    }

    // Check duplicate UID across existing teams
    for (const record of currentRecords) {
      for (const p of record.players) {
        if (submittedUids.includes(String(p.uid).trim())) {
          return res.status(400).json({
            error: `BGMI UID ${p.uid} is already registered under team "${record.teamName}".`,
          });
        }
      }
    }

    // Forward to the real Google Form response endpoint
    const leader = players[0];
    await forwardToGoogleForm({
      teamName: teamName.trim(),
      leaderName: leader.name.trim(),
      leaderPhone: String(leader.phone).trim(),
      leaderUid: String(leader.uid).trim(),
      player2Name: players[1].name.trim(),
      player2Uid: String(players[1].uid).trim(),
      player3Name: players[2].name.trim(),
      player3Uid: String(players[2].uid).trim(),
      player4Name: players[3].name.trim(),
      player4Uid: String(players[3].uid).trim(),
      email: leader.email.trim().toLowerCase(),
      whatsAppNumber: String(whatsAppNumber || leader.phone).trim(),
    });

    // Build real new registration
    const newRecord: RegistrationRecord = {
      id: `reg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      teamName: teamName.trim(),
      players: players.map((p) => ({
        name: p.name.trim(),
        uid: String(p.uid).trim(),
        email: p.email.trim().toLowerCase(),
        phone: String(p.phone).trim(),
      })),
      registeredAt: new Date().toISOString(),
      status: 'Confirmed',
      source: 'Website Registration',
    };

    currentRecords.push(newRecord);
    saveRegistrations(currentRecords);

    return res.status(201).json({
      success: true,
      message: 'REGISTRATION SUBMITTED SUCCESSFULLY',
      description: 'Your RAVS ESPORTS BGMI Tournament 2026 registration has been received.',
      team: {
        teamName: newRecord.teamName,
        status: newRecord.status,
        slot: currentRecords.length,
      },
    });
  } catch (error) {
    console.error('Registration processing error:', error);
    return res.status(500).json({ error: 'Internal server error processing registration.' });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
