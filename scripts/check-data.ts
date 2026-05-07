import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function checkData() {
  console.log('📊 Checking Airtable data...\n');

  // Check People
  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();
  console.log('People:', peopleData.records?.length || 0, 'records');
  peopleData.records?.forEach((r: any) => {
    console.log('  -', r.fields.name);
  });

  // Check Trips
  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();
  console.log('\nTrips:', tripsData.records?.length || 0, 'records');
  tripsData.records?.forEach((r: any) => {
    console.log('  -', r.fields.destination, '|', r.fields.person_name, '| status:', r.fields.status || 'none');
  });
}

checkData().catch(console.error);
