import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function updateJasmineCity() {
  console.log('🌎 Updating Jasmine + Dan home city...\n');

  // Get Jasmine + Dan
  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();
  const jasmine = peopleData.records.find(
    (p: any) => p.fields.name === 'Jasmine + Dan' || p.fields.name === 'Jasmine'
  );

  if (!jasmine) {
    console.error('❌ Could not find Jasmine + Dan');
    return;
  }

  console.log(`Found: ${jasmine.fields.name}`);
  console.log(`Current city: ${jasmine.fields.home_city}`);

  // Update to Mexico City
  const updateRes = await fetch(`${BASE_URL}/People/${jasmine.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        home_city: 'Mexico City, Mexico',
      },
    }),
  });

  if (!updateRes.ok) {
    console.error('Failed to update:', await updateRes.text());
    return;
  }

  console.log('\n✓ Updated home city to: Mexico City, Mexico');
  console.log('✨ Done!');
}

updateJasmineCity().catch(console.error);
