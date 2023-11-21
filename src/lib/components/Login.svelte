<script lang="ts">
    import { goto } from "$app/navigation";
    import { authentication } from "$lib/stores/authentication";

    // TODO: obviously this is not secure, but it's just a demo
    let inputUsername: string;
    let inputPassword: string;
    let wrongInput: boolean = false;

    function loginHandler() {
        if (inputUsername === "teacher") {
            goto("/");
            authentication.set({
                isAuthenticated: true,
                user: {
                    username: inputUsername,
                    password: inputPassword,
                    role: 0,
                },
            });
        }
        if (inputUsername === "student") {
            goto("/");
            authentication.set({
                isAuthenticated: true,
                user: {
                    username: inputUsername,
                    password: inputPassword,
                    role: 2,
                },
            });
        } else {
            wrongInput = true;
        }
    }
</script>

<div
    class="grid grid-cols-1 justify-items-center p-4 bg-neutral-900 m-1 rounded-sm text-neutral-100 w-[600px] h-[338px] shadow-xl"
>
    <p class="text-neutral-100 text-lg pt-4">IMPRoved</p>
    {#if wrongInput}
        <p class="text-red-700 text-sm">Incorrect username or password!</p>
    {/if}
    <input
        on:keypress={(event) => {
            if (event.key === "Enter") {
                loginHandler();
            }
        }}
        class="bg-neutral-700 w-[300px] h-[40px] text-neutral-100 outline-none p-4"
        type="text"
        placeholder="Enter username"
        bind:value={inputUsername}
    />
    <input
        on:keypress={(event) => {
            if (event.key === "Enter") {
                loginHandler();
            }
        }}
        class="bg-neutral-700 w-[300px] h-[40px] text-neutral-100 outline-none p-4"
        type="password"
        placeholder="Enter password"
        bind:value={inputPassword}
    />
    <button
        class="text-neutral-100 rounded-sm bg-neutral-900 w-[300px] h-[40px]
    transition duration-200 ease-in-out hover:text-green-700 hover:bg-neutral-800 font-mono border border-neutral-800"
        on:click={loginHandler}>Log in</button
    >
</div>
