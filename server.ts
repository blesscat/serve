import { Application } from "https://deno.land/x/oak/mod.ts"

if (!Deno.args[0]) {
  console.warn('there is not root location.')
  Deno.exit(1)
}

const port = Number(Deno.args[1]) || 8000
const path = Deno.args[0].replace(/^(\.\/|\/)/, '')

const app = new Application()

app.use(async (context) => {
  context.response.headers.set("X-Response-Time", `testtime`);
  await context.send({
    root: `${Deno.cwd()}/${path}`,
    index: 'index.html'
  });
});

console.log(`listen ${port}`)
await app.listen({ port })
