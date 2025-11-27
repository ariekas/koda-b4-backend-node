-- CreateTable
CREATE TABLE "size_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
