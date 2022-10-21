<script lang="ts">
	import Scrolly from '$lib/Scrolly.svelte';

	let stepIndex = 0;
	let stepsRatios = [];

	$: {
		console.log(stepIndex);
		console.log(stepsRatios);
	}

	console.log(stepIndex);
	console.log(stepsRatios);
</script>

<header>
	<h1>Scrollytelling</h1>
</header>

<div class="stats">
	<p>Current step: {stepIndex}</p>
</div>

<Scrolly bind:stepIndex bind:stepsRatios>
	<section>1</section>
	<section>2</section>
	<section>3</section>
	<section>4</section>
</Scrolly>

<style>
	:root {
		color-scheme: dark;
	}

	:global(html) {
		font-family: sans-serif;
	}

	.stats {
		position: fixed;
		top: 0;
		left: 1rem;
	}

	header {
		text-align: center;
	}

	section {
		height: 60vh;
		width: 500px;
		border: 3px dashed #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 10vh;
	}
</style>
