<script lang="ts">
	import { onMount, onDestroy, setContext, createEventDispatcher, tick } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

	const dispatch = createEventDispatcher();

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	
	let center = [-7.816177085162616, 110.29458648417666]; // Central point
	

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}

		map = L.map(mapElement, { zoomControl: false })
			// example to expose map events to parent components:
			.on('zoom', (e) => dispatch('zoom', e))
			.on('popupopen', async (e) => {
				await tick();
				e.popup.update();
			});

		// zoom control
		L.control.zoom({
		position: 'topright'
		}).addTo(map);

		// scale control
		// let scale = L.control.scale(); // Creating scale control
        //  scale.addTo(map); // Adding scale control to the map

		// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		// 	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

		L.tileLayer(
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			
		).addTo(map);

		// let labelLayer = L.tileLayer(
		// 	'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
		// 	{
		// 		attribution: 'Labels &copy; Esri &mdash; Source: Esri'
		// 	}
		// ).addTo(map);

		let Stadia_StamenTerrainLabels = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.{ext}',
			{
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			}
		).addTo(map);

		
		// Define the custom control
	// let CustomZoomControl = L.Control.extend({
	// onAdd: function(map) {
	// 	let container = L.DomUtil.create('div', 'custom-zoom-control');
	// 	container.innerHTML = '<button class="zoom-in">+</button><button class="zoom-out">-</button>';
		
	// 	// Prevent click events on the control from being propagated to the map
	// 	L.DomEvent.disableClickPropagation(container);
		
	// 	// Handle click events on the zoom buttons
	// 	L.DomEvent.on(container, 'click', function(e) {
	// 	let zoomDelta = (e.target.classList.contains('zoom-in')) ? 1 : -1;
	// 	map.setZoom(map.getZoom() + zoomDelta);
	// 	});
		
	// 	return container;
	// }
	// });

	// // Create an instance of the custom control
	// let customZoomControl = new CustomZoomControl();

	// // Add the custom control to the map
	// customZoomControl.addTo(map);

		// Define radii in meters
		let radii = [5000, 10000, 15000]; // in meters

		// Draw geodetic range rings
		radii.reverse().forEach(radius => {
		let circle = L.circle(center, {
			color: 'red',
			fillColor: 'red',
			fillOpacity: 0,
			radius: radius,
		}).addTo(map);

		// Create popup content
		let popupContent = `Radius: ${radius/1000} km`;

		// Bind popup to circle
		circle.bindPopup(popupContent);
	});



	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}
</script>

<div class="z-0 h-full w-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
