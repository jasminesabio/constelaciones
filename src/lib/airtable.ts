// Access environment variables - works for both local dev and Netlify
const BASE_ID = process.env.AIRTABLE_BASE_ID || import.meta.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY || import.meta.env.AIRTABLE_API_KEY;

const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

type AirtableRecord<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

export type Person = {
  id: string;
  name: string;
  home_city: string;
  avatar_url?: string;
  contact_handles?: string;
  last_updated?: string;
};

export type Flight = {
  airline?: string;
  flight_number?: string;
  departure_airport?: string;
  departure_time?: string;
  arrival_airport?: string;
  arrival_time?: string;
  booking_ref?: string;
  status?: 'booked' | 'TBD';
};

export type Accommodation = {
  name?: string;
  address?: string;
  type?: 'hotel' | 'apartment' | 'friend' | 'hostel' | 'other';
  notes?: string;
  status?: 'booked' | 'TBD' | 'options';
};

export type Event = {
  name: string;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
};

export type Trip = {
  id: string;
  person_id?: string;
  person_name?: string;
  destination: string;
  start_date: string;
  end_date: string;
  event_tag?: string;
  notes?: string;
  status?: 'pending' | 'approved' | 'rejected';
  last_updated?: string;

  // Enriched fields
  flight_to?: string; // JSON string of Flight
  flight_from?: string; // JSON string of Flight
  accommodation?: string; // JSON string of Accommodation
  events?: string; // JSON string of Event[]
  shared_with?: string; // Comma-separated person names
};

export type Ticket = {
  id: string;
  event_name: string;
  event_date: string;
  event_location: string;
  seller_id?: string;
  asking_price: string;
  status?: 'available' | 'claimed' | 'sold';
  notes?: string;
  last_updated?: string;
};

export type Submission = {
  id: string;
  type: string;
  submitter_name: string;
  submitter_contact: string;
  payload: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
};

async function fetchAirtable<T>(
  tableName: string,
  options: { view?: string; filterByFormula?: string } = {}
): Promise<AirtableRecord<T>[]> {
  const params = new URLSearchParams();
  if (options.view) params.append('view', options.view);
  if (options.filterByFormula) params.append('filterByFormula', options.filterByFormula);

  const url = `${BASE_URL}/${tableName}?${params}`;

  console.log(`[Airtable] Fetching ${tableName}...`, {
    baseUrl: BASE_URL?.substring(0, 30),
    hasApiKey: !!API_KEY
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  console.log(`[Airtable] Response for ${tableName}:`, response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Airtable error: ${response.status}`, errorText);
    return [];
  }

  const data = await response.json();
  console.log(`[Airtable] Got ${data.records?.length || 0} records from ${tableName}`);
  return data.records || [];
}

export async function getPeople(): Promise<Person[]> {
  const records = await fetchAirtable<Person>('People');
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}

export async function getTrips(status?: string): Promise<Trip[]> {
  const filterFormula = status ? `{status} = "${status}"` : undefined;
  const records = await fetchAirtable<Trip>('Trips', { filterByFormula: filterFormula });
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}

export async function getTripById(tripId: string): Promise<Trip | null> {
  const trips = await getTrips();
  return trips.find((t) => t.id === tripId) || null;
}

export async function getTickets(status?: string): Promise<Ticket[]> {
  const filterFormula = status ? `{status} = "${status}"` : undefined;
  const records = await fetchAirtable<Ticket>('Tickets', { filterByFormula: filterFormula });
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}

export async function getTicketById(ticketId: string): Promise<Ticket | null> {
  const tickets = await getTickets();
  return tickets.find((t) => t.id === ticketId) || null;
}

export async function getSubmissions(status?: string): Promise<Submission[]> {
  const filterFormula = status ? `{status} = "${status}"` : undefined;
  const records = await fetchAirtable<Submission>('Submissions', { filterByFormula: filterFormula });
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}

export async function createSubmission(submission: Omit<Submission, 'id' | 'created_at' | 'updated_at'>) {
  const response = await fetch(`${BASE_URL}/Submissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        type: submission.type,
        submitter_name: submission.submitter_name,
        submitter_contact: submission.submitter_contact,
        payload: submission.payload,
        status: 'pending',
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to create submission', await response.text());
    return null;
  }

  return await response.json();
}

// Helper functions for seeding data
export async function createPerson(person: Omit<Person, 'id'>) {
  const response = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: person }),
  });

  if (!response.ok) {
    console.error('Failed to create person', await response.text());
    return null;
  }

  return await response.json();
}

export async function createTrip(trip: Omit<Trip, 'id'>) {
  const response = await fetch(`${BASE_URL}/Trips`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: trip }),
  });

  if (!response.ok) {
    console.error('Failed to create trip', await response.text());
    return null;
  }

  return await response.json();
}

export async function createTicket(ticket: Omit<Ticket, 'id'>) {
  const response = await fetch(`${BASE_URL}/Tickets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: ticket }),
  });

  if (!response.ok) {
    console.error('Failed to create ticket', await response.text());
    return null;
  }

  return await response.json();
}
