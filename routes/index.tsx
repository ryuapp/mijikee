import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
<<<<<<< HEAD
import InputUrl from "../islands/InputURL.tsx";
=======
import InputUrl from "../islands/InputUrl.tsx";
>>>>>>> 0d12b81a8a438fb14241447b533c83605c3deb23

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
          <InputUrl />
        </div>
      </div>
    </>
  );
}
