

export function getContacts(data){

    return fetch("/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((respData) => respData)
        .catch((err) => err)

}