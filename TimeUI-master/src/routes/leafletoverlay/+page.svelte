<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';
    onMount(() => {
      // Initialize Leaflet map
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    });
  </script>
  
  <style>
    .map-container {
      position: relative;
      width: 100%;
      height: 400px; /* Set the height of the map container */
    }
  
    .overlay-div {
      position: absolute;
      top: 10px; /* Adjust as needed */
      left: 10px; /* Adjust as needed */
      z-index: 1000; /* Ensure it's on top of the Leaflet map */
      background-color: white;
      padding: 10px;
      border: 1px solid black;
      border-radius: 5px;
    }
  </style>
  
  <div class="map-container">
    <div id="map"></div>
    <!-- Overlay div -->
    <div class="overlay-div">
      <h2>Overlay Div</h2>
      <p>This div is on top of the Leaflet map.</p>
    </div>
  </div>
  
  