import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  console.log('✨ Adding Chris F...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields: { name: 'Chris F.', home_city: 'Mexico City' } }),
  });
  if (!personRes.ok) { console.error('Failed:', await personRes.text()); return; }
  console.log('✓ Created Chris F. (Mexico City)\n');

  const trips = [
    {
      destination: 'El Cuyo, Yucatán',
      start_date: '2026-06-18', end_date: '2026-07-05',
      status: 'approved',
    },
    {
      destination: 'LA Roadtrip',
      start_date: '2026-07-08', end_date: '2026-07-12',
      status: 'approved',
      notes: 'Via Monterey — picking up the Mustang',
    },
    {
      destination: 'Berlin, Germany',
      start_date: '2026-07-25', end_date: '2026-07-30',
      status: 'approved',
    },
    {
      destination: 'Garbicz Festival, Poland',
      start_date: '2026-07-30', end_date: '2026-08-03',
      status: 'approved', event_tag: 'festival',
    },
    {
      destination: 'Berlin, Germany',
      start_date: '2026-08-03', end_date: '2026-08-09',
      status: 'approved',
    },
    {
      destination: 'Ibiza, Spain',
      start_date: '2026-08-09', end_date: '2026-08-16',
      status: 'approved',
    },
    {
      destination: 'Los Angeles, CA',
      start_date: '2026-08-23', end_date: '2026-08-28',
      status: 'approved',
    },
    {
      destination: 'Burning Man, Nevada',
      start_date: '2026-08-29', end_date: '2026-09-07',
      status: 'approved', event_tag: 'festival',
    },
    {
      destination: 'Lake Tahoe, CA',
      start_date: '2026-09-07', end_date: '2026-09-11',
      status: 'approved',
    },
    {
      destination: 'Los Angeles, CA',
      start_date: '2026-09-11', end_date: '2026-09-13',
      status: 'approved',
    },
    {
      destination: 'Boda de Muertos',
      start_date: '2026-10-24', end_date: '2026-10-26',
      status: 'approved', event_tag: 'festival',
    },
    {
      destination: 'Hamburg, Germany',
      start_date: '2027-05-08', end_date: '2027-05-09',
      status: 'approved',
      notes: 'Berlin Philharmonic concert',
    },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ fields: { ...trip, person_name: 'Chris F.' } }),
    });
    console.log(res.ok
      ? `✓ ${trip.destination} (${trip.start_date} → ${trip.end_date})`
      : `✗ Failed: ${await res.text()}`
    );
  }

  console.log(`\n✅ Chris F. added! 12 trips from Jun 2026 – May 2027`);
}

run().catch(console.error);
