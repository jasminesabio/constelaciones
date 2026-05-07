import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function updateKarolinaCity() {
  console.log('🏙️  Updating Karolina\'s home city to Mexico City...\n');

  // 1. Get all people
  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();

  // 2. Find Karolina
  const karolina = peopleData.records.find((r: any) => r.fields.name === 'Karolina');

  if (!karolina) {
    console.error('Karolina not found in People table');
    return;
  }

  console.log('Found Karolina');
  console.log(`Current home city: ${karolina.fields.home_city || 'Not set'}\n`);

  // 3. Update home city
  const updateRes = await fetch(`${BASE_URL}/People/${karolina.id}`, {
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
    console.error('Failed to update Karolina:', await updateRes.text());
    return;
  }

  console.log('✓ Updated home city to: Mexico City, Mexico');
  console.log('\n✅ Karolina is now based in Mexico City!');
}

updateKarolinaCity().catch(console.error);
