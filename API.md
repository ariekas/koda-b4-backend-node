# Documentasi Api 

Just Sruput adalah aplikasi backend e commerce yang memiliki 2 role utama user dan admin. API ini memungkinkan user untuk login, register dan admin memungkin untuk melakukan CRUD product, mengupload image product. Dibangun dengan Express.js dan Prisma ORM dengan database sqlite.

## Users

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
|POST| /register | Register user |
|POST|/login|Login user|

## Contoh Request Body

**POST `/register`**
```json
{
    "fullname" :
    "email" : 
    "password" : 
}
```
**POST `/login`**
```json
{
    "email" : 
    "password" : 
}
```

## Role Admin

Account Admin :
```json
{
    "email" : "admin@gmail.com"
    "password" : "admin123"
}
```
## Header
```json
Authorization : Bearer < Token >
```

## Product
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
|GET| /admin/products | List product |
|GET|/admin/product/:id|Detail Product|
|POST|/admin/product|Membuat product|
|PATCH|/admin/product/:id|Update product|
|DELETE|/admin/product/:id|Hapus product|

**GET `/admin/products`**

**GET `/admin/product/:id`**

**POST `/admin/product`**
```json
{
  "name":
  "price":
  "description": 
  "stock":
  "isFavorite":
  "categoryId":
}
```

**PATCH `/admin/product/:id`**
```json
{
  "name":
  "price":
  "description": 
  "stock":
  "isFavorite":
  "categoryId":
}
```

**DELETE `/admin/product/:id`**

**POST `/admin/product/upload/image/:id`**
```json
key image | value < file image >
```
## Category
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
|GET| /admin/categorys | List category |
|GET|/admin/category/:id|Detail category|
|POST|/admin/category|Membuat category|
|PATCH|/admin/category/:id|Update category|
|DELETE|/admin/category/:id|Hapus category|

**GET `/admin/categorys`**

**GET `/admin/category/:id`**

**POST `/admin/category`**
```json
{
  "name":
}
```

**PATCH `/admin/category/:id`**
```json
{
  "name":
}
```

**DELETE `/admin/category/:id`**

## user
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
|PATCH| /admin/user/role/:id | Upload role user |
|GET| /admin/users | list users |
|GET|/admin/user/:id|Detail user|

**PATCH `/admin/user/role/:id`**
```json
{
  "role":
}
```

**GET `/admin/users`**

**GET `/admin/user/:id`**

## discount
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
|GET| /admin/discounts | List discount |
|GET|/admin/discount/:id|Detail discount|
|POST|/admin/discount|Membuat discount|
|PATCH|/admin/discount/:id|Update discount|
|DELETE|/admin/discount/:id|Hapus discount|

**POST `/admin/discount`**
```json
{
  "name": 
  "discount": 
  "productId": 
}
```