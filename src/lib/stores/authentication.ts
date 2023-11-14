import { writable } from 'svelte/store';

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
	user: null
});