import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addDaniel() {
  console.log('✨ Adding Daniel Ospina to Constelaciones...\n');

  // 1. Add Daniel to People
  console.log('Creating person: Daniel Ospina');
  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: 'Daniel Ospina',
        home_city: 'Mexico City, Mexico',
      },
    }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Daniel:', await personRes.text());
    return;
  }

  console.log('✓ Created Daniel Ospina\n');

  // 2. Add his Berlin trip
  console.log('Creating trip: Berlin');
  const trip = {
    person_name: 'Daniel Ospina',
    destination: 'Berlin, Germany',
    start_date: '2026-08-15',
    end_date: '2026-08-30',
    event_tag: 'vacation',
    status: 'approved',
  };

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

  console.log('✓ Created Berlin trip (August 15-30, 2026)');

  console.log('\n✅ Daniel Ospina added successfully!');
}

addDaniel().catch(console.error);
