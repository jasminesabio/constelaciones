import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function cleanupPeople() {
  console.log('🧹 Cleaning up People table...\n');

  // Get all people
  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();

  console.log('Found', peopleData.records.length, 'people total\n');

  // Keep only Jasmine and Dan
  const keepNames = ['Jasmine', 'Dan', 'Jasmine Sabio', 'Dan Oved'];

  for (const person of peopleData.records) {
    const name = person.fields.name;

    if (!keepNames.includes(name)) {
      console.log('Deleting:', name);
      await fetch(`${BASE_URL}/People/${person.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
    } else {
      console.log('Keeping:', name);
    }
  }

  console.log('\n✅ Done! Only Jasmine and Dan remain');
}

cleanupPeople().catch(console.error);
