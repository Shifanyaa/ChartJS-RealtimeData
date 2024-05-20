<script>
	export let data;
	const { lightningStrikes } = data

</script>

<h1>Strikes Occured</h1>
{#each lightningStrikes as strike }
	<h2>{strike.time}</h2>
	
{/each}
