/// <reference lib="deno.unstable" />
import { Handler } from "$fresh/server.ts";
import { Hono } from "hono";
import { getUrl, setUrl } from "../services/db.ts";
import * as base58 from "$std/encoding/base58.ts";
import { z } from "zod";

const app = new Hono();
const api = new Hono();

app.get("/:key", async (c) => {
  const { value } = await getUrl(c.req.param("key"));
  console.log(value);
  if (value) {
    return c.redirect(value.url);
  }
  return c.redirect("/");
});

api.post("/v1/links", async (c) => {
  const { url } = await c.req.json<{ url: URL }>();
  const httpsSchema = z.string().startsWith("https://");
  const shortPath = base58.encode(crypto.getRandomValues(new Uint8Array(5)));

  if (!url) {
    return c.json({
      message: "URL is empty.",
      status: "error",
    }, 400);
  }
  if (!httpsSchema.safeParse(url).success) {
    return c.json({
      message: 'Please send Url starting with "https://".',
      status: "error",
    }, 400);
  }

  await setUrl(url, shortPath);
  return c.json({
    message: "Short URL is created!",
    status: "ok",
    originUrl: url,
    shortPath: shortPath,
  }, 201);
});
app.route("/api", api);

const route = app;
export const handler: Handler = (req) => app.fetch(req);
export type AppType = typeof route;
