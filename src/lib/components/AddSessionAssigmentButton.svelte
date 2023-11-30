<script lang="ts">
    import { jwtStore } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import Modal from "$lib/components/Modal.svelte";

    export let type: string;
    export let buttonText: string;

    let showModal: boolean = false;
    let newTitle: string;

    export let reloadExercises: () => void;

    function onSubmit() {
        showModal = false;
        if (type === "session") {
            return fetch(
                `http://localhost:8080/course/${get(courseIdStore)}/session/`,
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={() => (showModal = true)}
    class="bg-neutral-700 justify-center items-center flex shadow-xl rounded-sm w-[700px] h-16 bg-opacity-50
font-mono text-neutral-950 hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700 mt-1"
    style="cursor: pointer;"
>
    <p>{buttonText}</p>
</div>
<Modal
    bind:showModal
    bind:newTitle
    {onSubmit}
    onCancel={() => {
        newTitle = "";
    }}
/>
