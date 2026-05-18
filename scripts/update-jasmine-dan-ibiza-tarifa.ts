import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function updateIbizaAddTarifa() {
  console.log('🔄 Updating Jasmine + Dan: Ibiza dates & adding Tarifa...\n');

  const tripsRes = await fetch(`${BASE_URL}/Trips`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const tripsData = await tripsRes.json();

  // Update Ibiza dates
  const ibizaTrip = tripsData.records.find((r: any) =>
    r.fields.person_name === 'Jasmine + Dan' && r.fields.destination === 'Ibiza, Spain'
  );

  if (ibizaTrip) {
    console.log('Updating Ibiza dates → May 22–28...');
    const res = await fetch(`${BASE_URL}/Trips/${ibizaTrip.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { start_date: '2026-05-22', end_date: '2026-05-28' } }),
    });
    console.log(res.ok ? '✓ Updated Ibiza\n' : `Failed: ${await res.text()}\n`);
  } else {
    console.log('⚠ Ibiza trip not found\n');
  }

  // Add Tarifa trip
  console.log('Adding Tarifa (May 28)...');
  const tarifaRes = await fetch(`${BASE_URL}/Trips`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        person_name: 'Jasmine + Dan',
        destination: 'Tarifa, Spain',
        start_date: '2026-05-28',
        end_date: '2026-05-28',
        event_tag: 'vacation',
        status: 'approved',
      },
    }),
  });
  console.log(tarifaRes.ok ? '✓ Created Tarifa\n' : `Failed: ${await tarifaRes.text()}\n`);

  console.log('✅ Done! Updated schedule:');
  console.log('  - Ibiza, Spain: May 22–28');
  console.log('  - Tarifa, Spain: May 28');
}

updateIbizaAddTarifa().catch(console.error);
