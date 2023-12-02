<script lang="ts">
    import { sessionIdStore, taskIdStore } from "$lib/stores/ids";

    export let title: string;
    export let href: string;
    export let id: number;
    export let sessionId: number;
</script>

<a
    on:click={() => {
        taskIdStore.set(id);
        sessionIdStore.set(sessionId);
    }}
    {href}
    class="bg-neutral-900 flex justify-between items-center shadow-lg text-neutral-100 text-sm rounded-md w-[700px] h-8
    hover:bg-neutral-800 transition duration-200 ease-in-out border border-neutral-600"
>
    <div class="ml-6 text-center">
        <i
            class="fa-solid fa-chevron-right w-5 text-xs text-neutral-500"
            style="transform: rotate(135deg);"
        />{title}
    </div>
    <slot />
</a>
