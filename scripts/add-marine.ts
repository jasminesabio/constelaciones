import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addMarine() {
  console.log('✨ Adding Marine to Constelaciones...\n');

  // 1. Add Marine to People
  console.log('Creating person: Marine');
  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: 'Marine',
        home_city: 'Mexico City, Mexico',
      },
    }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Marine:', await personRes.text());
    return;
  }

  console.log('✓ Created Marine\n');

  // 2. Add her trips
  const trips = [
    {
      person_name: 'Marine',
      destination: 'Barcelona, Spain',
      start_date: '2026-06-08',
      end_date: '2026-06-12',
      event_tag: 'vacation',
      status: 'approved',
    },
    {
      person_name: 'Marine',
      destination: 'Madrid, Spain',
      start_date: '2026-06-12',
      end_date: '2026-06-18',
      event_tag: 'vacation',
      status: 'approved',
    },
    {
      person_name: 'Marine',
      destination: 'Marseille, France',
      start_date: '2026-06-18',
      end_date: '2026-06-20',
      event_tag: 'vacation',
      status: 'approved',
    },
  ];

  console.log('Creating trips...');
  for (const trip of trips) {
    console.log(`  - ${trip.destination} (${trip.start_date} to ${trip.end_date})`);

    const tripRes = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: trip }),
    });

    if (!tripRes.ok) {
      console.error('Failed to create trip:', await tripRes.text());
    }
  }

  console.log('\n✅ Marine added successfully!');
  console.log('   3 trips: Barcelona → Madrid → Marseille');
}

addMarine().catch(console.error);
