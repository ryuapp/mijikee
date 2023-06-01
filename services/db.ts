const db = await Deno.openKv();

export async function getURL(path: string){
    const result = await db.get(["urls", path]);
    return result
}

export async function setURL(url: URL, path: string){
    const result = await db.set(['urls', path], {
        createdAt: Date.now(),
        url: url,
      });
    return result
}