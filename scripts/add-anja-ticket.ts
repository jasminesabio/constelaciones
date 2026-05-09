import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addAnjaTicket() {
  // Look up Anja's person ID
  const peopleRes = await fetch(
    `${BASE_URL}/People?filterByFormula={name}="Anja"`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );
  const peopleData = await peopleRes.json();
  const anja = peopleData.records?.[0];

  if (!anja) {
    console.error('Could not find Anja in People table');
    return;
  }

  console.log(`Found Anja: ${anja.id}`);

  const ticketRes = await fetch(`${BASE_URL}/Tickets`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        event_name: 'Garbicz Festival',
        event_date: '2026-07-31',
        event_location: 'Garbicz, Poland',
        seller_id: [anja.id],
        asking_price: '€345',
        status: 'available',
        notes: 'Anja is selling her ticket',
      },
    }),
  });

  if (!ticketRes.ok) {
    console.error('Failed to create ticket:', await ticketRes.text());
    return;
  }

  console.log('✓ Garbicz ticket listed for Anja (€345, available)');
}

addAnjaTicket().catch(console.error);
