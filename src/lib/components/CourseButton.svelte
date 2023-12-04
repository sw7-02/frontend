<script lang="ts">
    export let href: string;
    export let text: string;
    export let icon: string;
</script>

<a
    {href}
    class="flex items-center text-neutral-100 text-md font-light pl-3 pr-3 pt-1 pb-1 mr-2 ml-2 rounded-md
    bg-gray-800 hover:bg-gray-700 hover:text-white border border-neutral-700"
    ><div class="pr-1"><i class={icon} /></div>
    {text}
</a>
