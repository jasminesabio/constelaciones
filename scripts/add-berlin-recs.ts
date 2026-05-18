import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function run() {
  const res = await fetch(`${BASE_URL}/Recommendations`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        city: 'Berlin, Germany',
        category: 'drink',
        name: 'Berghain',
        description: 'Legendary techno club. Dress down, no photos inside.',
        submitted_by: 'Jasmine',
        status: 'approved',
      },
    }),
  });
  console.log(res.ok ? '✓ Berghain added' : `Failed: ${await res.text()}`);
}

run().catch(console.error);
