export function createPeerConnection(callback) {
	let peerConnection;

	const configuration = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] };

	// Start RTC peer connection
	try {
		peerConnection = new RTCPeerConnection(configuration);
	} catch (err) {
		console.error(err);
	}

	peerConnection.onicecandidate = handleicecandidate(callback);
	peerConnection.onconnectionstatechange = handleconnectionstatechange;
	peerConnection.oniceconnectionstatechange = handleiceconnectionstatechange;

	return peerConnection;
}

function handleicecandidate(callback) {
	return (event) => {
		// Perform callback function when all ICE candidates have been gathered
		if (event.candidate === null) {
			callback();
		}
	};
}

function handleconnectionstatechange(event) {
	console.log('handleconnectionstatechange');
	console.log(event);
}

function handleiceconnectionstatechange(event) {
	console.log('ice connection state: ' + event.target.iceConnectionState);
}
