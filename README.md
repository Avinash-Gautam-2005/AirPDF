<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/Supabase-Realtime-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

<h1 align="center">
  🖨️ PrintBridge
</h1>

<p align="center">
  <strong>QR-Powered Document Printing for the Modern Campus</strong>
</p>

<p align="center">
  Scan a QR code → Upload your PDF → Pick up your prints. <br />
  No phone number sharing. No waiting in line. No app downloads.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#%EF%B8%8F-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a>
</p>

---

## 🎯 The Problem

Every college student has been there — standing in a long queue at the stationery shop, fumbling with a pen drive, sharing phone numbers on WhatsApp just to get a few pages printed. It's slow, insecure, and frankly, a relic of the past.

**PrintBridge eliminates all of that.** It bridges the gap between students who need prints and shops that provide them — entirely through the browser, powered by QR codes and real-time updates.

---

## ✨ Features

### For Students (Customers)
| Feature | Description |
|---------|-------------|
| 📱 **QR Code Upload** | Scan the shop's QR code with any phone camera — opens the upload page instantly in the browser. No app install required. |
| 📄 **Smart PDF Upload** | Drag-and-drop or tap to upload. Supports files up to 20MB with MIME type + extension validation. |
| 🎛️ **Print Specifications** | Configure copies, color mode (B&W / Color), page range (e.g., `1-5, 8, 10-12`), and double-sided printing — all from a polished UI. |
| 📊 **Real-Time Order Tracking** | Monitor your order status live as it moves from Pending → Printing → Completed. |
| 🔒 **Privacy First** | No phone number sharing with shops. Files are securely uploaded to Cloudinary and auto-deleted. |
| 🧭 **Personal Dashboard** | View all past and current orders with stats, quick actions, and a clean overview. |

### For Shopkeepers
| Feature | Description |
|---------|-------------|
| 🏪 **Shop Dashboard** | A full management panel with live stats — pending, printing, and completed order counts at a glance. |
| 📲 **QR Code Generator** | Generate, download, and print a branded QR code that links directly to your shop's upload page. |
| ⚡ **Real-Time Order Feed** | New orders pop in instantly via **Supabase Realtime** (PostgreSQL CDC) — no page refresh needed. |
| 🔄 **Order Status Workflow** | Progress orders through `PENDING → PRINTING → COMPLETED` or cancel them — with one click. |
| 📎 **Inline PDF Viewer** | Open the customer's uploaded PDF directly from the order card. |
| 📋 **Customer Info at a Glance** | See the customer's name, email, and avatar alongside their print specs. |

### Platform-Wide
- 🔐 **Google OAuth** via NextAuth.js v5 with JWT sessions
- 👤 **Role-Based Access Control** — middleware-enforced `CUSTOMER` / `SHOPKEEPER` roles
- 🌗 **Dark Mode Support** — full theme system with OKLCH color space
- 📱 **Fully Responsive** — built mobile-first for the QR → phone workflow
- ✨ **Premium UI** — glassmorphism, animated gradient orbs, grid patterns, micro-animations

---

## 🔄 How It Works

```
┌──────────────┐       ┌─────────────────┐       ┌──────────────────┐
│              │       │                 │       │                  │
│  📱 Student  │──────▶│  🖨️ PrintBridge  │──────▶│  🏪 Shopkeeper   │
│  scans QR    │       │  (Web App)      │       │  gets order      │
│              │       │                 │       │  instantly       │
└──────────────┘       └─────────────────┘       └──────────────────┘

1. Shopkeeper generates & prints QR code from dashboard
2. Student scans QR → opens /shop/{id}/upload in browser
3. Student uploads PDF + selects print options
4. PDF → Cloudinary CDN, order → Supabase PostgreSQL
5. Shopkeeper receives order via Supabase Realtime (< 1 second)
6. Shopkeeper prints, marks as complete
7. Student's dashboard updates in real-time
```

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React meta-framework with App Router, Server Components, Server Actions |
| **React** | 19.2.3 | UI library with latest concurrent features |
| **Tailwind CSS** | 4.x | Utility-first CSS with OKLCH color space and `@theme` API |

