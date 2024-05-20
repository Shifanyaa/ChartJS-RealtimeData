<script>
    import { onMount } from 'svelte';
  
    let items = [];
  
    onMount(() => {
      const eventSource = new EventSource('http://localhost:3000/items/stream');
  
      eventSource.onmessage = function(event) {
        items = JSON.parse(event.data);
      };
    });
  </script>
  
  <h1>Items</h1>
  
  {#if items.length === 0}
    <p>No items found.</p>
  {:else}
    <ul>
      {#each items as item}
        <li>{item.strikeId} - {item.timestamp} - {item.distance} - {item.intensity}</li>
      {/each}
    </ul>
  {/if}
  