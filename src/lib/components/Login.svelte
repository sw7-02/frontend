<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        jwtStore,
        isTeacherStore,
        usernameStore,
    } from "$lib/stores/authentication";

    let inputUsername: string;
    let inputPassword: string;
    let wrongInput: boolean = false;
    let loading: boolean = false;

    async function loginHandler() {
        loading = true;
        await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        usernameStore.set(inputUsername);
                        jwtStore.set(data.jwt_token);
                        isTeacherStore.set(data.is_teacher);
                        goto("/");
                    });
                } else {
                    wrongInput = true;
                }
            })
            .finally(() => {
                loading = false;
            });
    }
</script>

<div
    class="grid grid-cols-1 justify-items-center bg-neutral-900 rounded-md text-neutral-100 shadow-lg p-16 border border-neutral-600"
>
    <h1 class="text-3xl font-light text-neutral-200 mb-6">IMPRoved</h1>
    {#if wrongInput}
        <p class="text-red-700 text-sm mb-4">Incorrect username or password</p>
    {/if}
    <div class="mb-4">
        <label class="block text-neutral-200 text-sm mb-1" for="username"
            >Username</label
        >
        <input
            id="username"
            on:keypress={(event) => {
                if (event.key === "Enter") {
                    loginHandler();
                }
            }}
            class="bg-neutral-700 w-[300px] h-[40px] text-neutral-100 p-4 rounded-md border border-neutral-600"
            type="text"
            bind:value={inputUsername}
        />
    </div>
    <div class="mb-4">
        <label class="block text-neutral-200 text-sm mb-1" for="password"
            >Password</label
        >
        <input
            id="password"
            on:keypress={(event) => {
                if (event.key === "Enter") {
                    loginHandler();
                }
            }}
            class="bg-neutral-700 w-[300px] h-[40px] text-neutral-100 p-4 rounded-md border border-neutral-600"
            type="password"
            bind:value={inputPassword}
        />
    </div>
    <button
        class="text-neutral-100 rounded-md w-[300px] h-[40px] font-light bg-gray-800 border border-neutral-600
        transition duration-200 ease-in-out hover:bg-gray-700"
        on:click={loginHandler}
        disabled={loading}
    >
        {#if loading}
            <span>Loading...</span>
        {:else}
            <span>Log in</span>
        {/if}
    </button>
</div>
