# QuickQuips - Anonymous Messaging App

This is an anonymous messaging app built with Next.js, TypeScript, MongoDB, Zod, NextAuth, OpenAI, Shadcn, and Resend for email. In this app, anyone can send messages to everyone, and the identity of the sender will be hidden.

## Features

- **Anonymous Messaging**: Send messages anonymously to everyone.
- **Authentication**: User authentication using NextAuth.
- **Email Notifications**: Email notifications using Resend.
- **Validation**: Input validation using Zod.
- **Database**: MongoDB for data storage.
- **AI Integration**: OpenAI integration for message analysis or other features.

## Tech Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Authentication**: NextAuth
- **Email**: Resend
- **Validation**: Zod
- **AI**: OpenAI

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance
- Resend account for email
- OpenAI API key

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/adityakashyap5047/QuickQuips.git
   cd QuickQuips
   
2. Install dependencies:

   ```sh
   npm install

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:
   ```sh
   MONGODB_URI=
   RESEND_API_KEY=
   NEXTAUTH_SECRET=
   OPENAI_API_KEY=

### Running the App
1. Start the development server:
   ```sh
   npm run dev
2. Open `http://localhost:3000` in your browser to see the app.

### Building for Production
1. Build the app:
   ```sh
   npm run build
2. Start the production server:
   ```sh
   npm start
   
## Folder Structure
   ```sh
   .
   ├── components
   │   └── MessageComponent.tsx
   ├── lib
   │   ├── mongodb.ts
   │   ├── nextauth.ts
   │   └── openai.ts
   ├── pages
   │   ├── api
   │   │   ├── auth
   │   │   │   └── [...nextauth].ts
   │   │   ├── messages
   │   │   │   └── index.ts
   │   └── index.tsx
   ├── prisma
   │   └── schema.prisma
   ├── public
   │   └── ...
   ├── styles
   │   └── globals.css
   ├── utils
   │   └── validation.ts
   ├── .env.local
   ├── README.md
   ├── next.config.js
   ├── package.json
   └── tsconfig.json

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.
