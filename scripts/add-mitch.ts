import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addMitch() {
  console.log('✨ Adding Mitch to Constelaciones...\n');

  // 1. Add Mitch to People
  console.log('Creating person: Mitch');
  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: 'Mitch',
        home_city: 'TBD', // Update if you know Mitch's home city
      },
    }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Mitch:', await personRes.text());
    return;
  }

  console.log('✓ Created Mitch\n');

  // 2. Add Lisbon trip
  console.log('Creating trip: Lisbon');
  const trip = {
    person_name: 'Mitch',
    destination: 'Lisbon, Portugal',
    start_date: '2026-05-09',
    end_date: '2026-05-16',
    event_tag: 'work',
    status: 'approved',
    notes: 'Work trip',
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
    return;
  }

  console.log('✓ Created Lisbon trip (May 9-16, 2026)');
  console.log('\n✅ Mitch added successfully!');
  console.log('\n🔍 This overlaps with Jasmine + Dan in Lisbon (May 15-21)!');
}

addMitch().catch(console.error);
