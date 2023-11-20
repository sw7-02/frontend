export const ssr = false;

export async function load({ params }) {
    return await fetch("/api/", {
        method: "GET",
    }).then((response) => {
        if (response.ok) {
            return response.json().then((json) => {
                console.log(json);
                return json;
            });
        } else return "shit";
    });
}
