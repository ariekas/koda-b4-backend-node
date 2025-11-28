-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_carts" ("created_at", "id", "quantity", "updated_at", "userId") SELECT "created_at", "id", "quantity", "updated_at", "userId" FROM "carts";
DROP TABLE "carts";
ALTER TABLE "new_carts" RENAME TO "carts";
CREATE TABLE "new_deliverys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER,
    CONSTRAINT "deliverys_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_deliverys" ("costs", "created_at", "id", "name", "transactionId", "updated_at") SELECT "costs", "created_at", "id", "name", "transactionId", "updated_at" FROM "deliverys";
DROP TABLE "deliverys";
ALTER TABLE "new_deliverys" RENAME TO "deliverys";
CREATE UNIQUE INDEX "deliverys_transactionId_key" ON "deliverys"("transactionId");
CREATE TABLE "new_discounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dicount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "discounts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_discounts" ("created_at", "dicount", "id", "name", "productId", "updated_at") SELECT "created_at", "dicount", "id", "name", "productId", "updated_at" FROM "discounts";
DROP TABLE "discounts";
ALTER TABLE "new_discounts" RENAME TO "discounts";
CREATE TABLE "new_payment_methods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER,
    CONSTRAINT "payment_methods_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_payment_methods" ("created_at", "id", "image", "name", "transactionId", "updated_at") SELECT "created_at", "id", "image", "name", "transactionId", "updated_at" FROM "payment_methods";
DROP TABLE "payment_methods";
ALTER TABLE "new_payment_methods" RENAME TO "payment_methods";
CREATE UNIQUE INDEX "payment_methods_transactionId_key" ON "payment_methods"("transactionId");
CREATE TABLE "new_product_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product_images" ("created_at", "id", "image", "productId", "updated_at") SELECT "created_at", "id", "image", "productId", "updated_at" FROM "product_images";
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
    "categoryId" INTEGER,
    "cartId" INTEGER,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "products_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("cartId", "categoryId", "created_at", "description", "id", "isFavorite", "isFlashsale", "name", "price", "price_discount", "stock", "updated_at") SELECT "cartId", "categoryId", "created_at", "description", "id", "isFavorite", "isFlashsale", "name", "price", "price_discount", "stock", "updated_at" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE TABLE "new_profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pic" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profiles" ("address", "created_at", "id", "phone", "pic", "updated_at", "userId") SELECT "address", "created_at", "id", "phone", "pic", "updated_at", "userId" FROM "profiles";
DROP TABLE "profiles";
ALTER TABLE "new_profiles" RENAME TO "profiles";
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
CREATE TABLE "new_ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ratings" ("created_at", "id", "productId", "rating", "review", "updated_at") SELECT "created_at", "id", "productId", "rating", "review", "updated_at" FROM "ratings";
DROP TABLE "ratings";
ALTER TABLE "new_ratings" RENAME TO "ratings";
CREATE TABLE "new_size_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "size_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_size_products" ("costs", "created_at", "id", "name", "productId", "updated_at") SELECT "costs", "created_at", "id", "name", "productId", "updated_at" FROM "size_products";
DROP TABLE "size_products";
ALTER TABLE "new_size_products" RENAME TO "size_products";
CREATE TABLE "new_status_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER,
    CONSTRAINT "status_transactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_status_transactions" ("created_at", "id", "status", "transactionId", "updated_at") SELECT "created_at", "id", "status", "transactionId", "updated_at" FROM "status_transactions";
DROP TABLE "status_transactions";
ALTER TABLE "new_status_transactions" RENAME TO "status_transactions";
CREATE UNIQUE INDEX "status_transactions_transactionId_key" ON "status_transactions"("transactionId");
CREATE TABLE "new_taxs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tax" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "taxs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_taxs" ("created_at", "id", "name", "productId", "tax", "updated_at") SELECT "created_at", "id", "name", "productId", "tax", "updated_at" FROM "taxs";
DROP TABLE "taxs";
ALTER TABLE "new_taxs" RENAME TO "taxs";
CREATE UNIQUE INDEX "taxs_productId_key" ON "taxs"("productId");
CREATE TABLE "new_transaction_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "transactionId" INTEGER,
    CONSTRAINT "transaction_items_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transaction_items" ("created_at", "id", "quantity", "subtotal", "transactionId", "updated_at") SELECT "created_at", "id", "quantity", "subtotal", "transactionId", "updated_at" FROM "transaction_items";
DROP TABLE "transaction_items";
ALTER TABLE "new_transaction_items" RENAME TO "transaction_items";
CREATE TABLE "new_variants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "costs" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_variants" ("costs", "created_at", "id", "name", "productId", "updated_at") SELECT "costs", "created_at", "id", "name", "productId", "updated_at" FROM "variants";
DROP TABLE "variants";
ALTER TABLE "new_variants" RENAME TO "variants";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
