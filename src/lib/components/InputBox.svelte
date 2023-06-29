<script>
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';

	export let readonly = false;
	export let placeholder = '';
	export let value = '';

	let videoElem;

	let qrScanner;

	onMount(() => {
		qrScanner = new QrScanner(videoElem, (result) => console.log('decoded qr code:', result), {
			/* your options or returnDetailedScanResult: true if you're not specifying any other options */
		});
	});

	function scanQrCode() {
		qrScanner
			.start()
			.then((result) => {
				value = result;
				console.log(result);
			})
			.catch((error) => {
				value = error || 'No QR code found.';
				console.error(error);
			});
	}
</script>

{#if QrScanner.hasCamera()}
	<button on:click={() => scanQrCode()} class="secondary"> Scan QR Code </button>
{/if}
<!-- svelte-ignore a11y-media-has-caption -->
<video src="" bind:this={videoElem} />
<textarea {readonly} {placeholder} bind:value />

<style>
	textarea {
		display: block;
		resize: none;
		height: 10rem;
	}

	button {
		margin-bottom: 1rem;
	}

	video {
		margin: 1rem 0;
		max-width: 100%;
		border-radius: 5px;
	}
</style>
