import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function consolidatePeople() {
  console.log('🔄 Consolidating duplicate people...\n');

  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();

  const people = peopleData.records;

  // Find duplicates
  const jasmines = people.filter((p: any) => p.fields.name?.includes('Jasmine'));
  const dans = people.filter((p: any) => p.fields.name?.includes('Dan'));

  console.log('Found', jasmines.length, 'Jasmine records');
  console.log('Found', dans.length, 'Dan records\n');

  // Keep the first Jasmine, delete others
  if (jasmines.length > 1) {
    for (let i = 1; i < jasmines.length; i++) {
      console.log('Deleting duplicate:', jasmines[i].fields.name);
      await fetch(`${BASE_URL}/People/${jasmines[i].id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
    }
  }

  // Keep the first Dan, delete others
  if (dans.length > 1) {
    for (let i = 1; i < dans.length; i++) {
      console.log('Deleting duplicate:', dans[i].fields.name);
      await fetch(`${BASE_URL}/People/${dans[i].id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
    }
  }

  console.log('\n✅ Done! Now just one Jasmine and one Dan');
}

consolidatePeople().catch(console.error);
