<script lang="ts">
	import Scrolly from '$lib/Scrolly.svelte';
	import { eachDayOfInterval } from '$lib/each-day-of-interval';

	let stepIndex = 0;
	let stepRatios = [];
	let stepsCompleted = [];

	const dates = eachDayOfInterval({
		start: new Date(2022, 8, 1),
		end: new Date()
	});

	$: stepRatio = stepRatios[stepIndex] || 0;

	$: stepRatios.forEach((ratio, i) => {
		if (ratio === 1) {
			stepsCompleted[i] = true;
		}
	});
</script>

<div class="stats">
	<p>Current step: {stepIndex}</p>
</div>

<div class="timeline">
	<Scrolly bind:stepIndex bind:stepRatios>
		{#each dates as date}
			<section>
				<div class="dot" role="img" />
				<time>{date.toDateString()}</time>
			</section>
		{/each}
	</Scrolly>
</div>

<style>
	.timeline {
		margin-left: 1rem;
		position: relative;
		border-left: 1px solid #ccc;
	}

	section {
		position: relative;
		height: 75vh;
		margin-left: 1rem;
		margin-bottom: 2.5rem;
	}

	.dot {
		position: absolute;
		top: 0.25rem;
		left: -1.25rem;
		width: 0.5rem;
		aspect-ratio: 1/1;
		border-radius: 50%;
		background: #ccc;
	}

	.stats {
		position: fixed;
		top: 0;
		right: 0;
		padding: 1rem;
		font-size: 1.5rem;
	}
</style>
