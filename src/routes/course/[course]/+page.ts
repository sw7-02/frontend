import { jwtAuth, userRole } from "$lib/stores/authentication";
import { get } from "svelte/store";

export async function load({ params }) {
    await fetch(`http://localhost:8080/course/${params.course}`, {
        method: "GET",
        headers: { auth: get(jwtAuth).jwt_token },
    }).then((response) => {
        if (response.ok) {
            response.headers.get("auth") && jwtAuth.set({ jwt_token: response.headers.get("auth")! });
            return response.json().then((data) => {
                return data;
            }).catch((error) => { console.log(error); return { error: "Failed to parse data" }; });
        } else {
            return { error: "Failed to fetch data" };
        }
    });
}
