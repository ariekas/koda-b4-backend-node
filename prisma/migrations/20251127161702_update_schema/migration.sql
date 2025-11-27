/*
  Warnings:

  - Added the required column `userId` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `deliverys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `size_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `status_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `taxs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `transaction_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pic" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dicount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "discounts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_carts" ("created_at", "id", "quantity", "updated_at") SELECT "created_at", "id", "quantity", "updated_at" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
CREATE TABLE "new_categorys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_categorys" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "categorys";
DROP TABLE "categorys";
ALTER TABLE "new_categorys" RENAME TO "categorys";
CREATE UNIQUE INDEX "categorys_name_key" ON "categorys"("name");
CREATE TABLE "new_deliverys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER NOT NULL,
    CONSTRAINT "deliverys_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_deliverys" ("costs", "created_at", "id", "name", "updated_at") SELECT "costs", "created_at", "id", "name", "updated_at" FROM "deliverys";
DROP TABLE "deliverys";
ALTER TABLE "new_deliverys" RENAME TO "deliverys";
CREATE UNIQUE INDEX "deliverys_transactionId_key" ON "deliverys"("transactionId");
CREATE TABLE "new_payment_methods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER NOT NULL,
    CONSTRAINT "payment_methods_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payment_methods" ("created_at", "id", "image", "name", "updated_at") SELECT "created_at", "id", "image", "name", "updated_at" FROM "payment_methods";
DROP TABLE "payment_methods";
ALTER TABLE "new_payment_methods" RENAME TO "payment_methods";
CREATE UNIQUE INDEX "payment_methods_transactionId_key" ON "payment_methods"("transactionId");
CREATE TABLE "new_product_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product_images" ("created_at", "id", "image", "updated_at") SELECT "created_at", "id", "image", "updated_at" FROM "product_images";
DROP TABLE "product_images";
ALTER TABLE "new_product_images" RENAME TO "product_images";
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "price_discount" REAL NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "isFlashsale" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("created_at", "description", "id", "isFavorite", "isFlashsale", "name", "price", "price_discount", "stock", "updated_at") SELECT "created_at", "description", "id", "isFavorite", "isFlashsale", "name", "price", "price_discount", "stock", "updated_at" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE TABLE "new_ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ratings" ("created_at", "id", "rating", "review", "updated_at") SELECT "created_at", "id", "rating", "review", "updated_at" FROM "ratings";
DROP TABLE "ratings";
ALTER TABLE "new_ratings" RENAME TO "ratings";
CREATE TABLE "new_size_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "size_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_size_products" ("costs", "created_at", "id", "name", "updated_at") SELECT "costs", "created_at", "id", "name", "updated_at" FROM "size_products";
DROP TABLE "size_products";
ALTER TABLE "new_size_products" RENAME TO "size_products";
CREATE TABLE "new_status_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER NOT NULL,
    CONSTRAINT "status_transactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_status_transactions" ("created_at", "id", "status", "updated_at") SELECT "created_at", "id", "status", "updated_at" FROM "status_transactions";
DROP TABLE "status_transactions";
ALTER TABLE "new_status_transactions" RENAME TO "status_transactions";
CREATE UNIQUE INDEX "status_transactions_transactionId_key" ON "status_transactions"("transactionId");
CREATE TABLE "new_taxs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tax" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "taxs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_taxs" ("created_at", "id", "name", "tax", "updated_at") SELECT "created_at", "id", "name", "tax", "updated_at" FROM "taxs";
DROP TABLE "taxs";
ALTER TABLE "new_taxs" RENAME TO "taxs";
CREATE UNIQUE INDEX "taxs_productId_key" ON "taxs"("productId");
CREATE TABLE "new_transaction_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER NOT NULL,
    CONSTRAINT "transaction_items_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction_items" ("created_at", "id", "quantity", "subtotal", "updated_at") SELECT "created_at", "id", "quantity", "subtotal", "updated_at" FROM "transaction_items";
DROP TABLE "transaction_items";
ALTER TABLE "new_transaction_items" RENAME TO "transaction_items";
CREATE TABLE "new_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_user" TEXT NOT NULL,
    "address_user" TEXT NOT NULL,
    "phone_address" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "invoice_num" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_transactions" ("address_user", "created_at", "email_address", "id", "invoice_num", "name_user", "phone_address", "total", "updated_at") SELECT "address_user", "created_at", "email_address", "id", "invoice_num", "name_user", "phone_address", "total", "updated_at" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "fullname", "id", "password", "role", "updated_at") SELECT "created_at", "email", "fullname", "id", "password", "role", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_variants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_variants" ("costs", "created_at", "id", "name", "updated_at") SELECT "costs", "created_at", "id", "name", "updated_at" FROM "variants";
DROP TABLE "variants";
ALTER TABLE "new_variants" RENAME TO "variants";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
