# Just Sruput

Just Sruput adalah aplikasi backend e commerce yang memiliki 2 role utama user dan admin. API ini memungkinkan user untuk login, register dan admin memungkin untuk melakukan CRUD product, mengupload image product. Dibangun dengan Express.js dan Prisma ORM dengan database sqlite.

## Tech Stack

- **Node.js** 
- **Express.js** 
- **Prisma**
- **SQLite** 
- **JavaScript** 

## Prerequisites

- Node.js v20.x
- npm atau yarn

## Installation

1. Clone repository

```bash
https://github.com/ariekas/koda-b4-backend-node.git
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables

Buat file `.env` di root directory dan tambahkan:

```env
DATABASE_URL=
APP_SECRET=
```

4. Generate Prisma Client

```bash
npx prisma generate
```

5. Jalankan migrasi database

```bash
npx prisma migrate dev --name init
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server akan berjalan di `http://localhost:2020`

## Documentasi Api
<a href="API.md">Docs api, Here!</a>

## Contributing

1. Fork repository
2. Buat branch baru (`git checkout -b feat/< your add fitur >`)
3. Commit perubahan (`git commit -m 'Add some < your add fitur >'`)
4. Push ke branch (`git push origin feat/< your add fitur >`)
5. Buat Pull Request
