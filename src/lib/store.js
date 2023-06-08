import { writable } from 'svelte/store';

export const peerConnection = writable(null);
export const dataChannel = writable(null);
