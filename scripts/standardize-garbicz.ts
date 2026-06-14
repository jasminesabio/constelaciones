import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  const res = await fetch(
    `${BASE_URL}/Trips?filterByFormula=FIND("Garbicz",{destination})`,
    { headers: HEADERS }
  );
  const data = await res.json();
  const trips = data.records ?? [];

  console.log(`Found ${trips.length} Garbicz trips:\n`);
  trips.forEach((t: any) => console.log(`  ${t.fields.person_name}: ${t.fields.destination} (${t.fields.start_date} → ${t.fields.end_date})`));

  console.log('\nStandardizing to: Garbicz Festival, Poland · July 30 – Aug 3 · festival · approved\n');

  for (const trip of trips) {
    const update = await fetch(`${BASE_URL}/Trips/${trip.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({
        fields: {
          destination: 'Garbicz Festival, Poland',
          start_date: '2026-07-30',
          end_date: '2026-08-03',
          event_tag: 'festival',
          status: 'approved',
        },
      }),
    });
    console.log(update.ok
      ? `✓ ${trip.fields.person_name}`
      : `✗ ${trip.fields.person_name}: ${await update.text()}`
    );
  }

  console.log('\n✅ All Garbicz trips standardized!');
}

run().catch(console.error);
