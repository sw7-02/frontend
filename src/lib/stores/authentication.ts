import { writable } from "svelte/store";

// TODO: Replace/implement JWT authentication

type User = {
    username: string;
    password: string;
    role: 0 | 1 | 2;
};

type Authentication = {
    isAuthenticated: boolean;
    user: User;
};

export const authentication = writable<Authentication>({
    isAuthenticated: false,
    user: { username: "", password: "", role: 2 },
});
