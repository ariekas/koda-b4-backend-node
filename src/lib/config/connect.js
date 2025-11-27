import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client/extension";
import process from "process";

const getUrl = `${process.env.DATABASE_URL}`
const adapter = new PrismaBetterSqlite3({url: getUrl})
const prisma = new PrismaClient({adapter})

export default prisma