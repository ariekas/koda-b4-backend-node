-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_user" TEXT NOT NULL,
    "address_user" TEXT NOT NULL,
    "phone_address" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "invoice_num" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
