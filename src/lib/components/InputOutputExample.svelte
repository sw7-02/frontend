<script lang="ts">
    export let example: { input: string; output: string };
</script>

<div class="flex items-center mt-2">
    <input
        bind:value={example.input}
        class="bg-neutral-700 w-full text-neutral-100 mr-2 p-1"
        type="text"
        placeholder="Input"
    />
    <p class="text-neutral-100"><i class="fa-solid fa-arrow-right" /></p>
    <input
        bind:value={example.output}
        class="bg-neutral-700 w-full text-neutral-100 ml-2 p-1"
        type="text"
        placeholder="Output"
    />
</div>
