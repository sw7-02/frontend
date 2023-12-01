<script lang="ts">
    import { sessionIdStore, taskIdStore } from "$lib/stores/ids";

    export let title: string;
    export let href: string;
    export let i: number;
    export let id: number;
    export let sessionId: number;
</script>

<a
    on:click={() => {
        taskIdStore.set(id);
        sessionIdStore.set(sessionId);
    }}
    {href}
    class="bg-neutral-900 flex justify-between items-center shadow-xl text-neutral-100 text-sm font-mono w-[700px] h-8
    hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700 border-b-[1px] border-neutral-700 {i ===
    0
        ? 'border-t-[1px]'
        : ''}"
>
    <div class="ml-6">{title}</div>
    <slot />
</a>
