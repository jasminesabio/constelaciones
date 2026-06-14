import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  console.log('✨ Adding Daniel S...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields: { name: 'Daniel S.', home_city: 'Mexico City' } }),
  });
  if (!personRes.ok) { console.error('Failed:', await personRes.text()); return; }
  console.log('✓ Created Daniel S. (Mexico City)\n');

  const trips = [
    { destination: 'Madeira, Portugal', start_date: '2026-07-29', end_date: '2026-08-04' },
    { destination: 'London, UK',        start_date: '2026-08-04', end_date: '2026-08-10' },
  ];

  for (const trip of trips) {
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ fields: { ...trip, person_name: 'Daniel S.', status: 'approved' } }),
    });
    console.log(res.ok
      ? `✓ ${trip.destination} (${trip.start_date} → ${trip.end_date})`
      : `✗ Failed: ${await res.text()}`
    );
  }

  console.log('\n✅ Daniel S. added!');
}

run().catch(console.error);
