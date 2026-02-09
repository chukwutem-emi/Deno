Deno.serve({port: 3000}, () => {
    const body = JSON.stringify({message: "Hello Deno"});
    return new Response(body, {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    })
})