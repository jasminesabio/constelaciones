import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function cleanupTrips() {
  console.log('🧹 Cleaning up Trips table...\n');

  // Get all trips
  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();

  console.log('Found', tripsData.records.length, 'trips total\n');

  // Keep only Jasmine's approved trips
  for (const trip of tripsData.records) {
    const personName = trip.fields.person_name;
    const status = trip.fields.status;
    const destination = trip.fields.destination;

    if (personName === 'Jasmine' && status === 'approved') {
      console.log('Keeping:', destination, '(Jasmine, approved)');
    } else {
      console.log('Deleting:', destination, `(${personName || 'no person'}, ${status || 'no status'})`);
      await fetch(`${BASE_URL}/Trips/${trip.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
    }
  }

  console.log('\n✅ Done! Only your 4 trips with Dan remain');
}

cleanupTrips().catch(console.error);
