import { get } from "svelte/store";
import { jwtStore } from "$lib/stores/authentication";

const headers = {
    auth: get(jwtStore),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};

const prefix = `/${import.meta.env.VITE_API_PREFIX}`;

const fullEndpoint = (endpoint: string) => {
    endpoint = endpoint.trim();
    while (endpoint.startsWith("/")) endpoint = endpoint.substring(1);
    while (endpoint.endsWith("/"))
        endpoint = endpoint.substring(0, endpoint.length - 1);
    return `${prefix}/${endpoint}`;
};

const saveAuth = (r: Response) => {
    r.ok && r.headers.get("auth") && jwtStore.set(r.headers.get("auth")!);
    return r;
};

export const generateGet = async (endpoint: string): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "GET",
        headers,
    }).then(saveAuth);

export const generateDelete = async (endpoint: string): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "Delete",
        headers,
    }).then(saveAuth);

export const generatePost = async (
    endpoint: string,
    data: any
): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    }).then(saveAuth);

export const generatePut = async (
    endpoint: string,
    data: any
): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
    }).then(saveAuth);
