import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addSouk28() {
  console.log('✨ Adding Souk 28 Vintage to recommendations...\n');

  const recommendation = {
    city: 'Essaouira, Morocco',
    category: 'see',
    name: 'Souk 28 Vintage',
    description: 'Vintage shop in Essaouira',
    status: 'approved',
  };

  const response = await fetch(`${BASE_URL}/Recommendations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: recommendation }),
  });

  if (!response.ok) {
    console.error('Failed to create recommendation:', await response.text());
    return;
  }

  console.log('✓ Added Souk 28 Vintage to Essaouira, Morocco');
  console.log('\n✅ Recommendation added successfully!');
}

addSouk28().catch(console.error);
