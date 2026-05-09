import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addChristina() {
  console.log('✨ Adding Christina to Constelaciones...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { name: 'Christina', home_city: 'TBD' } }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Christina:', await personRes.text());
    return;
  }
  console.log('✓ Created Christina\n');

  const trips = [
    { destination: 'Leuven, Belgium',       start_date: '2026-06-08', end_date: '2026-06-10' },
    { destination: 'Prague, Czech Republic', start_date: '2026-06-10', end_date: '2026-06-12' },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    console.log(`Creating: ${trip.destination} (${trip.start_date} to ${trip.end_date})`);
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { ...trip, person_name: 'Christina', status: 'approved' } }),
    });
    console.log(res.ok ? `✓ Created ${trip.destination}` : `Failed: ${await res.text()}`);
  }

  console.log('\n✅ Christina added successfully!');
  console.log('\n📅 Summary:');
  console.log('  - Leuven, Belgium: June 8–10');
  console.log('  - Prague, Czech Republic: June 10–12');
}

addChristina().catch(console.error);
