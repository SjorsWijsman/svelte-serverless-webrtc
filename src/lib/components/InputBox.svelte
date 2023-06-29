<script>
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';

	export let readonly = false;
	export let placeholder = '';
	export let value = '';

	let videoElem;

	let qrScanner;

	let resultMessage;

	onMount(() => {
		if (QrScanner.hasCamera()) {
			qrScanner = new QrScanner(videoElem, (result) => {
				value = result.data;
				console.log(result);
			});
			qrScanner.start();
		}
	});
</script>

{#if QrScanner.hasCamera()}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video src="" bind:this={videoElem} />
{/if}
<textarea {readonly} {placeholder} bind:value />

<style>
	textarea {
		display: block;
		resize: none;
		height: 10rem;
	}

	video {
		margin: 1rem 0;
		width: 100%;
		border: 1px solid var(--pico-form-element-border-color);
		border-radius: 5px;
		background-color: var(--pico-form-element-background-color);
	}
</style>
