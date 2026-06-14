import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  console.log('✨ Adding Andrew...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields: { name: 'Andrew', home_city: 'Mexico City' } }),
  });
  if (!personRes.ok) { console.error('Failed:', await personRes.text()); return; }
  console.log('✓ Created Andrew (Mexico City)\n');

  const trips = [
    { destination: 'Istanbul, Turkey',       start_date: '2026-06-28', end_date: '2026-07-05', status: 'approved' },
    { destination: 'Cyprus',                 start_date: '2026-07-05', end_date: '2026-07-10', status: 'approved' },
    { destination: 'Berlin, Germany',        start_date: '2026-07-10', end_date: '2026-07-30', status: 'approved' },
    { destination: 'Garbicz Festival, Poland', start_date: '2026-07-30', end_date: '2026-08-04', status: 'approved', event_tag: 'festival', notes: 'July 30 – Aug 3/4' },
  ];

  for (const trip of trips) {
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ fields: { ...trip, person_name: 'Andrew' } }),
    });
    console.log(res.ok
      ? `✓ ${trip.destination} (${trip.start_date} → ${trip.end_date})`
      : `✗ Failed: ${await res.text()}`
    );
  }

  console.log('\n✅ Andrew added!');
}

run().catch(console.error);
