<script>
	import ChatBox from '$lib/components/ChatBox.svelte';
	import InputBox from '$lib/components/InputBox.svelte';
	import OutputBox from '$lib/components/OutputBox.svelte';
	import { createPeerConnection } from '$lib/createPeerConnection';
	import { peerConnection, dataChannel } from '$lib/store';

	let offer, answer;

	async function receiveOffer() {
		// Start RTC peer connection
		$peerConnection = createPeerConnection(() => {
			answer = JSON.stringify($peerConnection.localDescription);
		});

		// Setup data channel responses
		$peerConnection.ondatachannel = (event) => {
			$dataChannel = event.channel;
		};

		// Create answer
		await $peerConnection.setRemoteDescription(JSON.parse(offer));
		const createdAnswer = await $peerConnection.createAnswer();

		await $peerConnection.setLocalDescription(createdAnswer);
		answer = JSON.stringify(createdAnswer);
	}
</script>

<h1>Answering</h1>

<ChatBox />

<article>
	<h2>Step 1</h2>
	<p>Answering to a connection offer from a peer</p>
	<p>Please wait for your peer to give offer and paste it below</p>
	<InputBox bind:value={offer} placeholder={'Please paste offer from peer here'} />
	<button on:click={() => receiveOffer()} disabled={!offer || answer} readonly={answer}>
		Offer pasted
	</button>
</article>

{#if answer}
	<article>
		<h2>Step 2</h2>
		<p>Please send the following answer to your peer</p>
		<OutputBox bind:value={answer} />
	</article>
{/if}
