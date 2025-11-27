-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "price_discount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "isFlashsale" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
