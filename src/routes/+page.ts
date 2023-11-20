export async function load() {
    return await fetch("http://localhost:8080/prismatest", {
        method: "GET",
    }).then((response) => {
        if (response.ok) {
            return response.json().then((json) => {
                console.log(json);
                return json;
            }).catch((error) => { console.log(error); return { error: "Failed to parse data" }; });
        } else {
            return { error: "Failed to fetch data" };
        }
    });
}
