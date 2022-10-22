<script lang="ts">
	import Scrolly from '$lib/Scrolly.svelte';
	import { basicSteps } from '$lib/steps';

	const INDICES = {
		side: 10,
		behind: 15,
		fade: 20,
		draw: 21,
		fling: 23,
		lorem: 26
	};

	let stepIndex = 0;
	let stepRatios = [];
	let stepsCompleted = [];

	$: stepRatio = stepRatios[stepIndex] || 0;

	$: stepRatios.forEach((ratio, i) => {
		if (ratio === 1) {
			stepsCompleted[i] = true;
		}
	});

	$: drawSVG = stepIndex === INDICES.draw;
</script>

<header>
	<h1>Scrollytelling</h1>
</header>

<div class="stats">
	<p>Current step: {stepIndex}</p>
	<p>Current step's visible area: {stepIndex ? `${Math.round(stepRatio * 100)}%` : ''}</p>
	<p>Overall progress: {stepIndex ? `${stepIndex + 1} / ${stepRatios.length}` : ''}</p>
</div>

<Scrolly bind:stepIndex bind:stepRatios>
	<section>1</section>
	<section>2</section>
	<section>3</section>
	<section>4</section>

	{#each basicSteps as step}
		<section>
			<p class:rotating-question-mark={step === '?'}>{step}</p>
		</section>
	{/each}
</Scrolly>

<style>
	.stats {
		position: fixed;
		top: 0;
		left: 0;
		padding: 1rem;
		font-size: 1.5rem;
	}

	header {
		text-align: center;
	}

	section {
		height: 75vh;
		aspect-ratio: 1 / 1;
		border: 2px dashed whitesmoke;
		border-radius: 0.375rem;
		box-sizing: border-box;
		display: grid;
		place-items: center;
		font-size: 5rem;
		margin: 0 auto 1rem;
		padding: 2rem;
	}

	.rotating-question-mark {
		font-size: 2em;
		animation: rotate 2s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
