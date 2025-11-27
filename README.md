# Just Sruput Back End 
## Decsription
website back end yang di buat untuk melakukan request request yang ada di e commers
## Docs Api
POST /auth/login
{
    "email" : 
    "password": 
} 

POST /auth/register
{
    "fullname" :
    "email" : 
    "password" : 
}

POST /admin/product
{
  "name":
  "price":
  "description": 
  "stock":
  "isFavorite":
}

GET /admin/products

GET /admin/product/:id

PATCH /admin/product/:id
{
  "name": 
  "price":
  "description": 
  "stock": 
  "isFavorite":
}
    
DELETE /admin/product/:id