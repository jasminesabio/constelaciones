import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function updateCity() {
  const res = await fetch(`${BASE_URL}/People/rec2tvR4R6RmU9ptR`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { home_city: 'San Diego, CA' } }),
  });
  console.log(res.ok ? '✓ Updated home city to San Diego, CA' : `Failed: ${await res.text()}`);
}

updateCity().catch(console.error);
