import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addAnja() {
  console.log('✨ Adding Anja to Constelaciones...\n');

  // 1. Add Anja to People
  console.log('Creating person: Anja');
  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: 'Anja',
        home_city: 'Bay Area',
      },
    }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Anja:', await personRes.text());
    return;
  }

  console.log('✓ Created Anja\n');

  // 2. Add all trips
  const trips = [
    {
      person_name: 'Anja',
      destination: 'Bruck an der Großglocknerstraße, Austria',
      start_date: '2026-07-04',
      end_date: '2026-07-12',
      event_tag: 'vacation',
      status: 'approved',
      notes: 'Austria hiking trip',
    },
    {
      person_name: 'Anja',
      destination: 'Berlin, Germany',
      start_date: '2026-07-18',
      end_date: '2026-07-31',
      status: 'approved',
    },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    console.log(`Creating: ${trip.destination} (${trip.start_date} to ${trip.end_date})`);
    const tripRes = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: trip }),
    });

    if (!tripRes.ok) {
      console.error(`Failed to create ${trip.destination}:`, await tripRes.text());
    } else {
      console.log(`✓ Created ${trip.destination}`);
    }
  }

  console.log('\n✅ Anja and all trips added successfully!');
  console.log('\n📅 Summary:');
  console.log('  - Homebase: Bay Area');
  console.log('  - Austria hiking (Bruck an der Großglocknerstraße): July 4–12');
  console.log('  - Berlin: July 18–31');
}

addAnja().catch(console.error);
