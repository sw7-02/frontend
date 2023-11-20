import { writable } from "svelte/store";

// TODO: Replace/implement JWT authentication

type User = {
    username: string;
    password: string;
} | null;

type Authentication = {
    isAuthenticated: boolean;
    user: User;
};

export const authentication = writable<Authentication>({
    isAuthenticated: false,
    user: null,
});