### Backend & Data
| Technology | Purpose |
|------------|---------|
| **Prisma** 7.x | Type-safe ORM with PostgreSQL adapter (`@prisma/adapter-pg`) |
| **Supabase** | Hosted PostgreSQL + **Realtime** (CDC-powered live updates) |
| **Cloudinary** | PDF file storage, streaming uploads via `upload_stream` |

### Authentication & Security
| Technology | Purpose |
|------------|---------|
| **NextAuth.js** v5 (Auth.js) | Google OAuth with Prisma adapter & JWT strategy |
| **Edge Middleware** | Route protection, role-based redirects, session validation |
| **Cookie-based Role Selection** | Pre-signup role assignment via secure cookie flow |

### UI & Design
| Technology | Purpose |
|------------|---------|
| **Radix UI** | Accessible, unstyled primitives (via shadcn/ui) |
| **shadcn/ui** | Pre-built component library (Button, Card) |
| **Lucide React** | Beautiful, consistent icon set |
| **Google Fonts** | Geist Sans, Geist Mono, Share Tech |

### Utilities
| Technology | Purpose |
|------------|---------|
| **QRCode.js** | Server-side QR code generation as base64 data URLs |
| **Custom Hooks** | `useSmoothScroll` — manual easeInOutCubic scroll animation |

---

## 🏗️ Architecture

### System Design

```
                    ┌─────────────────────────────────┐
                    │         Next.js 16 App           │
                    │      (App Router + RSC)          │
                    ├─────────────┬───────────────────┤
                    │  Server     │  Client            │
                    │  Components │  Components        │
                    │  + Actions  │  + Realtime        │
                    └──────┬──────┴────────┬──────────┘
                           │               │
                    ┌──────▼──────┐ ┌──────▼──────────┐
                    │   Prisma 7  │ │ Supabase Client  │
                    │   (pg pool) │ │ (Realtime WS)    │
                    └──────┬──────┘ └──────┬──────────┘
                           │               │
                    ┌──────▼───────────────▼──────────┐
                    │     Supabase PostgreSQL          │
                    │  (RLS + Realtime Publications)   │
                    └─────────────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │      Cloudinary CDN              │
                    │   (PDF storage + streaming)      │
                    └─────────────────────────────────┘
```

### Database Schema

The Prisma schema defines **6 models** across two domains:

**Auth Domain** — `User`, `Account`, `Session`, `VerificationToken`
- NextAuth.js-compatible with Prisma Adapter
- Users carry a `Role` enum (`CUSTOMER | SHOPKEEPER | ADMIN`)

**Business Domain** — `Shop`, `Order`
- **1:1 relationship**: `Shop.id === User.id` (owner's user ID *is* the shop's PK)
- Orders track full lifecycle: `PENDING → PRINTING → COMPLETED / CANCELLED`
- Print specs: copies, color mode, page range, double-sided, pricing (future)
- Indexed on `shopId`, `customerId`, `status`, and `createdAt DESC`

### Key Technical Complexities

#### 🔗 Dual Database Client Architecture
PrintBridge uses **two parallel database connections** to the same Supabase PostgreSQL instance:
- **Prisma 7** with `@prisma/adapter-pg` (connection pool) — for all CRUD operations in Server Actions and API routes
- **Supabase JS Client** — exclusively for **Realtime subscriptions** (WebSocket-based CDC)

This hybrid approach leverages Prisma's type-safety for writes while using Supabase's native Realtime engine for live change data capture.

#### ⚡ Realtime Order Feed with Snake-Case Mapping
Supabase Realtime broadcasts PostgreSQL row-level changes in snake_case (matching DB column names), but Prisma models use camelCase. The `Shopinfo` component includes a **manual field mapper** that translates `shop_id → shopId`, `file_public_id → filePublicId`, etc., ensuring seamless integration between the two paradigms.

