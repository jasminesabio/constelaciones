import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  console.log('✨ Adding Alfie...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields: { name: 'Alfie', home_city: 'Mexico City' } }),
  });
  if (!personRes.ok) { console.error('Failed to create Alfie:', await personRes.text()); return; }
  console.log('✓ Created Alfie (Mexico City)\n');

  const trips = [
    { destination: 'Malta',                          start_date: '2026-05-14', end_date: '2026-05-22', status: 'approved' },
    { destination: 'Sevilla, Spain',                 start_date: '2026-05-22', end_date: '2026-05-24', status: 'approved' },
    { destination: 'Morocco',                        start_date: '2026-05-24', end_date: '2026-06-06', status: 'approved', notes: 'Casablanca, Marrakech & Sahara desert' },
    { destination: 'Barcelona, Spain',               start_date: '2026-06-07', end_date: '2026-06-21', status: 'approved' },
    { destination: 'Switzerland',                    start_date: '2026-06-22', end_date: '2026-06-28', status: 'approved' },
    { destination: 'Paris, France',                  start_date: '2026-06-29', end_date: '2026-07-10', status: 'approved' },
    { destination: 'Slovenia',                       start_date: '2026-07-10', end_date: '2026-07-18', status: 'approved' },
    { destination: 'Hungary & Bratislava, Slovakia', start_date: '2026-07-19', end_date: '2026-07-28', status: 'approved' },
    { destination: 'Garbicz Festival, Poland',       start_date: '2026-07-29', end_date: '2026-08-06', status: 'approved', event_tag: 'festival' },
    { destination: 'Cologne & Berlin, Germany',      start_date: '2026-08-07', end_date: '2026-08-17', status: 'approved' },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ fields: { ...trip, person_name: 'Alfie' } }),
    });
    console.log(res.ok
      ? `✓ ${trip.destination} (${trip.start_date} → ${trip.end_date})`
      : `✗ Failed: ${await res.text()}`
    );
  }

  console.log('\n✅ Alfie added! 10 trips from May 14 – Aug 17');
}

run().catch(console.error);
