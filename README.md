# Next.js Chat and Users Table Project

This project demonstrates a chat component with emoji and tagging features, as well as a users table with filtering, pagination, and rows per page functionalities. It is built using Next.js 14, React 18, Tailwind CSS, Tanstack Table, DataTable, and Emoji Picker React.

## Features

### 1. Users Table(SSR)

- **Pagination**: Users can navigate through pages (1 to 5).
- **Rows per Page**: Users can select the number of rows to display per page (e.g., 5, 10, 15).
- **Search**: Users can search by email or username.
- **URL Rewriting**: The current URL is rewritten with the current page and filters. Multiple filters can be applied simultaneously.

### 2. Chat Component

- **Emojis**: In the message input, if the user starts writing `:emoji:`, a popup/tooltip or panel of emojis will appear, allowing the user to choose one using the keyboard or mouse.
- **Tag a User**: In the message input, if the user starts writing `@`, a list of at least 3 users will appear. The tagging feature includes smart matching logic, so if the user wants to tag `@edeuxk` and writes `@edxk`, the module will retrieve `@edeuxk`.
- **Commands**: In the message input, if the user starts writing `/`, a list of actions will be provided. Supported actions:
  - `/mute @user`
  - `/ban @user`
  - `/title` set a title for the current stream
  - `/description` set a description for the current stream

## Technologies Used

- **Next.js 14**
- **React 18**
- **Tailwind CSS**
- **Tanstack Table**
- **Emoji Picker React** ([npm link](https://www.npmjs.com/package/emoji-picker-react)): A library for picking emojis with support for keyboard navigation.

## Pending Tasks

- Unit tests
- Responsive layouts
- Additional chat features
- Emoji component loading options

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Live Demo

https://stonks-swart.vercel.app/


