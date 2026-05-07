import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function debugOverlaps() {
  console.log('🔍 Debugging overlaps...\n');

  // Get all approved trips
  const tripsRes = await fetch(`${BASE_URL}/Trips?filterByFormula={status}="approved"`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();
  const trips = tripsData.records;

  console.log(`Found ${trips.length} approved trips:\n`);

  trips.forEach((trip: any, i: number) => {
    console.log(`${i + 1}. ${trip.fields.person_name || 'Unknown'}`);
    console.log(`   Destination: ${trip.fields.destination}`);
    console.log(`   Dates: ${trip.fields.start_date} to ${trip.fields.end_date}`);
    console.log('');
  });

  // Calculate overlaps
  console.log('Checking for overlaps...\n');
  let overlapCount = 0;

  for (let i = 0; i < trips.length; i++) {
    for (let j = i + 1; j < trips.length; j++) {
      const trip1 = trips[i].fields;
      const trip2 = trips[j].fields;

      // Check if same destination
      if (trip1.destination === trip2.destination) {
        const start1 = new Date(trip1.start_date);
        const end1 = new Date(trip1.end_date);
        const start2 = new Date(trip2.start_date);
        const end2 = new Date(trip2.end_date);

        // Check if dates overlap
        if (start1 <= end2 && start2 <= end1) {
          const person1 = trip1.person_name || 'Unknown';
          const person2 = trip2.person_name || 'Unknown';

          // Don't show overlaps for the same person
          if (person1 === person2) {
            console.log(`⚠️  Same person (${person1}) at ${trip1.destination} - skipping`);
            continue;
          }

          const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()));
          const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()));

          overlapCount++;
          console.log(`✨ OVERLAP #${overlapCount}:`);
          console.log(`   ${trip1.destination}`);
          console.log(`   ${person1} ↔ ${person2}`);
          console.log(`   ${overlapStart.toISOString().split('T')[0]} to ${overlapEnd.toISOString().split('T')[0]}`);
          console.log('');
        }
      }
    }
  }

  if (overlapCount === 0) {
    console.log('❌ No overlaps found');
  }
}

debugOverlaps().catch(console.error);
