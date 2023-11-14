<script lang="ts">
    let table_data: { name: string; points: number }[] = [
        { name: "John", points: 100 },
        { name: "Jane", points: 200 },
        { name: "Bob", points: 50 },
    ];
</script>

<div class="bg-neutral-900 mt-4 mb-4 mr-4 w-[900px]">
    <table class="w-full m-4">
        <thead>
            <tr class="text-center font-mono text-neutral-100 text-md underline">
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {#each table_data as { name, points }}
                <tr class="text-center font-mono text-green-700 text-md">
                    <td>{name}</td>
                    <td>{points}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
