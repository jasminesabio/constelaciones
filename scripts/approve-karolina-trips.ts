import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function approveKarolinaTrips() {
  console.log('✨ Approving Karolina\'s pending trips...\n');

  // 1. Get all trips
  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();

  // 2. Find Karolina's pending trips
  const karolinaPendingTrips = tripsData.records.filter((r: any) =>
    r.fields.person_name === 'Karolina' && r.fields.status === 'pending'
  );

  console.log(`Found ${karolinaPendingTrips.length} pending trips for Karolina\n`);

  // 3. Update each one to approved
  for (const trip of karolinaPendingTrips) {
    const destination = trip.fields.destination;
    console.log(`Approving: ${destination}`);

    const updateRes = await fetch(`${BASE_URL}/Trips/${trip.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          status: 'approved',
        },
      }),
    });

    if (!updateRes.ok) {
      console.error(`Failed to approve ${destination}:`, await updateRes.text());
    } else {
      console.log(`✓ Approved ${destination}`);
    }
  }

  console.log('\n✅ All pending trips approved!');
  console.log('\n📅 Karolina now has all 13 trips confirmed:');
  console.log('  - Rome, Italy (May 28-31)');
  console.log('  - Sicily, Italy (June 1-7)');
  console.log('  - Lisbon, Portugal (June 8-24)');
  console.log('  - Gstaad, Switzerland (June 25-28)');
  console.log('  - Goat Festival (June 29 - July 5)');
  console.log('  - Berlin, Germany (July 6-17)');
  console.log('  - Ibiza, Spain (July 18-26)');
  console.log('  - Berlin, Germany (July 27-31)');
  console.log('  - Garbicz Festival, Poland (July 31 - Aug 2)');
  console.log('  - Berlin, Germany (Aug 3-9)');
  console.log('  - Eclipse Festival (Aug 10-14)');
  console.log('  - Berlin, Germany (Aug 15-23)');
  console.log('  - Ibiza, Spain (Aug 24-31)');
}

approveKarolinaTrips().catch(console.error);
