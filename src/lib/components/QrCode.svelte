<script>
	import QRCode from 'qrcode';

	export let content;

	let src;

	QRCode.toDataURL(content)
		.then((url) => {
			src = url;
		})
		.catch((err) => {
			console.error(err);
		});
</script>

<img {src} alt="" />

<style>
	img {
		margin-bottom: var(--pico-spacing);
		border-radius: var(--pico-border-radius);
	}
</style>
