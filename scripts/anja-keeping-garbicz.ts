import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function run() {
  // 1. Delete the ticket listing
  const ticketsRes = await fetch(`${BASE_URL}/Tickets`, { headers: HEADERS });
  const ticketsData = await ticketsRes.json();
  const ticket = ticketsData.records?.find((r: any) =>
    r.fields.event_name === 'Garbicz Festival' && r.fields.asking_price === '€345'
  );

  if (ticket) {
    const del = await fetch(`${BASE_URL}/Tickets/${ticket.id}`, { method: 'DELETE', headers: HEADERS });
    console.log(del.ok ? '✓ Ticket listing removed' : `Failed to delete ticket: ${await del.text()}`);
  } else {
    console.log('⚠ Ticket not found');
  }

  // 2. Update Anja's Garbicz trip to approved
  const tripsRes = await fetch(`${BASE_URL}/Trips?filterByFormula=AND({person_name}="Anja",{destination}="Garbicz Festival, Poland")`, { headers: HEADERS });
  const tripsData = await tripsRes.json();
  const trip = tripsData.records?.[0];

  if (trip) {
    const update = await fetch(`${BASE_URL}/Trips/${trip.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ fields: { status: 'approved', notes: '' } }),
    });
    console.log(update.ok ? '✓ Garbicz trip marked approved' : `Failed to update trip: ${await update.text()}`);
  } else {
    console.log('⚠ Garbicz trip not found');
  }
}

run().catch(console.error);
