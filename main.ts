/// <reference lib="deno.unstable" />
import { Hono } from 'hono/mod.ts'
import { z } from 'zod/mod.ts'
import { serve } from 'std/http/server.ts'
import * as base58 from 'std/encoding/base58.ts'

type URL = {
  createdAt: number
  url: string
}

const app = new Hono()
const api = new Hono()
const kv = await Deno.openKv()

app.get('/', (c) => c.text('Hello Mijikee!'))
app.get('/:key', async (c) => {
  const { value } = await kv.get<URL>(['urls', c.req.param('key')])

  if (value) {
    return c.redirect(value.url)
  }
  return c.json({
    message: '404 Not found',
    status: 'error',
  }, 404)
})

// API
api.post('/v1/links', async (c) => {
  const { url } = await c.req.json<{ url: string }>()
  const httpsSchema = z.string().startsWith('https://')
  const shortPath = base58.encode(crypto.getRandomValues(new Uint8Array(5)))

  if (!url) {
    return c.json({
      message: 'URL is empty.',
      status: 'error',
    }, 400)
  }
  if (!httpsSchema.safeParse(url).success) {
    return c.json({
      message: 'Please send URL starting with "https://".',
      status: 'error',
    }, 400)
  }

  await kv.set(['urls', shortPath], {
    createdAt: Date.now(),
    url: url,
  })
  return c.json({
    message: 'Short URL is created!',
    status: 'ok',
    key: shortPath,
  }, 201)
})
app.route('/api', api)

serve(app.fetch)
