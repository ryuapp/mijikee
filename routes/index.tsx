import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import Input from "../islands/Input.tsx";

export const handler: Handlers = {
  POST: (req, ctx) => {
    return Response.json({ ok: true });
  },
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Mijikee</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="mt-20 text-5xl text-center">Mijikee</h1>
        <p class="my-6 text-center text-xl">
          is a simple URL shortener.
        </p>
        <div>
          <Input class="w-full" placeholder="URL" />
        </div>
      </div>
    </>
  );
}
