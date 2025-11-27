-- CreateTable
CREATE TABLE "payment_methods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
