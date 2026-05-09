import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addSamMike() {
  console.log('✨ Adding Sam & Mike to Constelaciones...\n');

  console.log('Creating person: Sam & Mike');
  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: 'Sam & Mike',
        home_city: 'Mexico City',
      },
    }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Sam & Mike:', await personRes.text());
    return;
  }

  console.log('✓ Created Sam & Mike\n');

  const trips = [
    {
      person_name: 'Sam & Mike',
      destination: 'Madrid, Spain',
      start_date: '2026-05-16',
      end_date: '2026-05-22',
      status: 'approved',
    },
    {
      person_name: 'Sam & Mike',
      destination: 'Ibiza, Spain',
      start_date: '2026-05-22',
      end_date: '2026-05-25',
      status: 'approved',
    },
    {
      person_name: 'Sam & Mike',
      destination: 'Valencia, Spain',
      start_date: '2026-05-25',
      end_date: '2026-05-31',
      status: 'approved',
    },
    {
      person_name: 'Sam & Mike',
      destination: 'Paris, France',
      start_date: '2026-06-01',
      end_date: '2026-06-03',
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

  console.log('\n✅ Sam & Mike and all trips added successfully!');
  console.log('\n📅 Summary:');
  console.log('  - Homebase: Mexico City');
  console.log('  - Madrid: May 16–22');
  console.log('  - Ibiza: May 22–25');
  console.log('  - Valencia: May 25–31');
  console.log('  - Paris: June 1–3');
}

addSamMike().catch(console.error);
