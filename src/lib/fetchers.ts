import { get } from "svelte/store";
import { jwtStore } from "$lib/stores/authentication";

const default_headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};
const headers = () => {
    if (get(jwtStore) === "") return default_headers;
    else
        return {
            auth: get(jwtStore),
            ...default_headers,
        };
};

const prefix = `${import.meta.env.VITE_API_PREFIX}`;

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
        headers: headers(),
    }).then(saveAuth);

export const generateDelete = async (endpoint: string): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "Delete",
        headers: headers(),
    }).then(saveAuth);

export const generatePost = async (
    endpoint: string,
    data: any
): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data),
    }).then(saveAuth);

export const generatePut = async (
    endpoint: string,
    data: any
): Promise<Response> =>
    fetch(fullEndpoint(endpoint), {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(data),
    }).then(saveAuth);
