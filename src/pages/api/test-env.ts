export const prerender = false;

export async function GET() {
  return new Response(JSON.stringify({
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    hasPassword: !!process.env.CONSTELACIONES_PASSWORD,
    baseIdLength: process.env.AIRTABLE_BASE_ID?.length || 0,
    apiKeyLength: process.env.AIRTABLE_API_KEY?.length || 0,
    // First 3 chars for debugging
    baseIdPrefix: process.env.AIRTABLE_BASE_ID?.substring(0, 3) || 'none',
    env: typeof process !== 'undefined' ? 'has process' : 'no process',
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
