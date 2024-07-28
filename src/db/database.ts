import { env } from "@/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
} 

let pg: ReturnType<typeof postgres>;

if (env.NODE_ENV === "production") {
  pg = postgres(env.DATABASE_URL);
} else {
  if (!global.database) {
    pg = postgres(env.DATABASE_URL);
    global.database = drizzle(pg, { schema });
  }
  database = global.database;
}

export { database, pg };
