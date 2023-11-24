import { writable } from "svelte/store";

type Authentication = {
    jwtToken: string;
};

export const authentication = writable<Authentication>({
    jwtToken: "",
});
