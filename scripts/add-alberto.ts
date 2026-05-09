import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addAlberto() {
  console.log('✨ Adding Alberto to Constelaciones...\n');

  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { name: 'Alberto', home_city: 'TBD' } }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Alberto:', await personRes.text());
    return;
  }
  console.log('✓ Created Alberto\n');

  const trips = [
    {
      destination: 'Spain / Portugal',
      start_date: '2026-07-15',
      end_date: '2026-08-15',
      notes: 'Mid-July through August 15 — exact cities TBD',
    },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    console.log(`Creating: ${trip.destination} (${trip.start_date} to ${trip.end_date})`);
    const res = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { ...trip, person_name: 'Alberto', status: 'approved' } }),
    });
    console.log(res.ok ? `✓ Created ${trip.destination}` : `Failed: ${await res.text()}`);
  }

  console.log('\n✅ Alberto added successfully!');
  console.log('\n📅 Summary:');
  console.log('  - Spain / Portugal: July 15–August 15');
}

addAlberto().catch(console.error);
