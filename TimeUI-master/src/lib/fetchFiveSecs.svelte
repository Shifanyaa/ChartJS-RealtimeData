<script>
    import { onMount, onDestroy } from 'svelte';

    let data;
    // @ts-ignore
    let intervalId;
  
    async function fetchData() {
      const response = await fetch('/api/data');
      data = await response.json();
    }
  
    onMount(async () => {
      await fetchData();
      intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    });
  
    // @ts-ignore
    onDestroy(() => clearInterval(intervalId));
  </script>