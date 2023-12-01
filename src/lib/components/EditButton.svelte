<script lang="ts">
    export let onClick: () => void;
</script>

<button
    on:click|preventDefault={onClick}
    class="hover:bg-neutral-700 text-neutral-100 p-4 rounded-full relative"
>
    <span class="absolute inset-0 flex items-center justify-center">
        <i class="fa-solid fa-pencil fa-md text-sm" />
    </span>
</button>
