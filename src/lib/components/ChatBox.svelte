<script>
	import { dataChannel } from '$lib/store';

	let el,
		value,
		chatHistory = [],
		disabled = true;

	function sendMessage() {
		chatHistory = [...chatHistory, `${value}`];
		$dataChannel.send(value);
		value = '';
	}

	function receiveMessage(event) {
		chatHistory = [...chatHistory, `${event.data}`];
	}

	function enableChat() {
		disabled = false;
		el.scrollIntoView({ behavior: 'smooth' });
	}

	dataChannel.subscribe((channel) => {
		if (!channel) return;
		console.log(channel);
		channel.onopen = () => enableChat();
		channel.onmessage = (event) => receiveMessage(event);
	});
</script>

<article bind:this={el}>
	<h2>Chat</h2>
	<div>
		{#each chatHistory as message}
			<p>{message}</p>
		{/each}
	</div>
	<form role="group" on:submit={() => sendMessage()}>
		<input type="text" placeholder="Text" bind:value />
		<input type="submit" value="Send message" {disabled} />
	</form>
</article>

<style>
	div {
		height: 10rem;
		padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
		border: var(--pico-border-width) solid var(--pico-form-element-border-color);
		border-radius: var(--pico-border-radius);
		background-color: var(--pico-form-element-background-color);
		margin-bottom: 1rem;
		overflow-y: auto;
	}
</style>
