import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function testQuery() {
  const filterFormula = `{status} = "approved"`;
  const params = new URLSearchParams();
  params.append('filterByFormula', filterFormula);

  const url = `${BASE_URL}/Trips?${params}`;
  console.log('🔍 Testing query:', url);
  console.log();

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  const data = await response.json();
  console.log('Response status:', response.status);
  console.log('Records found:', data.records?.length || 0);
  console.log();

  data.records?.forEach((r: any, i: number) => {
    console.log(`${i + 1}. ${r.fields.destination} - ${r.fields.person_name}`);
    console.log('   Status:', r.fields.status);
    console.log('   Fields:', Object.keys(r.fields).join(', '));
    console.log();
  });
}

testQuery().catch(console.error);
