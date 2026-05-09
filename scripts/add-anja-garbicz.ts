import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addAnjаGarbicz() {
  const res = await fetch(`${BASE_URL}/Trips`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        person_name: 'Anja',
        destination: 'Garbicz Festival, Poland',
        start_date: '2026-07-31',
        end_date: '2026-08-02',
        event_tag: 'festival',
        status: 'pending',
        notes: 'Has ticket, selling for €345',
      },
    }),
  });
  console.log(res.ok ? '✓ Garbicz trip created for Anja' : `Failed: ${await res.text()}`);
}

addAnjаGarbicz().catch(console.error);
