<script>
	import ChatBox from '$lib/components/ChatBox.svelte';
	import InputBox from '$lib/components/InputBox.svelte';
	import OutputBox from '$lib/components/OutputBox.svelte';
	import { createPeerConnection } from '$lib/createPeerConnection';
	import { peerConnection, dataChannel } from '$lib/store';

	let creatingOffer = false,
		offer,
		offerSent,
		answer,
		answerReceived;

	async function createOffer() {
		creatingOffer = true;
		// Start RTC peer connection
		$peerConnection = createPeerConnection(() => {
			offer = JSON.stringify($peerConnection.localDescription);
			creatingOffer = false;
		});

		// Setup data channel
		$dataChannel = $peerConnection.createDataChannel('chat');

		// Create offer
		const createdOffer = await $peerConnection.createOffer();
		await $peerConnection.setLocalDescription(createdOffer);
	}

	async function receiveAnswer() {
		answerReceived = true;
		await $peerConnection.setRemoteDescription(JSON.parse(answer));
		console.log('Remote description set');
		console.log($peerConnection);
	}
</script>

<h1>Offering</h1>

<ChatBox />

<article>
	<h2>Step 1</h2>
	<p>Offering a connection to a peer</p>
	<button
		on:click={createOffer}
		disabled={creatingOffer && !offer}
		aria-busy={(creatingOffer && !offer) ?? 'true'}
	>
		{!creatingOffer ? 'Create Offer' : 'Creating Offer...'}
	</button>
</article>

{#if offer}
	<article>
		<h2>Step 2</h2>
		<p>Copy the offer below and send it to your peer</p>
		<OutputBox bind:value={offer} />
		<button disabled={offerSent} on:click={() => (offerSent = true)}>Offer Sent</button>
	</article>
{/if}

{#if offerSent}
	<article>
		<h2>Step 3</h2>
		<p>Please wait for your peer to return the answer and paste it below</p>
		<InputBox
			bind:value={answer}
			placeholder={'Paste answer from peer here'}
			readonly={answerReceived}
		/>
		<button on:click={() => receiveAnswer()} disabled={answerReceived}>Answer Pasted</button>
	</article>
{/if}
