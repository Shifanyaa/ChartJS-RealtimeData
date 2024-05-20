<!-- <script>
	export let data;
	const { products } = data
    console.log(products)

</script>

<h1>Strikes Occured</h1>
{#each products as product }
	<h2>{product.timestamp}</h2>
	
{/each} -->

<!-- <script>
    import { writable } from 'svelte/store';
    import { fetch } from 'kit'; // Assuming you're using a separate data endpoint
  
    let products = writable([]);
  
    async function loadProducts() {
      const response = await fetch('/api/products'); // Replace with your data endpoint
      products.set(await response.json());
    }
  
    async function subscribeToUpdates() {
      const eventSource = new EventSource('/data-stream'); // Open an EventSource connection
      eventSource.onmessage = (event) => {
        products.update((data) => JSON.parse(event.data)); // Update based on received JSON data
      };
    }
  
    loadProducts();
    subscribeToUpdates();
  </script>
  
  {#if products}
    <ul>
      {#each products as product}
        <li>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          </li>
      {/each}
    </ul>
  {/if}
   -->

   <!-- WORKS -->
   <script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';
  
    let eventData = [];
    let eventSource;
  
    // Function to establish SSE connection
    const establishSSEConnection = () => {
      eventSource = new EventSource('http://localhost:3000/data-stream'); // URL of your SSE endpoint
  
      // Event listener for 'message' event
      eventSource.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        eventData = data; // Update component state with received data
      });
  
      // Event listener for 'error' event
      eventSource.addEventListener('error', () => {
        console.error('SSE connection error');
        eventSource.close();
        // Attempt to reconnect after a delay
        setTimeout(establishSSEConnection, 2000); // Adjust the delay as needed
      });
    };
  
    onMount(() => {
      establishSSEConnection(); // Establish SSE connection on component mount
    });
  
    // Clean up SSE connection on component unmount
    onDestroy(() => {
      if (eventSource) {
        eventSource.close();
      }
    });
  </script>
  
  <h1>Requested Data from Local Server</h1>
  <p>Automatically detect new data, Server generate new data every 10s</p>
<p>HTTP (GET) with Server-Sent Events</p>
<p>PORTS: Client:5173, Server:3000</p>
  
  <ul>
    {#each eventData as product}
      <li>{product.id} - {product.timestamp}</li>
    {/each}
  </ul>
  

  <!-- with buffer -->
  <!-- <script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';
  
    let eventData = [];
    let eventBuffer = []; // Buffer to store received data when disconnected
    let eventSource;
  
    // Function to establish SSE connection
    const establishSSEConnection = () => {
      eventSource = new EventSource('http://localhost:3000/data-stream'); // URL of your SSE endpoint
  
      // Event listener for 'message' event
      eventSource.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        if (eventBuffer.length > 0) {
          eventData = [...eventBuffer, data]; // Add buffered data first
          eventBuffer = []; // Clear buffer
        } else {
          eventData = [...eventData, data]; // Update component state with received data
        }
      });
  
      // Event listener for 'error' event
      eventSource.addEventListener('error', () => {
        console.error('SSE connection error');
        eventSource.close();
        // Attempt to reconnect after a delay
        setTimeout(establishSSEConnection, 2000); // Adjust the delay as needed
      });
    };
  
    onMount(() => {
      establishSSEConnection(); // Establish SSE connection on component mount
    });
  
    // Clean up SSE connection on component unmount
    onDestroy(() => {
      if (eventSource) {
        eventSource.close();
      }
    });
  </script>
  
  <h1>Requested Data from Local Backend Server</h1>
  <p>Automatically detect new data, Server generate new data every 10s</p>
  <p>HTTP (GET) with Server-Sent Events</p>
  <p>PORTS: Client:5173, Server:3000</p>
  
  <ul>
    {#each eventData as product}
      <li>{product.id} - {product.timestamp}</li>
    {/each}
  </ul>
   -->