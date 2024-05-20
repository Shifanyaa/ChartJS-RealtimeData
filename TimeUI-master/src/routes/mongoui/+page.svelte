<script lang="ts">
	import '../../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	// import DraggableWindow from '$src/lib/DraggableWindow.svelte';

	const initialView: LatLngExpression = [-7.816177085162616, 110.29458648417666];
	const markerLocations: Array<LatLngExpression> = [[-7.816177085162616, 110.29458648417666]];

	import * as Menubar from '$lib/components/ui/menubar/index.js';

	let bookmarks = false;
	let fullUrls = true;

	const profileRadioValue = 'benoit';

	//   get data
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	let eventData = [];
	let eventSource;

	// Function to establish SSE connection
	const establishSSEConnection = () => {
		eventSource = new EventSource('http://localhost:3000/items/stream');

		// Event listener for 'message' event
		eventSource.addEventListener('message', (event) => {
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

<div class="absolute z-20 m-2 w-max">
	<Menubar.Root class="">
		<Menubar.Menu>
			<Menubar.Trigger>File</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>New Incognito Window</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Sub>
					<Menubar.SubTrigger>Share</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Item>Email link</Menubar.Item>
						<Menubar.Item>Messages</Menubar.Item>
						<Menubar.Item>Notes</Menubar.Item>
					</Menubar.SubContent>
				</Menubar.Sub>
				<Menubar.Separator />
				<Menubar.Item>
					Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Edit</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Sub>
					<Menubar.SubTrigger>Find</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Item>Search the web</Menubar.Item>
						<Menubar.Separator />
						<Menubar.Item>Find...</Menubar.Item>
						<Menubar.Item>Find Next</Menubar.Item>
						<Menubar.Item>Find Previous</Menubar.Item>
					</Menubar.SubContent>
				</Menubar.Sub>
				<Menubar.Separator />
				<Menubar.Item>Cut</Menubar.Item>
				<Menubar.Item>Copy</Menubar.Item>
				<Menubar.Item>Paste</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>View</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.CheckboxItem bind:checked={bookmarks}
					>Always Show Bookmarks Bar</Menubar.CheckboxItem
				>
				<Menubar.CheckboxItem bind:checked={fullUrls}>Always Show Full URLs</Menubar.CheckboxItem>
				<Menubar.Separator />
				<Menubar.Item inset>
					Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item inset>
					Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item inset>Hide Sidebar</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Profiles</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.RadioGroup value={profileRadioValue}>
					<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
					<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
					<Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
				</Menubar.RadioGroup>
				<Menubar.Separator />
				<Menubar.Item inset>Edit...</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item inset>Add Profile...</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</div>
<div class="absolute bottom-0 left-0 z-30 m-2 w-max">
	<div class="alert-area mb-2">
		{#each eventData.slice().slice(-1) as product}
			<Alert.Root class="m-2">
				<ExclamationTriangle class="h-4 w-4" />
				<Alert.Title>New Strike Occurred</Alert.Title>
				<Alert.Description
					>{product.strikeId} - {product.timestamp} - {product.distance} - {product.intensity}</Alert.Description
				>
			</Alert.Root>
		{/each}
		<!-- {#each eventData as product}
    <Alert.Root class="m-2" >
        <ExclamationTriangle class="h-4 w-4" />
        <Alert.Title>New Strike Occurred</Alert.Title>
        <Alert.Description>{product.strikeId} - {product.timestamp} - {product.distance} - {product.intensity}</Alert.Description>
      </Alert.Root>
    {/each} -->
	</div>
</div>

<div class="z-0 h-screen w-full">
	<!-- Leaflet Map -->
	<Leaflet view={initialView} zoom={14}>
		{#each markerLocations as latLng}
			<Marker {latLng} width={40} height={40}>
				<!--  Icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
					viewBox="0 0 50 50"
				>
					<path
						d="M20,10 L20,30 M10,20 L30,20"
						stroke="yellow"
						stroke-width="2"
						style="fill:#e9204f;fill-rule:nonzero"
						transform="matrix(1.25,0,0,1.25,0,0)"
					/>
				</svg>

				<Popup>Sensor Location</Popup>
			</Marker>
		{/each}
	</Leaflet>
</div>
