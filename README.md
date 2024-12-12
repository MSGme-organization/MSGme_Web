# MSGme - A Chat Web Application

MSGme is a feature-rich, real-time chat web application designed for seamless and secure communication. Built with modern web technologies, MSGme offers a fast and interactive user experience for messaging and collaboration.


## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [Flowbite](https://flowbite.com/)
- **State Management**: Redux and @tanstack/react-query

### Backend
- **Chat Service**: Node.js with MongoDB using Socket.io
- **User Service**: Next.js with PostgreSQL using Prisma ORM


### Database
- **Relational**: PostgreSQL (User and relations management)
- **NoSQL**: MongoDB (Message storage)

## Installation


### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MSGme-organization/MSGme_Web.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd MSGme_Web
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
    ```env
    DATABASE_URL="your_postgresql_database_url"
    JWT_SECRET="your_jwt_secret"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    AUTHOR_MAIL="your_email"
    AUTHOR_MAIL_PASSWORD="your_email_password"
    REDIS_HOST="your_redis_host"
    REDIS_PORT="your_redis_port"
    REDIS_PASSWORD="your_redis_password"
    REDIS_USERNAME="your_redis_username"
    NEXT_PUBLIC_CHAT_SOCKET_URL="your_websocket_server_endpoint"
    NEXT_PUBLIC_ENCRYPTION_ALGORITHM="ECDH"
    NEXT_PUBLIC_ENCRYPTION_CURVE="P-256"
    ```
5. Migrate the database schema:
    ```bash
    npx prisma migrate deploy
    ```

6. Generate Prisma client for database access:
    ```bash
    npx prisma generate
    ```

7. Start the development server:
   ```bash
   npm run dev
   ```
8. Build the project and start:
    ```bash
    npm run build
    npm start
    ```

### Backend Setup
 [Click here](https://github.com/MSGme-organization/MSGme-backend/blob/main/README.md)


## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up for an account or log in if you already have one.
3. Start chatting with your friends in real time!