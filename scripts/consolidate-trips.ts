import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function consolidateTrips() {
  console.log('🔄 Consolidating Jasmine & Dan\'s trips...\n');

  // 1. Get all trips
  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();

  // 2. Find Dan's trips and Jasmine's trips
  const danTrips = tripsData.records.filter((r: any) => r.fields.person_name === 'Dan');
  const jasmineTrips = tripsData.records.filter((r: any) => r.fields.person_name === 'Jasmine');

  console.log('Found', danTrips.length, 'Dan trips');
  console.log('Found', jasmineTrips.length, 'Jasmine trips\n');

  // 3. Delete Dan's separate trips
  for (const trip of danTrips) {
    console.log('Deleting Dan\'s trip:', trip.fields.destination);
    await fetch(`${BASE_URL}/Trips/${trip.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
  }

  // 4. Update Jasmine's trips to include Dan
  for (const trip of jasmineTrips) {
    const currentSharedWith = trip.fields.shared_with || '';
    const updatedSharedWith = currentSharedWith.includes('Dan') ? currentSharedWith : 'Dan';

    console.log('Updating', trip.fields.destination, '- adding Dan to shared_with');

    await fetch(`${BASE_URL}/Trips/${trip.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          shared_with: updatedSharedWith,
        },
      }),
    });
  }

  console.log('\n✅ Done! All trips are now under Jasmine with Dan in shared_with');
}

consolidateTrips().catch(console.error);
