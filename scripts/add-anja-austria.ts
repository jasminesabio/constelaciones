import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addAustriaTrip() {
  const res = await fetch(`${BASE_URL}/Trips`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        person_name: 'Anja',
        destination: 'Bruck an der Großglocknerstraße, Austria',
        start_date: '2026-07-04',
        end_date: '2026-07-12',
        event_tag: 'vacation',
        status: 'approved',
        notes: 'Austria hiking trip',
      },
    }),
  });
  console.log(res.ok ? '✓ Austria trip created' : `Failed: ${await res.text()}`);
}

addAustriaTrip().catch(console.error);
