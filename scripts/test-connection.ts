import 'dotenv/config';

// Test Airtable connection
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;

console.log('🔍 Testing Airtable connection...\n');
console.log(`Base ID: ${BASE_ID}`);
console.log(`API Key: ${API_KEY?.substring(0, 10)}...${API_KEY?.substring(API_KEY.length - 5)}\n`);

const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function testConnection() {
  const tables = ['People', 'Trips', 'Tickets', 'Submissions'];

  for (const table of tables) {
    console.log(`Testing ${table} table...`);
    const url = `${BASE_URL}/${table}?maxRecords=1`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✓ ${table} - OK (${data.records?.length || 0} records found)`);
      } else {
        const error = await response.text();
        console.log(`✗ ${table} - ERROR ${response.status}: ${error}`);
      }
    } catch (error) {
      console.log(`✗ ${table} - FETCH ERROR:`, error);
    }
  }
}

testConnection().catch(console.error);
