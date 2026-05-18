import 'dotenv/config';

const BASE = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/People`;
const AUTH = { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`, 'Content-Type': 'application/json' };

const updates = [
  { id: 'recIaLBnyppdhiVFL', name: 'Nadia',  home_city: 'Miami, FL' },
  { id: 'reczjTCqUk9wIGab0', name: 'Adrian', home_city: 'Brooklyn, NY' },
];

async function run() {
  for (const u of updates) {
    const res = await fetch(`${BASE}/${u.id}`, {
      method: 'PATCH',
      headers: AUTH,
      body: JSON.stringify({ fields: { home_city: u.home_city } }),
    });
    console.log(res.ok ? `✓ ${u.name} → ${u.home_city}` : `✗ ${u.name}: ${await res.text()}`);
  }
}

run().catch(console.error);
