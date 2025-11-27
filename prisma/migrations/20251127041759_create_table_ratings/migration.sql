-- CreateTable
CREATE TABLE "ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
