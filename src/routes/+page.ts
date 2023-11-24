export async function load() {
    await fetch("http://localhost:8080/login", {
        method: "POST",
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