#### 🍪 Cookie-Based Pre-Signup Role Assignment
Users select their role (`CUSTOMER` or `SHOPKEEPER`) *before* the OAuth flow begins. The selected role is stored in a browser cookie (`pending_role`), which is then read in the NextAuth `createUser` event to:
1. Update the user's role in the DB
2. Automatically create a `Shop` record if the role is `SHOPKEEPER`
3. Clean up the cookie after use

#### 🔒 Multi-Layer Auth with Edge Middleware
Authentication flows through three layers:
1. **Edge Middleware** — lightweight JWT token inspection for route protection and role-based redirects (runs on Vercel Edge)
2. **Server-Side Auth** — `auth()` calls in Server Components and Server Actions for data-level authorization
3. **Client-Side Session** — `AuthProvider` wrapping the app for client-side session awareness

#### 📤 Streaming PDF Upload Pipeline
File uploads follow a two-stage pipeline:
1. **Client → API Route**: FormData with file validation (type, extension, size ≤ 20MB)
2. **API Route → Cloudinary**: Buffer-based streaming upload via `upload_stream` with unique timestamped public IDs

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- A **Supabase** project (free tier works)
- A **Cloudinary** account
- **Google Cloud** OAuth credentials

### 1. Clone & Install

```bash
git clone https://github.com/Avinash-Gautam-2005/AirPDF.git
cd AirPDF
npm install
```

### 2. Configure Environment

Create a `.env` file with the following variables:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase (for Realtime)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Auth (NextAuth.js)
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Cloudinary (PDF Storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push
```

> **Note:** Enable **Realtime** on the `orders` table in your Supabase dashboard for the live order feed to work.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live! 🎉

---

## 📁 Project Structure

```
AirPDF/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth.js API route
│   │   └── upload/                 # PDF upload endpoint
│   ├── dashboard/
│   │   ├── page.jsx                # Smart redirect based on role
│   │   ├── shopkeeper/[id]/        # Shopkeeper dashboard + components
│   │   └── student/[id]/           # Student dashboard + components
│   ├── login/                      # Google OAuth login page
│   ├── select/                     # Role selection (pre-signup)
│   ├── shop/[shopId]/upload/       # QR-linked upload page
│   ├── layout.jsx                  # Root layout (fonts, grid bg, auth)
│   ├── page.jsx                    # Landing page
│   └── globals.css                 # Tailwind + OKLCH theme tokens
├── actions/
│   ├── orders.js                   # Create/fetch orders (Server Actions)
│   ├── shopkeeper.js               # QR gen, order mgmt, shop lookup
│   └── users.js                    # User data fetching
├── components/
│   ├── auth/AuthProvider.jsx       # NextAuth SessionProvider
│   ├── landing/                    # Navbar, Hero, Features, HowItWorks, CTA, Footer
│   └── ui/                         # shadcn/ui primitives (Button, Card)
├── hooks/
│   └── useSmoothScroll.js          # Custom easeInOutCubic scroll hook
├── lib/
│   ├── auth.js                     # NextAuth config (Google, JWT, Prisma)
│   ├── cloudinary.js               # Upload, delete, info, signed URL utils
│   ├── prisma.js                   # Prisma singleton with pg adapter pool
│   ├── supabase-client.js          # Supabase client for Realtime
│   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
├── prisma/
│   └── schema.prisma               # Full database schema (6 models)
├── Data/
│   └── landing.js                  # Landing page feature/step data
├── middleware.js                    # Edge route protection + RBAC
├── prisma.config.ts                # Prisma env + datasource config
└── package.json                    # Dependencies & scripts
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client + build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

---

## 🗺️ Roadmap

- [ ] UPI/Stripe payment integration with per-page pricing
- [ ] Push notifications for order status changes  
- [ ] Multi-file upload support  
- [ ] Shop discovery map (find nearby PrintBridge shops)
- [ ] Order history analytics for shopkeepers
- [ ] Admin dashboard for platform management
- [ ] File expiry and auto-cleanup via scheduled jobs
- [ ] Support for DOCX, PPT, and image formats

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ for students who just want their prints</strong>
</p>
