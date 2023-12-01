<script lang="ts">
    import { isTeacherStore, jwtStore } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    async function load() {
        return fetch(
            `http://localhost:8080/course/${get(courseIdStore)}/leaderboard`,
            {
                method: "GET",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response) => {
            if (response.ok) {
                response.headers.get("auth") &&
                    jwtStore.set(response.headers.get("auth")!);
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
        });
    }

    async function getAnonymity() {
        return fetch(
            `http://localhost:8080/course/${get(
                courseIdStore
            )}/leaderboard/anonymity`,
            {
                method: "GET",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response) => {
            if (response.ok) {
                response.headers.get("auth") &&
                    jwtStore.set(response.headers.get("auth")!);
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
        return fetch(
            `http://localhost:8080/course/${get(
                courseIdStore
            )}/leaderboard/anonymity`,
            {
                method: "POST",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    anonymity: is_anonymous,
                }),
            }
        ).then(async (response) => {
            if (response.ok) {
                data = await load();
                response.headers.get("auth") &&
                    jwtStore.set(response.headers.get("auth")!);
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }
</script>

<div class="bg-neutral-900 mt-4 mb-4 mr-4 w-[900px] overflow-auto">
    <table class="w-full">
        <thead class="text-neutral-100 text-center text-md">
            <td class="p-2">Rank</td>
            <td class="p-2 flex justify-center items-center"
                >User
                {#if $jwtStore !== "" && $isTeacherStore === false}
                    <div
                        class="ml-2 p-1 bg-neutral-800 border border-neutral-700"
                    >
                        <input
                            on:click={toggleAnonymity}
                            type="checkbox"
                            bind:checked={is_anonymous}
                        /> Appear anonymous
                    </div>
                {/if}
            </td><td class="p-2" style="width: 500px;">Points</td>
        </thead>
        <tbody>
            {#if data}
                {#each data as user, i}
                    <tr
                        class="{i + 1 === 1
                            ? 'text-yellow-400'
                            : i + 1 === 2
                            ? 'text-gray-400'
                            : i + 1 === 3
                            ? 'text-yellow-700'
                            : 'text-neutral-100'}
                    {(i + 1) % 2 === 0
                            ? 'bg-neutral-900'
                            : 'bg-neutral-800'} text-neutral-100 text-md text-center"
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
                                        class="bg-green-700 h-full"
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
