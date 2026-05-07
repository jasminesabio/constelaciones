const BASE_ID = "appKhlj079WS6zlii";
const API_KEY = "patIw4wUBkogAQmAn.f3aad5f6032fea08d6389f986d8b5c1c7ea6b327cd0db6c40258c8d9ccc6a294";
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
async function fetchAirtable(tableName, options = {}) {
  const params = new URLSearchParams();
  if (options.view) params.append("view", options.view);
  if (options.filterByFormula) params.append("filterByFormula", options.filterByFormula);
  const url = `${BASE_URL}/${tableName}?${params}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  if (!response.ok) {
    console.error(`Airtable error: ${response.status}`, await response.text());
    return [];
  }
  const data = await response.json();
  return data.records || [];
}
async function getPeople() {
  const records = await fetchAirtable("People");
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}
async function getTrips(status) {
  const filterFormula = `{status} = "${status}"` ;
  const records = await fetchAirtable("Trips", { filterByFormula: filterFormula });
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}
async function getTickets(status) {
  const filterFormula = status ? `{status} = "${status}"` : void 0;
  const records = await fetchAirtable("Tickets", { filterByFormula: filterFormula });
  return records.map((r) => ({ ...r.fields, airtableId: r.id }));
}

export { getTrips as a, getTickets as b, getPeople as g };
