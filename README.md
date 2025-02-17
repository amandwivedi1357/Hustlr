
# Hustlr - Modern Job Board Platform

🚀 Project Overview
Hustlr is a cutting-edge job board platform designed to connect talented job seekers with innovative companies. Built with modern web technologies, Hustlr offers a seamless and intuitive experience for both employers and job seekers.

---

✨ Features

For Employers:
- 🏢 Create and manage job listings
- 💳 Integrated Stripe payment for job postings
- 📊 Track job applications
- 🔒 Secure authentication and authorization

For Job Seekers:
- 🔍 Browse and search job listings
- 💾 Save favorite job posts
- 📝 Easy application process

---

🛠 Tech Stack
- Frontend: Next.js 14
- Backend: Prisma ORM
- Authentication: NextAuth.js
- Payments: Stripe
- Database: PostgreSQL
- Styling: Tailwind CSS
- Deployment: Vercel

---

📦 Prerequisites
- Node.js (v18+ recommended)
- pnpm (for package management)
- PostgreSQL database
- Stripe account

---

🚦 Getting Started

1. Clone the Repository
   ```bash
   git clone https://github.com/yourusername/hustlr.git
   cd hustlr
   ```
2. Install Dependencies
   ```bash
   pnpm i
   ```
3. Set Up Environment Variables
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_URL=http://localhost:3000
   ```
4. Run Database Migrations
   ```bash
   pnpm dlx prisma migrate dev
   ```
5. Start Development Server
   ```bash
   pnpm dev
   ```
6. Access Prisma Studio
   ```bash
   pnpm dlx prisma studio
   ```
7. Run Inngest for Background Jobs
   ```bash
   pnpm dlx inngest-cli@latest dev
   ```

---

🔐 Environment Setup

Stripe Configuration:
- Create a Stripe account.
- Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
- Set up webhook endpoint: `{YOUR_DOMAIN}/api/webhook/stripe`.

Database:
- Supports PostgreSQL.
- ORM: Prisma with automatic schema migrations.

---

🤝 Contributing
- Fork the repository.
- Create your feature branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a Pull Request.

🐛 Reporting Issues
- Report issues on our [GitHub Issues page](https://github.com/yourusername/hustlr/issues).


---

