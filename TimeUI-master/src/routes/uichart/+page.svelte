<script lang="ts">
  import '../../app.css';
  import type { LatLngExpression } from 'leaflet';
  import Leaflet from '$lib/Leaflet.svelte';
  import Marker from '$lib/Marker.svelte';
  import Popup from '$lib/Popup.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { Switch } from "$lib/components/ui/switch";
  import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import * as Menubar from "$lib/components/ui/menubar/index.js";
  import { fade } from "svelte/transition";
  import Chart from "$lib/Chart.svelte"; // Import Chart component

  const initialView: LatLngExpression = [-7.816177085162616, 110.29458648417666];
  const markerLocations: Array<LatLngExpression> = [[-7.816177085162616, 110.29458648417666]];

  let showAge = true;
  let showWeight = true;
  let showHeight = true;
  let chartType: "line" | "bar" = "line";

  let bookmarks = false;
  let fullUrls = true;

  // get data
  let eventData: any[] = [];
  let eventSource: EventSource;

  function getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = now.toLocaleDateString('id-ID', options);

    return { time: formattedTime, date: formattedDate };
  }

  // Function to establish SSE connection
  const establishSSEConnection = () => {
    eventSource = new EventSource('http://localhost:3000/items/stream'); // URL of your SSE endpoint

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

  let time = getTime();

  setInterval(() => {
    time = getTime();
  }, 1000);
</script>

<!-- Chart Configuration -->
<div class="chart-container">
  <Chart {chartType} bind:showAge bind:showHeight bind:showWeight />
  <select bind:value={chartType}>
    <option value="line">Line</option>
    <option value="bar">Bar</option>
  </select>
  <label for="age">
    <input type="checkbox" bind:checked={showAge} id="age" />
    <span>Show age</span>
  </label>
  <label for="height">
    <input type="checkbox" bind:checked={showHeight} id="height" />
    <span>Show height</span>
  </label>
  <label for="weight">
    <input type="checkbox" bind:checked={showWeight} id="weight" />
    <span>Show Weight</span>
  </label>
</div>

<div class="time-container">
  <div>{time.time}</div>
  <div>{time.date}</div>
</div>

<div class="w-max m-2 z-20 absolute ">
  <Menubar.Root class="">
    <!-- Menubar content -->
  </Menubar.Root>
</div>

<div class="w-max m-2 z-30 absolute bottom-0 left-0">
  <div class="alert-area mb-2">
    {#each eventData.slice().slice(-1) as product}
      <Alert.Root class="m-2">
        <ExclamationTriangle class="h-4 w-4" />
        <Alert.Title>New Strike Occurred</Alert.Title>
        <Alert.Description>{product.strikeId} - {product.timestamp} - {product.distance} - {product.intensity}</Alert.Description>
      </Alert.Root>
    {/each}
    {#each eventData as product}
      <Alert.Root class="m-2">
        <ExclamationTriangle class="h-4 w-4" />
        <Alert.Title>New Strike Occurred</Alert.Title>
        <Alert.Description>{product.strikeId} - {product.timestamp} - {product.distance} - {product.intensity}</Alert.Description>
      </Alert.Root>
    {/each}
  </div>
</div>

<div class="w-max m-2 z-20 absolute ">
  <Menubar.Root class="" style="background-color: white;">
    <Menubar.Menu>
      <Menubar.Trigger>
        <img src="src\routes\newuitime\BMKG (1).png" alt="Logo" style="float:right; width:30px; height:50;">
      </Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Home</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Database</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Tentang Project</Menubar.Trigger>
    </Menubar.Menu>
  </Menubar.Root>
</div>

<div class="w-full h-screen z-0">
  <Leaflet view={initialView} zoom={14}>
    {#each markerLocations as latLng}
      <Marker {latLng} width={40} height={40}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
          viewBox="0 0 50 50"
        >
          <path
            d="M20,10 L20,30 M10,20 L30,20" stroke="yellow" stroke-width="2"
            style="fill:#e9204f;fill-rule:nonzero"
            transform="matrix(1.25,0,0,1.25,0,0)"
          />
        </svg>
        <Popup>
          Sensor Location
        </Popup>
      </Marker>
    {/each}
  </Leaflet>
</div>

<style>
  .time-container {
    position: fixed;
    bottom: 10px;
    left: 10px;
    font-size: 20px;
    color: white;
    z-index: 1000;
  }

  .chart-container {
    position: absolute;
    top: 150px; /* Adjust as needed */
    right: 30px;
    width: calc(1/4 * 100%);
    height: calc(1/4 * 100%); /* Adjust as needed */
    background-color: rgba(45, 45, 43, 0.909); /* Opacity 50% white background */
    z-index: 50; /* Ensure it's above other content */
  }
</style>

