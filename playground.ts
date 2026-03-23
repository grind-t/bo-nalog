import pl from "nodejs-polars"
import {fs} from 'zx'
import * as v from 'valibot'
import { BFOSchema } from "./src/bfo/types/bfo.ts"

const data = fs.readJSONSync("./exports/bfo.json")
const bfos: Record<any, any>[] = []

for (const bfo of Object.values(data).flatMap(v => v)) {
  const {success, issues} = v.safeParse(BFOSchema, bfo)

  if (!success) {
    console.log(v.summarize(issues))
  }
}
