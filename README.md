# TravelStay - Hotel Booking Platform

A modern, full-stack hotel booking platform built with Next.js 15, featuring secure payment processing, comprehensive admin dashboard, and order hotels.

## ✨ Key Features

### User Management
- **Authentication & Authorization**: Secure user registration and login with NextAuth.js
- **Role-based Access Control**: Separate interfaces for regular users and administrators

### Hotel Management
- **Property Listings**: Browse hotels with detailed information, images, and details
- **Advanced Search & Filtering**: Filter by location, price range, property type, and availability
- **Hotel Details**: Comprehensive hotel pages with image galleries, review, and details

### Booking System
- **Real-time Availability**: Check and book available dates with calendar integration
- **Instant Booking**: Streamlined booking process with immediate confirmation
- **Booking Management**: View, manage, and cancel reservations

### Payment Processing
- **Stripe Integration**: Secure payment processing with Stripe Checkout
- **Multiple Payment Methods**: Support for various payment options
- **Payment Webhooks**: Real-time payment status updates

### Admin Dashboard
- **Analytics & Insights**: Revenue tracking with interactive charts
- **User Management**: CRUD operations for user accounts
- **Listing Management**: Add, edit, and delete hotel properties
- **Reservation Management**: Monitor and manage all bookings
- **Review Management**: Moderate and manage customer reviews
- **Financial Reports**: Track revenue, bookings, and performance metrics

## Technology Stack

### Frontend
- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **Zod** 

### Backend & Database
- **Next.js API Routes**
- **Prisma** 
- **MongoDB** 
- **NextAuth.js**

### Payment & Storage
- **Stripe** 
- **Cloudinary** 

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NandoG1/travel-website
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_mongodb_connection_string"
   
   # NextAuth
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Stripe
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
   
   # Cloudinary
   NEXT_PUBLIC_CLOUD_NAME="your_cloudinary_cloud_name"
   NEXT_PUBLIC_UPLOAD_PRESET="your_cloudinary_upload_preset"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   ```

5. **Stripe Webhooks**
   Configure webhook endpoints in your Stripe dashboard:
   - **Endpoint URL**: `https://yourdomain.com/api/webhook`
   - **Events**: `checkout.session.completed`

6. **Run the development server**
   ```bash
   npm run dev
   ```
7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   
## 🎥 Demo & Proposal
   - [View the proposal here](https://docs.google.com/document/d/1TgtpsjO9hhHVc3fXdHgMsyAXeMWq4FEn/edit?usp=sharing&ouid=113197811322884432302&rtpof=true&sd=true)
   - [View the Demonstrasion Video Here](https://drive.google.com/file/d/1zjiYsPgARfO3wRIe4_Uyz8QZmTz-wLNP/view?usp=sharing)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
