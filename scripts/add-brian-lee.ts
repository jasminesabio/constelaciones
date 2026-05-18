import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  console.log('✨ Adding Brian Lee...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields: { name: 'Brian Lee', home_city: 'Las Vegas, NV (temporary)' } }),
  });
  if (!personRes.ok) { console.error('Failed:', await personRes.text()); return; }
  console.log('✓ Created Brian Lee\n');

  const trips = [
    { destination: 'Mykonos, Greece', start_date: '2026-06-29', end_date: '2026-07-03' },
    { destination: 'Berlin, Germany', start_date: '2026-07-04', end_date: '2026-07-28' },
  ];

  for (const trip of trips) {
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ fields: { ...trip, person_name: 'Brian Lee', status: 'approved' } }),
    });
    console.log(res.ok ? `✓ ${trip.destination} (${trip.start_date} → ${trip.end_date})` : `✗ Failed: ${await res.text()}`);
  }

  console.log('\n✅ Done!');
}

run().catch(console.error);
