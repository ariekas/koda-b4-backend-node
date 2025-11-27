-- CreateTable
CREATE TABLE "status_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
