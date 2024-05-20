import { writable } from 'svelte/store';

export async function GET() {
  // Option 1: Fetch from weather data API
  const response = await fetch('http://localhost:3000/');
  const lightningStrikes = await response.json();

  // Option 2: Simulated data (for development/testing)
  // const lightningStrikes = generateSimulatedLightningStrikes();

  const sse = new Response(null, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  sse.writable.write(`data: ${JSON.stringify(lightningStrikes)}\n\n`); // Send initial data

  return sse;
}

// Function to generate simulated lightning strikes (for development/testing)
function generateSimulatedLightningStrikes() {
  // ... (implementation to create simulated data)
}
