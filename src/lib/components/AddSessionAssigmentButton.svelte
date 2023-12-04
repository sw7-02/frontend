<script lang="ts">
    import { jwtStore } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import Modal from "$lib/components/Modal.svelte";

    export let type: string;
    export let buttonText: string;
    export let rowAmount: number;

    let showModal: boolean = false;
    let newTitle: string;

    export let reloadExercises: () => void;

    function onSubmit() {
        showModal = false;
        if (type === "session") {
            return fetch(
                `${import.meta.env.VITE_API_PREFIX}/course/${get(
                    courseIdStore
                )}/session/`,
                {
                    method: "POST",
                    headers: {
                        auth: get(jwtStore),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: newTitle }),
                }
            ).then(async (response) => {
                if (response.ok) {
                    reloadExercises();
                    newTitle = "";
                    return;
                } else {
                    console.log(await response.text());
                    return { error: "Failed to fetch data" };
                }
            });
        }
    }
</script>

<button
    on:click={() => (showModal = true)}
    class="bg-neutral-700 justify-center items-center flex shadow-lg rounded-md w-[700px] h-16 bg-opacity-50 font-mono
    text-neutral-950 hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-neutral-600 mt-1 border border-neutral-800"
>
    <p><i class="fa-solid fa-plus pr-1" />{buttonText}</p>
</button>
<Modal
    bind:showModal
    bind:newTitle
    {onSubmit}
    onCancel={() => {
        newTitle = "";
    }}
>
    <p class="pl-2 text-neutral-100">
        {type.charAt(0).toUpperCase() + type.slice(1)}
        {rowAmount + 1}:
    </p></Modal
>
