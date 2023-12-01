<script lang="ts">
    export let text: string = "Click me";
    export let href: string = "/";
</script>

<a
    class="flex items-center rounded-md pl-3 pr-3 pt-1 pb-1 font-light text-md text-neutral-100
    bg-neutral-800 hover:bg-neutral-700 transition duration-200 ease-in-out border border-neutral-600"
    {href}><p>{text}</p></a
>
