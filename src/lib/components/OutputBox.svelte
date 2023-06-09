<script>
	import QrCode from '$lib/components/QrCode.svelte';

	export let readonly = true;
	export let placeholder = '';
	export let value;

	let displayAsText = true;
</script>

<button on:click={() => (displayAsText = !displayAsText)} class="secondary"> Show QR Code </button>
{#if displayAsText}
	<textarea {readonly} {placeholder} bind:value />
{:else}
	<QrCode content={value} />
{/if}

<style>
	textarea {
		display: block;
		resize: none;
		height: 10rem;
	}
</style>
