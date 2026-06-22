import * as v from 'valibot'
import { BFOSchema } from "./src/bfo/schemas/index.ts"
import { readFileSync } from "node:fs"
import { brotliDecompressSync } from "node:zlib"

const file = readFileSync("exports/bfo.json.br")
const data = JSON.parse(brotliDecompressSync(file).toString())

for (const bfo of Object.values(data).flatMap(v => v)) {
  const {success, issues} = v.safeParse(BFOSchema, bfo)

  if (!success) {
    console.log(v.summarize(issues))
  }
}
