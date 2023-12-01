<script lang="ts">
    export let onClick: () => void;
</script>

<button
    on:click|preventDefault={onClick}
    class="flex items-center text-neutral-100 text-sm font-mono h-10 p-2 rounded-sm hover:bg-neutral-700 hover:text-white
    border border-neutral-700"
>
    <i class="fa-solid fa-pencil fa-md pr-1" />
    Edit
</button>
