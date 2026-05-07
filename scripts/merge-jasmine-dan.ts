import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function mergeJasmineDan() {
  console.log('🔄 Merging Jasmine + Dan into one person...\n');

  // 1. Get all people
  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();

  // 2. Find Jasmine and Dan
  const jasmine = peopleData.records.find((p: any) => p.fields.name === 'Jasmine');
  const dan = peopleData.records.find((p: any) => p.fields.name?.includes('Dan'));

  if (jasmine) {
    console.log('Updating Jasmine to "Jasmine + Dan"');
    await fetch(`${BASE_URL}/People/${jasmine.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          name: 'Jasmine + Dan',
          home_city: 'Boston, MA',
        },
      }),
    });
  }

  if (dan) {
    console.log('Deleting Dan Oved (merged into Jasmine + Dan)');
    await fetch(`${BASE_URL}/People/${dan.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
  }

  // 3. Update all Jasmine trips
  console.log('\nUpdating trips...');
  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();

  const jasmineTrips = tripsData.records.filter((r: any) => r.fields.person_name === 'Jasmine');

  for (const trip of jasmineTrips) {
    console.log(`  - ${trip.fields.destination}: updating to "Jasmine + Dan", removing shared_with`);

    await fetch(`${BASE_URL}/Trips/${trip.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          person_name: 'Jasmine + Dan',
          shared_with: null, // Remove shared_with field
        },
      }),
    });
  }

  console.log('\n✅ Done! Jasmine and Dan are now merged as "Jasmine + Dan"');
}

mergeJasmineDan().catch(console.error);
