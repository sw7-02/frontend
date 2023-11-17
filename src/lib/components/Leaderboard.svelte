<script lang="ts">
    let table_data: { rank: number; user: string; points: number }[] = [
        { rank: 1, user: "Ihlen", points: 401 },
        { rank: 2, user: "Mikkel Dolmer", points: 400 },
        { rank: 3, user: "Anonymous_user_3232", points: 100 },
        { rank: 4, user: "Anonymous_user_2", points: 80 },
        { rank: 5, user: "Anonymous_user_2", points: 50 },
        { rank: 6, user: "Anonymous_user_2", points: 10 },
    ];
</script>

<div class="bg-neutral-900 mt-4 mb-4 mr-4 w-[900px] overflow-auto">
    <table class="w-full">
        <thead class="text-neutral-100 text-center font-mono text-md">
            <td class="p-2"># Rank</td>
            <td class="p-2">User</td>
            <td class="p-2" style="width: 400px;">Points</td>
        </thead>
        <tbody>
            {#each table_data as { rank, user, points }}
                <tr
                    class="{rank % 2 === 0
                        ? 'bg-neutral-900'
                        : 'bg-neutral-800'} font-mono text-green-700 text-md text-center"
                >
                    <td class="p-2">{rank}</td>
                    <td class="p-2">{user}</td>
                    <td class="p-2">
                        <div class="flex flex-col items-center">
                            <span class="text-neutral-100">{points}</span>
                            <div
                                class="w-full bg-green-500 rounded overflow-hidden h-4 mt-1"
                            >
                                <div
                                    class="bg-green-700 h-full"
                                    style="width: {(points /
                                        table_data[0].points) *
                                        100}%"
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
