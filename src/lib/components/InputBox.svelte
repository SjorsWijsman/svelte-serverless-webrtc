<script>
	// TODO: Add QR code scanner

	export let readonly = false;
	export let placeholder = '';
	export let value = '';
</script>

<textarea {readonly} {placeholder} bind:value />

<style>
	textarea {
		display: block;
		resize: none;
		height: 10rem;
	}
</style>
