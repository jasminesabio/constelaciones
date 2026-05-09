import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addDiegoFernanda() {
  console.log('✨ Adding Diego & Fernanda to Constelaciones...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { name: 'Diego & Fernanda', home_city: 'TBD' } }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Diego & Fernanda:', await personRes.text());
    return;
  }
  console.log('✓ Created Diego & Fernanda\n');

  const trips = [
    { destination: 'Rome, Italy',   start_date: '2026-05-08', end_date: '2026-05-10' },
    { destination: 'Athens, Greece', start_date: '2026-05-10', end_date: '2026-05-12' },
    { destination: 'Corfu, Greece',  start_date: '2026-05-12', end_date: '2026-05-18' },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    console.log(`Creating: ${trip.destination} (${trip.start_date} to ${trip.end_date})`);
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { ...trip, person_name: 'Diego & Fernanda', status: 'approved' } }),
    });
    console.log(res.ok ? `✓ Created ${trip.destination}` : `Failed: ${await res.text()}`);
  }

  console.log('\n✅ Diego & Fernanda added successfully!');
  console.log('\n📅 Summary:');
  console.log('  - Rome, Italy: May 8–10');
  console.log('  - Athens, Greece: May 10–12');
  console.log('  - Corfu, Greece: May 12–18');
}

addDiegoFernanda().catch(console.error);
