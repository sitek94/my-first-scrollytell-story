<script>
	/**
	 * This component manages which item is most in view for scroll triggering
	 * example:
	 * <Scrolly
	 * 	bind:value={scrollIndex}
	 * >
	 * **items here**
	 * </Scrolly>
	 *
	 * optional params with defaults
	 * <Scrolly root={null} top={0} bottom={0} increments={100}>
	 *
	 * https://svelte.dev/repl/3d3736e634c9404ea8ec2ef7b87e2053?version=3.42.4
	 */
	import { onMount } from 'svelte';
	export let root = null;
	export let top = 0;
	export let bottom = 0;
	export let increments = 100;

	export let stepIndex = undefined;
	export let stepRatios = [];

	const threshold = [];
	let nodes = [];
	let intersectionObservers = [];
	let container;

	$: top, bottom, update();

	const update = () => {
		if (!nodes.length) return;
		nodes.forEach(createObserver);
	};

	const mostInView = () => {
		let maxRatio = 0;
		let maxIndex = 0;

		for (let i = 0; i < stepRatios.length; i++) {
			if (stepRatios[i] > maxRatio) {
				maxRatio = stepRatios[i];
				maxIndex = i;
			}
		}

		return maxRatio > 0 ? maxIndex : undefined;
	};

	const createObserver = (node, index) => {
		const handleIntersect = (entries) => {
			stepRatios[index] = entries[0].intersectionRatio;
			stepIndex = mostInView();
		};

		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin, threshold };

		if (intersectionObservers[index]) {
			intersectionObservers[index].disconnect();
		}

		const observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
		intersectionObservers[index] = observer;
	};

	onMount(() => {
		for (let i = 0; i < increments + 1; i++) {
			threshold.push(i / increments);
		}
		nodes = container.querySelectorAll(':scope > *');
		update();
	});
</script>

<div class="scrolly" bind:this={container}>
	<slot />
</div>
