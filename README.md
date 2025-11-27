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
  "name": "Es Teh",
  "price": 5000,
  "description": "Teh segar dingin",
  "stock": 20,
  "isFavorite": true
}

GET /admin/products

    