<script lang="ts">
    let table_data: { rank: number; user: string; points: number }[] = [
        { rank: 1, user: "Ihlen", points: 401 },
        { rank: 2, user: "Mikkel Dolmer", points: 400 },
        { rank: 3, user: "Anonymous_user_3232", points: 100 },
        { rank: 4, user: "Anonymous_user_2", points: 80 },
        { rank: 5, user: "Anonymous_user_2", points: 50 },
        { rank: 6, user: "Anonymous_user_2", points: 10 },
    ];

    function pointsToWidth(points: number) {
        let max = table_data[0].points;
        let width = Math.round((points / max) * 100);

        return (
            "|".repeat(width / 4) + " " + points + " " + "|".repeat(width / 4)
        );
    }
</script>

<div class="bg-neutral-900 mt-4 mb-4 mr-4 p-4 w-[900px]">
    <table class="w-full">
        <thead class="text-neutral-100 text-center font-mono text-md">
            <td>Rank</td>
            <td>Points</td>
            <td>User</td>
        </thead>
        <tbody>
            {#each table_data as { rank, user, points }}
                <tr class="font-mono text-green-700 text-md text-center">
                    <td>{rank}</td>
                    <td class="flex">
                        <p class="text-green-700">
                            {pointsToWidth(points)}
                        </p>
                    </td>
                    <td>{user}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
