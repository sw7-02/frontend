<script lang="ts">
    export let onClick: () => void;
</script>

<button
    on:click|preventDefault={() => onClick()}
    class="hover:text-red-700 rounded-full text-neutral-100 mr-4"
>
    <i class="fa-regular fa-circle-xmark" />
</button>
