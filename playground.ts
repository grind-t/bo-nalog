import pl from "nodejs-polars"

const df = pl.readParquet("./exports/companies.parquet")

console.log(df.schema)
console.log(df.describe())
