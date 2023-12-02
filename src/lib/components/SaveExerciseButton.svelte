<script lang="ts">
    export let updateExercise: () => {};
</script>

<button
    on:click={updateExercise}
    class="flex items-center rounded-md bg-gray-800 hover:bg-gray-700 transition duration-200 ease-in-out
    text-neutral-100 text-md pl-3 pr-3 pb-1 pt-1 font-light border border-neutral-600"
    >Save All</button
>
