<script lang="ts">
    import { jwtStore, userRoleStore, role } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import { generateGet, generatePost } from "$lib/fetchers";

    async function load() {
        return generateGet(`course/${get(courseIdStore)}/leaderboard`).then(
            async (response) => {
                if (response.ok) {
                    return response
                        .json()
                        .then((data) => {
                            return data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return { error: "Failed to parse data" };
                        });
                } else {
                    console.log(await response.text());
                    return { error: "Failed to fetch data" };
                }
            }
        );
    }

    async function getAnonymity() {
        return generateGet(
            `course/${get(courseIdStore)}/leaderboard/anonymity`
        ).then(async (response) => {
            if (response.ok) {
                return response
                    .json()
                    .then((data) => {
                        return data.is_anonymous;
                    })
                    .catch((error) => {
                        console.log(error);
                        return { error: "Failed to parse data" };
                    });
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    let data: any;
    let is_anonymous: boolean;

    onMount(async () => {
        data = await load();
        is_anonymous = await getAnonymity();
    });

    async function toggleAnonymity() {
        is_anonymous = !is_anonymous;
        return generatePost(
            `course/${get(courseIdStore)}/leaderboard/anonymity`,
            {
                anonymity: is_anonymous,
            }
        ).then(async (response) => {
            if (response.ok) {
                data = await load();
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }
</script>

<div
    class="bg-neutral-900 mt-4 mb-4 mr-4 w-[900px] overflow-auto rounded-md border border-neutral-600"
>
    <table class="w-full">
        <thead
            class="text-neutral-100 text-center text-md border-b border-neutral-600"
        >
            <td class="p-2 font-bold">Rank</td>
            <td class="p-2 flex justify-center items-center font-bold"
                >User
            </td><td class="p-2 font-bold" style="width: 500px;">Points</td>
        </thead>
        <tbody>
            {#if data}
                {#each data as user, i}
                    <tr
                        class="{(i + 1) % 2 === 0
                            ? 'bg-neutral-900'
                            : 'bg-neutral-800'} text-neutral-100 text-md text-center border-b border-neutral-600"
                    >
                        <td class="p-2">{i + 1}</td>
                        <td class="p-2">{user.username}</td>
                        <td class="p-2">
                            <div
                                class="flex items-center border border-neutral-500 rounded"
                            >
                                <div
                                    class="w-full rounded overflow-hidden h-6 relative"
                                >
                                    <div
                                        class="bg-cyan-800 h-full"
                                        style="width: {(user.total_points /
                                            data[0].total_points) *
                                            100}%"
                                    />
                                    <span
                                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral-100 font-bold"
                                    >
                                        {user.total_points}
                                    </span>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
{#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
    <div
        class="bg-neutral-900 mt-4 mb-4 mr-4 w-[200px] h-[200px] rounded-md border border-neutral-600 flex flex-col"
    >
        <p
            class="w-full p-2 font-bold text-neutral-100 text-center text-md border-b border-neutral-600"
        >
            Leaderboard Options
        </p>
        <div class="flex items-center p-2">
            <input
                on:click={toggleAnonymity}
                bind:checked={is_anonymous}
                type="checkbox"
                class="appearance-none w-5 h-5 border border-neutral-600 rounded-md checked:bg-cyan-800 transition duration-150 ease-in-out"
            />
            <p class="text-neutral-100 ml-1">Appear as anonymous</p>
        </div>
    </div>
{/if}
