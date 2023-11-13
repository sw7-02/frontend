<script lang="ts">
	import { authentication } from '$lib/stores/authentication';
	import { get } from 'svelte/store';

	let inputUsername: string;
	let inputPassword: string;

	function loginHandler() {
		authentication.set({
			isAuthenticated: true,
			user: {
				username: inputUsername,
				password: inputPassword
			}
		});
		console.log(get(authentication));
	}
</script>

<div
	class="grid grid-cols-1 justify-items-center p-4 bg-neutral-900 m-1 rounded-sm text-neutral-100 w-[600px] h-[338px] shadow-xl"
>
	<p class="text-neutral-100 underline font-mono">Sign in</p>
	<input
		class="bg-neutral-700 w-[300px] h-[40px] text-neutral-100 outline-none p-4 font-mono"
		type="text"
		placeholder="Enter username"
		bind:value={inputUsername}
	/>
	<input
		class="bg-neutral-700 w-[300px] h-[40px] text-neutral-100 outline-none p-4 font-mono"
		type="text"
		placeholder="Enter password"
		bind:value={inputPassword}
	/>
	<button
		class="text-neutral-100 m-2 p-2 rounded-md bg-neutral-800 w-[300px] h-[40px]
    transition duration-200 ease-in-out hover:text-green-700 hover:bg-neutral-700 font-mono"
		on:click={loginHandler}>Log in</button
	>
</div>
