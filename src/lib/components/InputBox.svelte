<script>
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';

	export let readonly = false;
	export let placeholder = '';
	export let value = '';

	let videoElem;
	let scanning = false;

	onMount(() => {
		const qrScanner = new QrScanner(
			videoElem,
			(result) => console.log('decoded qr code:', result),
			{
				/* your options or returnDetailedScanResult: true if you're not specifying any other options */
			}
		);
	});

	function scanQrCode() {
		scanning = true;

		qrScanner
			.start()
			.then((result) => {
				value = result;
				scanning = false;
			})
			.catch((error) => {
				window.alert(error || 'No QR code found.');
				scanning = false;
			});
	}
</script>

{#if QrScanner.hasCamera()}
	<button on:click={() => scanQrCode()} class="secondary" disabled={scanning}>
		Scan QR Code
	</button>
{/if}
<!-- svelte-ignore a11y-media-has-caption -->
<video src="" bind:this={videoElem} class:scanning />
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
		max-width: 100%;
		margin: 1rem 0;
		border-radius: 5px;
		display: none;
	}

	video.scanning {
		display: inline-block;
	}
</style>
