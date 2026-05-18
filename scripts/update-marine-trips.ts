import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  // 1. Find existing Marine trips and delete them
  const tripsRes = await fetch(
    `${BASE_URL}/Trips?filterByFormula={person_name}="Marine"`,
    { headers: HEADERS }
  );
  const tripsData = await tripsRes.json();
  const existing = tripsData.records ?? [];

  console.log(`Found ${existing.length} existing trips — deleting...\n`);
  for (const trip of existing) {
    const del = await fetch(`${BASE_URL}/Trips/${trip.id}`, { method: 'DELETE', headers: HEADERS });
    console.log(del.ok ? `✓ Deleted: ${trip.fields.destination}` : `✗ Failed to delete ${trip.id}`);
  }

  // 2. Add new trips
  const trips = [
    { destination: 'Barcelona, Spain',         start_date: '2026-06-08', end_date: '2026-06-12', status: 'approved' },
    { destination: 'Madrid, Spain',             start_date: '2026-06-12', end_date: '2026-06-15', status: 'approved' },
    { destination: 'Marseille, France',         start_date: '2026-06-15', end_date: '2026-06-19', status: 'approved' },
    { destination: 'Montpellier, France',       start_date: '2026-06-19', end_date: '2026-06-29', status: 'approved' },
    { destination: 'Paris, France',             start_date: '2026-06-29', end_date: '2026-07-04', status: 'approved' },
    { destination: 'Sardinia / Corsica',        start_date: '2026-07-04', end_date: '2026-07-14', status: 'approved', notes: 'Sailing trip' },
    { destination: 'TBC',                       start_date: '2026-07-14', end_date: '2026-07-17', status: 'pending',  notes: 'TBC' },
    { destination: 'Bordeaux / Pyla, France',   start_date: '2026-07-17', end_date: '2026-07-26', status: 'approved' },
    { destination: 'Paris, France',             start_date: '2026-07-27', end_date: '2026-08-01', status: 'approved' },
  ];

  console.log('\nCreating new trips...\n');
  for (const trip of trips) {
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ fields: { ...trip, person_name: 'Marine' } }),
    });
    console.log(res.ok
      ? `✓ ${trip.destination} (${trip.start_date} → ${trip.end_date})`
      : `✗ Failed: ${await res.text()}`
    );
  }

  console.log('\n✅ Marine\'s trips updated!');
}

run().catch(console.error);
