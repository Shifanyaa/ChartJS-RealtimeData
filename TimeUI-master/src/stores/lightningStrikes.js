// In lightningStrikes.js
import { writable } from 'svelte/store';

export const lightningStrikes = writable([]);

let eventSource;

function startSSE() {
  eventSource = new EventSource("../data/ngxdata2.json"); // Replace with your SSE endpoint

  eventSource.onmessage = function(event) {
    lightningStrikes.set(JSON.parse(event.data));
  };

  eventSource.onerror = function(error) {
    console.error("Error occurred with SSE", error);
    eventSource.close();
    // Custom reconnection logic: try to reconnect after 5 seconds
    setTimeout(startSSE, 5000);
  };
}

if (typeof window !== 'undefined') {
  startSSE();
}