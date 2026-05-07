import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function updateJasmineDanTrips() {
  console.log('🔄 Updating Jasmine + Dan trips...\n');

  // 1. Get all trips
  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();

  // 2. Find and update Madrid trip
  const madridTrip = tripsData.records.find((r: any) =>
    r.fields.person_name === 'Jasmine + Dan' && r.fields.destination === 'Madrid, Spain'
  );

  if (madridTrip) {
    console.log('Updating Madrid trip dates (May 11-15 → May 13-15)...');
    await fetch(`${BASE_URL}/Trips/${madridTrip.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          start_date: '2026-05-13',
          end_date: '2026-05-15',
        },
      }),
    });
    console.log('✓ Updated Madrid trip\n');
  }

  // 3. Add Paris trip
  console.log('Adding Paris trip (May 10-13)...');
  const parisTrip = {
    person_name: 'Jasmine + Dan',
    destination: 'Paris, France',
    start_date: '2026-05-10',
    end_date: '2026-05-13',
    event_tag: 'vacation',
    status: 'approved',
    notes: 'Paris before Madrid',
  };

  const parisRes = await fetch(`${BASE_URL}/Trips`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: parisTrip }),
  });

  if (!parisRes.ok) {
    console.error('Failed to create Paris trip:', await parisRes.text());
    return;
  }

  console.log('✓ Created Paris trip\n');
  console.log('✅ Done! Jasmine + Dan now have:');
  console.log('  - Paris, France (May 10-13)');
  console.log('  - Madrid, Spain (May 13-15)');
  console.log('  - Lisbon, Portugal (May 15-21)');
  console.log('  - Porto, Portugal (May 19-20)');
  console.log('  - Ibiza, Spain (May 22-24)');
}

updateJasmineDanTrips().catch(console.error);
