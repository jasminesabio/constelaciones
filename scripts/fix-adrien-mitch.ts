import 'dotenv/config';

const BASE = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/People`;
const AUTH = { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  // Find Mitch's ID
  const res = await fetch(`${BASE}`, { headers: AUTH });
  const data = await res.json();
  const mitch = data.records?.find((r: any) => r.fields.name === 'Mitch');

  const updates = [
    { id: 'reczjTCqUk9wIGab0', fields: { name: 'Adrien' } },
    { id: mitch?.id, fields: { home_city: 'Mexico City' } },
  ];

  for (const u of updates) {
    if (!u.id) { console.log('⚠ Could not find Mitch'); continue; }
    const r = await fetch(`${BASE}/${u.id}`, {
      method: 'PATCH', headers: AUTH,
      body: JSON.stringify({ fields: u.fields }),
    });
    const label = Object.entries(u.fields).map(([k, v]) => `${k} → ${v}`).join(', ');
    console.log(r.ok ? `✓ ${label}` : `✗ ${await r.text()}`);
  }
}

run().catch(console.error);
