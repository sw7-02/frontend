<script lang="ts">
    export let showToast: boolean = false;
    export let message: string;

    const closeToast = () => {
        showToast = false;
    };

    let timeoutId: NodeJS.Timeout;
    $: {
        if (showToast) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                showToast = false;
            }, 3000);
        }
    }
</script>

{#if showToast}
    <div
        class="bg-gray-800 text-neutral-100 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-6 rounded-md shadow-xl flex items-center justify-between"
    >
        <span>{message}</span>
        <button
            class="hover:bg-gray-700 text-neutral-100 p-3 rounded-full relative ml-3"
            on:click={closeToast}
        >
            <span class="absolute inset-0 flex items-center justify-center">
                <i class="fa-solid fa-xmark text-md" />
            </span>
        </button>
    </div>
{/if}
