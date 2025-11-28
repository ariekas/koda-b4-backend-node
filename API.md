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

## Admin
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
|GET| /admin/products | List product |
|GET|/admin/product/:id|Detail Product|
|POST|/admin/product/|Membuat product|
|PATCH|/admin/product/:id|Update prduct|
|DELETE|/admin/product/:id|Hapus product|

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
