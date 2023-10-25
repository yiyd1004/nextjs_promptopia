# Promptopia

This project is to study font-end development using NextJS, Next-Auth, Tailwindcss, Prisma (MongoDB), and TypeScript.

### <a href="https://promptopia-yongyim.vercel.app/" target="_blank" style="font-size: 30px;">Demo</a>

## Main Packages
- next: ^13.4.19
- prisma: ^5.2.0
- tailwindcss: 3.3.3
- typescript: 5.2.2
- next-auth: ^4.23.1

## Setup

1. Download or clone the git repository
```shell
$ git clone https://github.com/yiyd1004/nextjs_promptopia.git
$ cd nextjs_promptopia
$ npm install
```
2. Create `.env` file and add the API keys
```env
GOOGLE_ID=YOUR_GOOGLE_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_ID
MONGODB_URI=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_STRONG_SECRET
```
3. Use the following command to run the app in your localhost.
 ```shell
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```
