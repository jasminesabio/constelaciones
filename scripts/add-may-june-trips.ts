import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function addTrip(fields: object) {
  const res = await fetch(`${BASE_URL}/Trips`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields }),
  });
  const data = await res.json();
  if (res.ok) {
    console.log(`  ✓ ${(fields as any).destination} (${(fields as any).start_date} → ${(fields as any).end_date})`);
  } else {
    console.error(`  ✗ ${(fields as any).destination}: ${JSON.stringify(data)}`);
  }
}

async function addPerson(name: string, home_city: string) {
  const res = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ fields: { name, home_city } }),
  });
  if (res.ok) console.log(`✓ Created ${name}`);
  else console.error(`✗ Failed to create ${name}: ${await res.text()}`);
}

async function run() {
  // ── Jasmine + Dan: Paris June 3–5 ──────────────
  console.log('\nJasmine + Dan');
  await addTrip({
    person_name: 'Jasmine + Dan',
    destination: 'Paris, France',
    start_date: '2026-06-03',
    end_date: '2026-06-05',
    status: 'approved',
  });

  // ── Adrian ──────────────────────────────────────
  console.log('\nAdrian');
  await addPerson('Adrian', 'TBD');
  await addTrip({ person_name: 'Adrian', destination: 'Paris, France',      start_date: '2026-05-29', end_date: '2026-06-05', status: 'approved' });
  await addTrip({ person_name: 'Adrian', destination: 'Luxembourg City, Luxembourg', start_date: '2026-06-06', end_date: '2026-06-07', status: 'approved' });
  await addTrip({ person_name: 'Adrian', destination: 'Paris, France',      start_date: '2026-06-08', end_date: '2026-06-11', status: 'approved' });

  // ── Nadia ───────────────────────────────────────
  console.log('\nNadia');
  await addPerson('Nadia', 'TBD');
  await addTrip({ person_name: 'Nadia', destination: 'Nice / Monaco',  start_date: '2026-06-04', end_date: '2026-06-08', status: 'approved', notes: 'Formula 1 Grand Prix' });
  await addTrip({ person_name: 'Nadia', destination: 'Mallorca, Spain', start_date: '2026-06-08', end_date: '2026-06-12', status: 'approved' });

  console.log('\n✅ All done!');
}

run().catch(console.error);
