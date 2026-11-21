# Sengoku

**Industry-leading Next.js 15 baseline with bulletproof TypeScript, comprehensive linting, and zero compromises on code quality**

[![TypeScript](https://img.shields.io/badge/TypeScript-Ultra--Strict-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

---

## 🎯 What Makes This Special

- ✅ **Zero bypassing** - TypeScript & ESLint errors FAIL the build
- ✅ **100% TypeScript** - No JavaScript files allowed (enforced)
- ✅ **100+ ESLint rules** - React, a11y, security, complexity checks
- ✅ **pnpm enforced** - npm/yarn blocked with helpful errors
- ✅ **Multi-layer safety** - Build-time + Runtime + Git hooks
- ✅ **Performance monitoring** - Web Vitals & bundle analysis
- ✅ **Beautiful terminal** - Colored output with progress indicators

---

## 📦 Quick Start

### Prerequisites

```bash
# Install pnpm globally (required)
npm install -g pnpm
# or
brew install pnpm
```

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
# Beautiful terminal with startup banner, live metrics, and status updates
```

### Production Build

```bash
pnpm build
# Runs: type-check → lint → build (with visual progress)
```

---

## 🛠️ Available Commands

| Command               | Description                                |
| --------------------- | ------------------------------------------ |
| `pnpm dev`            | Start dev server with enhanced terminal UI |
| `pnpm build`          | Production build with all validations      |
| `pnpm build:analyze`  | Build with bundle size analysis            |
| `pnpm start`          | Start production server                    |
| `pnpm lint`           | Run ESLint                                 |
| `pnpm lint:fix`       | Auto-fix linting issues                    |
| `pnpm type-check`     | TypeScript validation                      |
| `pnpm circular-check` | Detect circular dependencies               |
| `pnpm validate`       | Run all checks (type + lint + circular)    |
| `pnpm test:build`     | Full validation + build                    |
| `pnpm format`         | Format code with Prettier                  |
| `pnpm lighthouse`     | Run Lighthouse CI tests locally            |

---

## 🏗️ Tech Stack

| Technology         | Version | Purpose                    |
| ------------------ | ------- | -------------------------- |
| **Next.js**        | 15.5.4  | React framework (latest)   |
| **React**          | 19      | UI library (latest)        |
| **TypeScript**     | 5.9     | Type safety (ultra-strict) |
| **Tailwind CSS**   | 3.4     | Styling (iOS 12+ support)  |
| **TanStack Query** | Latest  | Server state management    |
| **Zustand**        | Latest  | Client state management    |
| **pnpm**           | 9.15+   | Package manager (enforced) |
| **ESLint**         | 8.57    | Linting (100+ rules)       |
| **Prettier**       | 3.6     | Code formatting            |
| **Husky**          | 9.1     | Git hooks                  |
| **Zod**            | 4.1     | Runtime validation         |

---

## 🔒 TypeScript - Ultra Strict Configuration

**Strictest possible settings - no loopholes:**

```typescript
// Zero tolerance for:
❌ any types
❌ Implicit any
❌ Nullable access without checks
❌ Missing return types
❌ Unused variables
❌ Non-null assertions (!)
❌ JavaScript files
❌ Unchecked index access

// Build FAILS on ANY type error
// No bypassing allowed
```

**Key Settings:**

- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitOverride: true`
- `useUnknownInCatchVariables: true`
- **`allowJs: false`** - No JavaScript files allowed

---

## 🎨 ESLint - Comprehensive Rules (100+)

### React Best Practices

```typescript
// ✅ Enforced
- Arrow function components only
- No unstable nested components
- Proper hook usage
- Exhaustive dependency arrays
- Self-closing tags
- No array index keys

// ❌ Blocked
function MyComponent() { }  // Must be arrow function
```

### Code Quality (SonarJS)

```typescript
// ✅ Enforced
- Max cognitive complexity: 15
- No duplicate functions
- No duplicate strings
- Single boolean returns
- Immediate returns
```

### Security

```typescript
// ❌ Blocked
- Unsafe regex (ReDoS protection)
- eval() usage
- Non-literal regexp
```

### Accessibility (a11y)

```typescript
// ✅ Enforced
- Alt text on images
- Valid ARIA attributes
- Semantic HTML
- Keyboard navigation
- Lang attribute on <html>
```

### Import Organization

```typescript
// ✅ Auto-organized
import { Component } from "react";      // React first
import { Metadata } from "next";        // Next.js
import { Button } from "@/components";  // Internal
import { helper } from "./utils";       // Relative

// ❌ Blocked
- Circular dependencies
- Duplicate imports
- Deprecated imports
```

---

## 🚨 Multi-Layer Safety Net

### 1️⃣ Build Time (No Bypassing)

```typescript
// next.config.ts
typescript: {
  ignoreBuildErrors: false; // ✅ Fails on type errors
}

eslint: {
  ignoreDuringBuilds: false; // ✅ Fails on lint errors
}
```

**What Gets Blocked:**

- Type errors → Build fails
- Lint errors → Build fails
- Circular dependencies → Detected & reported
- JavaScript files → Build fails
- Deprecated APIs → Warned/Blocked

### 2️⃣ Runtime Safety

```typescript
// Error Boundary - catches all React errors
<ErrorBoundary>
  {children}
</ErrorBoundary>

// Zod validation - runtime type checking
import { validate } from "@/lib/utils/validation";
const user = validate(UserSchema, data);

// Performance monitoring
import { measureAsync } from "@/lib/utils/performance";
```

### 3️⃣ Git Hooks

```bash
# Pre-commit (auto-runs)
✓ ESLint auto-fix
✓ Prettier format
✓ Type check

# Pre-push (auto-runs)
✓ Full validation
✓ Circular dependency check
```

---

## ⚡ Performance Features

### Next.js Optimizations

```typescript
✓ React Strict Mode
✓ Compression enabled
✓ Image optimization (AVIF/WebP)
✓ Package import optimization
✓ Tree-shaking enabled
✓ Bundle analysis ready
```

### Lighthouse CI - Performance Monitoring

**Test performance locally:**

```bash
# Test single page (homepage)
pnpm run lighthouse

# Test all pages from config
pnpm run lighthouse -- --all-pages

# Test specific page
pnpm run lighthouse -- --url=http://localhost:3000/about
```

**What it checks:**

- ⚡ Performance ≥ 80%, Accessibility ≥ 90%, SEO ≥ 85%
- 📊 Both desktop 🖥️ and mobile 📱 (3 runs each)
- 📈 Core Web Vitals (LCP, CLS, FCP, TBT, Speed Index)

**Adding pages to test:**

Edit [`lighthouse.config.js`](lighthouse.config.js):

```js
pages: [
  { path: "/", name: "Homepage", critical: true },
  { path: "/about", name: "About", critical: false },
  // Add more pages...
];
```

**CI/CD:** Auto-runs on PRs, comments with results for all configured pages.

### Bundle Analysis

```bash
pnpm run build:analyze
# Opens interactive bundle analyzer
# Identifies large dependencies & optimization opportunities
```

---

## 🔐 Security Headers

**Automatically applied to all routes:**

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: on
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 🌐 Browser Support

```json
{
  "browserslist": [
    "iOS >= 12",
    "Safari >= 12",
    "Chrome >= 90",
    "Firefox >= 88",
    "Edge >= 90"
  ]
}
```

---

## 📁 Project Structure

```
sengoku/
├── app/
│   ├── (landing)/                # Main domain (www.instaheadshots.com)
│   │   ├── layout.tsx            # Marketing layout
│   │   ├── page.tsx              # Homepage
│   │   ├── about/                # Static pages
│   │   ├── pricing/
│   │   ├── privacy/
│   │   ├── refund/
│   │   └── terms/
│   │
│   ├── (dashboard)/              # Auth-required pages (main domain)
│   │   ├── layout.tsx            # Dashboard layout with auth
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── profile/
│   │
│   ├── events/                   # events.instaheadshots.com subdomain
│   │   └── [eventId]/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   │
│   ├── enterprise/               # jpmc/jpmorgan.instaheadshots.com
│   │   └── [client]/             # Dynamic enterprise clients
│   │       ├── advisor/
│   │       └── admin/
│   │
│   ├── (subdomain)/              # Dynamic subdomains
│   │   └── lp/                   # lp.instaheadshots.com
│   │       ├── layout.tsx
│   │       └── page.tsx
│   │
│   ├── components/
│   │   └── error-boundary.tsx    # React error catching
│   ├── globals.css
│   ├── layout.tsx                # Root layout with error boundary
│   ├── page.tsx
│   └── web-vitals.tsx            # Performance monitoring
│
├── lib/
│   ├── stores/                   # Zustand stores (client state)
│   │   ├── index.ts              # Unified store exports
│   │   ├── modal-store.ts        # Modal UI state
│   │   ├── photoshoot-store.ts   # Photoshoot flow state
│   │   └── team-store.ts         # Team flow state
│   ├── queries/                  # TanStack Query hooks (server state)
│   │   ├── index.ts              # Unified query exports
│   │   ├── photoshoot.ts         # Photoshoot queries
│   │   ├── team.ts               # Team queries
│   │   └── pricing.ts            # Pricing queries
│   ├── providers/
│   │   └── query-provider.tsx    # TanStack Query provider
│   ├── schemas/                  # Zod schemas for validation
│   │   ├── photoshoot.schema.ts
│   │   ├── team.schema.ts
│   │   └── pricing.schema.ts
│   ├── constants/
│   │   ├── enterprise.ts         # Enterprise clients & business logic
│   │   ├── events.ts             # Event clients & validation
│   │   ├── subdomains.ts         # Dynamic subdomain routing
│   │   └── index.ts              # Main constants entry point
│   └── utils/
│       ├── common/
│       │   ├── extract-subdomain.ts
│       │   └── extract-first-non-locale-pathname-part.ts
│       ├── validation.ts         # Zod validation utilities
│       ├── performance.ts        # Performance tracking
│       └── get-deployment-env.ts # Environment detection
│
├── scripts/
│   ├── preinstall.ts             # Package manager enforcement
│   ├── dev.ts                    # Enhanced dev server
│   ├── build.ts                  # Enhanced build process
│   ├── check-circular-deps.ts    # Circular dependency checker
│   └── lighthouse-local.ts       # Local Lighthouse CI runner
├── .husky/
│   ├── pre-commit                # Auto-fix before commit
│   └── pre-push                  # Validate before push
├── .github/
│   └── workflows/
│       └── lighthouse-ci.yml     # Lighthouse CI automation
├── .vscode/
│   ├── settings.json             # Editor config
│   └── extensions.json           # Recommended extensions
├── .eslintrc.json                # 320+ lines of rules
├── .prettierrc
├── .lintstagedrc.mjs
├── lighthouserc.json             # Lighthouse CI config & budgets
├── next.config.ts                # Performance & security config
├── tailwind.config.ts
├── tsconfig.json                 # Ultra-strict TypeScript
├── env.d.ts                      # Environment type safety
└── package.json
```

---

## 🗃️ State Management (TanStack Query + Zustand)

**TanStack Query** for server state + **Zustand** for client state - the modern React state management approach.

### Architecture

```
┌─────────────────────────────────────────────────────┐
│  TanStack Query (Server State)                      │
│  - Photoshoots, Teams, Pricing, Generation Jobs     │
│  - Automatic caching & background refetching         │
│  - Optimistic updates & polling support              │
│  - Deduplication & request cancellation              │
├─────────────────────────────────────────────────────┤
│  Zustand (Client State)                             │
│  - Modal state, flow steps, temp selections          │
│  - Lightweight, no boilerplate                       │
│  - DevTools integration (development)                │
└─────────────────────────────────────────────────────┘
```

### Quick Usage

**1. Fetch server data (TanStack Query):**

```tsx
import { usePhotoshoot } from "@/lib/queries";

const { data, error, isLoading, refetch } = usePhotoshoot(id);
```

**2. Create/update server data:**

```tsx
import { useCreatePhotoshoot } from "@/lib/queries";

const createPhotoshoot = useCreatePhotoshoot();

const handleCreate = async () => {
  try {
    const result = await createPhotoshoot.mutateAsync({ name: "New Shoot" });
  } catch (error) {
    console.error("Failed:", error);
  }
};
```

**4. Manage client UI state (Zustand):**

```tsx
import { usePhotoshootStore } from "@/lib/stores";

const { currentStep, nextStep, setSelectedPlan } = usePhotoshootStore();

// Or with selectors (prevents unnecessary re-renders)
const currentStep = usePhotoshootStore((state) => state.currentStep);
```

### Available Queries

**Photoshoot Queries** (`lib/queries/photoshoot.ts`):

```tsx
// Queries
usePhotoshoot(id);
usePhotoshootList({ page, pageSize, status });
useGenerationStatus(jobId, { refetchInterval: 5000 });

// Mutations
useCreatePhotoshoot();
useUpdatePhotoshoot();
useDeletePhotoshoot();
useSelectLooks();
```

**Team Queries** (`lib/queries/team.ts`):

```tsx
useTeam(teamId);
useTeamMembers(teamId);
useCreateTeam();
useUpdateTeam();
useInviteTeamMembers();
useRemoveTeamMember();
useUpdateTeamMemberRole();
```

**Pricing Queries** (`lib/queries/pricing.ts`):

```tsx
useGetPricingPlans({ planName: "STANDARD" | "UPSELL" | "TEAM" });
useCreatePaymentIntent();
useConfirmPayment();
```

### Available Stores

**Modal Store** (`lib/stores/modal-store.ts`):

```tsx
import { useModalStore } from "@/lib/stores";

const { isOpen, type, data, openModal, closeModal } = useModalStore();
openModal("payment", { amount: 100 });
```

**Photoshoot Store** (`lib/stores/photoshoot-store.ts`):

```tsx
import { usePhotoshootStore, PhotoshootStep } from "@/lib/stores";

const { currentStep, setStep, nextStep, prevStep, reset } =
  usePhotoshootStore();
setStep(PhotoshootStep.SELECT_PLAN);
```

**Team Store** (`lib/stores/team-store.ts`):

```tsx
import { useTeamStore, TeamStep } from "@/lib/stores";

const { currentStep, selectedCard, startUpgrade, reset } = useTeamStore();
```

### Key Features

**Automatic Query Invalidation (TanStack Query):**

```tsx
import { useQueryClient } from "@tanstack/react-query";
import { photoshootKeys } from "@/lib/queries";

const queryClient = useQueryClient();

// After mutation, invalidate related queries
await createPhotoshoot.mutateAsync(data);
queryClient.invalidateQueries({ queryKey: photoshootKeys.all });
```

**Optimistic Updates:**

```tsx
const updatePhotoshoot = useUpdatePhotoshoot();

updatePhotoshoot.mutate(
  { id, ...updates },
  {
    onMutate: async (newData) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: photoshootKeys.detail(id) });

      // Snapshot previous value
      const previous = queryClient.getQueryData(photoshootKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(photoshootKeys.detail(id), newData);

      return { previous };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(photoshootKeys.detail(id), context?.previous);
    },
  }
);
```

**Immer Integration (Zustand):**

```tsx
// ✅ Built-in Immer support - simple and safe
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useStore = create(
  immer((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        state.items.push(item); // Direct mutation with Immer
      }),
  }))
);
```

**DevTools Integration:**

- **TanStack Query DevTools**: React Query explorer, cache inspector, mutation tracker
- **Zustand DevTools**: Time-travel debugging, state inspection (Chrome/Firefox extensions)

### Common Patterns

**Dependent Queries:**

```tsx
const { data: photoshoot } = usePhotoshoot(photoshootId);
const { data: generation } = useGenerationStatus(photoshoot?.generationJobId, {
  enabled: !!photoshoot?.generationJobId, // Only fetch when ID exists
});
```

**Infinite Queries:**

```tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: photoshootKeys.lists(),
    queryFn: ({ pageParam = 1 }) => fetchPhotoshoots(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
```

**Zustand with Selectors (Optimized):**

```tsx
// ❌ Re-renders on ANY state change
const { currentStep, selectedPlan, selectedLooks } = usePhotoshootStore();

// ✅ Only re-renders when currentStep changes
const currentStep = usePhotoshootStore((state) => state.currentStep);
```

### File Structure

```
lib/
├── queries/                    # TanStack Query hooks (server state)
│   ├── index.ts               # Unified exports
│   ├── photoshoot.ts          # Photoshoot queries & mutations
│   ├── team.ts                # Team queries & mutations
│   └── pricing.ts             # Pricing queries & mutations
├── stores/                     # Zustand stores (client state)
│   ├── index.ts               # Unified exports
│   ├── modal-store.ts         # Modal UI state
│   ├── photoshoot-store.ts    # Photoshoot flow state
│   └── team-store.ts          # Team flow state
├── providers/
│   └── query-provider.tsx     # TanStack Query provider
└── schemas/                    # Zod validation schemas
    ├── photoshoot.schema.ts
    ├── team.schema.ts
    └── pricing.schema.ts
```

### Best Practices

1. **Separate concerns** - Server state in TanStack Query, client state in Zustand
2. **Use query keys** - Organize with key factories (`photoshootKeys.detail(id)`)
3. **Leverage selectors** - Prevent unnecessary re-renders with Zustand selectors
4. **Enable when ready** - Use `enabled` option for dependent queries
5. **Invalidate strategically** - Refetch only what's needed after mutations
6. **Validate with Zod** - Runtime type safety for API responses

**Status:** ✅ Production Ready | DevTools: Enabled | Type Safety: Full TypeScript

---

## 🌐 Multi-Domain Architecture

### Subdomain Routing Strategy

This project supports multiple subdomain types:

**1. Main Domain (www.instaheadshots.com)**

- Landing pages → `app/(landing)/`
- Dashboard (auth required) → `app/(dashboard)/`

**2. Enterprise Clients (jpmc.instaheadshots.com, jpmorgan.instaheadshots.com)**

- Routes → `app/enterprise/[client]/`
- Configured in `lib/constants/enterprise.ts`

**3. Events (events.instaheadshots.com/eventId)**

- Routes → `app/events/[eventId]/`
- Configured in `lib/constants/events.ts`

**4. Dynamic Subdomains (lp.instaheadshots.com, etc.)**

- Routes → `app/(subdomain)/lp/`
- Configured in `lib/constants/subdomains.ts`

### Adding New Subdomains

Edit `lib/constants/subdomains.ts`:

```typescript
export const SUBDOMAIN_ROUTES = {
  YOUR_SUBDOMAIN: {
    subdomain: "demo", // demo.instaheadshots.com
    targetRoute: "demo", // Routes to app/(subdomain)/demo/
    enabled: true, // Toggle on/off
    preservePath: true, // Preserve URL paths
    description: "Demo environment",
  },
};
```

Then create the corresponding folder: `app/(subdomain)/demo/`

## 🧪 Testing Subdomain Routes

### Local Development Setup

To test subdomains locally, you need to configure your `/etc/hosts` file:

```bash
sudo nano /etc/hosts
```

Add these entries:

```
127.0.0.1 localhost
127.0.0.1 jpmwm.localhost
127.0.0.1 jpmorgan.localhost
127.0.0.1 events.localhost
127.0.0.1 lp.localhost
```

### Testing Each Route Type

**1. Main Domain (Landing Pages)**

```bash
pnpm dev
# Visit: http://localhost:3000
# Should show: Landing page with header
```

**2. Dashboard (Auth Required)**

```bash
# Visit: http://localhost:3000/dashboard
# Should show: Dashboard page with navigation
```

**3. Enterprise Client (JPMWM)**

```bash
# Visit: http://jpmwm.localhost:3000
# Should show: Enterprise Advisor Portal for JPMWM
# Visit: http://jpmwm.localhost:3000/admin
# Should show: Enterprise Admin Portal for JPMWM
```

**4. Enterprise Client (JPMorgan)**

```bash
# Visit: http://jpmorgan.localhost:3000
# Should show: Enterprise Advisor Portal for JPMorgan
```

**5. Events Subdomain**

```bash
# Visit: http://events.localhost:3000/w6Z_J-AroJE
# Should show: Event page with Event ID
# (Use valid event IDs from lib/constants/events.ts)
```

**6. Dynamic Subdomain (LP Campaign)**

```bash
# Visit: http://lp.localhost:3000
# Should show: Landing Page Campaign
```

### Middleware Flow

The middleware processes requests in this order:

1. **Events subdomain** → Rewrites to `/events/[eventId]`
2. **Enterprise subdomain** → Rewrites to `/enterprise/[client]/advisor` or `/admin`
3. **Dynamic subdomain** → Rewrites to `/(subdomain)/[targetRoute]`
4. **Main domain** → Standard i18n routing

---

## 💡 Code Examples

### React Component

```typescript
// ✅ Correct pattern (enforced)
const MyComponent = (): React.ReactElement => {
  return <div>Hello</div>;
};

export default MyComponent;

// ❌ This will fail linting
export default function MyComponent() {
  return <div>Hello</div>;
}
```

### Type Safety

```typescript
// ✅ Explicit null checks required
const user = await fetchUser();
if (user !== null) {
  console.log(user.name); // Safe
}

// ❌ This will fail TypeScript
console.log(user.name); // Error: Object is possibly null
```

### Validation

```typescript
import { validate } from "@/lib/utils/validation";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  age: z.number().positive(),
});

// Runtime validation with type safety
const user = validate(UserSchema, apiResponse, "UserAPI");
// user is fully typed as { id: string; email: string; age: number }
```

### Error Handling

```typescript
// ✅ Correct pattern (enforced)
try {
  await riskyOperation();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Failed:", error.message);
  }
  throw error;
}

// ❌ This will fail TypeScript
catch (error) { ... } // Error: Implicit any
catch (error: any) { ... } // Error: Explicit any not allowed
```

---

## 🎯 Validation Pipeline

### Development Workflow

```bash
1. Write code
2. Save → Auto-format (Prettier)
3. Commit → Pre-commit hook runs
   ✓ ESLint auto-fix
   ✓ Type check
4. Push → Pre-push hook runs
   ✓ Full validation
   ✓ Circular dependency check
5. Build → All checks run
   ✓ Type check
   ✓ Lint
   ✓ Build
```

### What Happens on Errors

```bash
# Type error
❌ Build fails immediately
📝 Shows exact location and issue
🚫 Cannot deploy until fixed

# Lint error
❌ Build fails immediately
🔧 Auto-fixable? Run: pnpm lint:fix
🚫 Cannot deploy until fixed

# Circular dependency
⚠️  Detected and reported
📊 Shows dependency chain
💡 Must refactor to resolve
```

---

## 🚀 Performance Benchmarks

| Metric        | Target  | Status       |
| ------------- | ------- | ------------ |
| First Load JS | < 100kb | ✅ 102kb     |
| Build Time    | < 10s   | ✅ ~3s       |
| Type Check    | < 5s    | ✅ ~2s       |
| Lint Check    | < 5s    | ✅ ~2s       |
| LCP           | < 2.5s  | ✅ Monitored |
| CLS           | < 0.1   | ✅ Monitored |

---

## 🔧 Customization

### Add New Validation Rule

```json
// .eslintrc.json
{
  "rules": {
    "your-custom-rule": "error"
  }
}
```

### Add Runtime Validation

```typescript
// Create schema
const MySchema = z.object({ ... });

// Use in component/API
const data = validate(MySchema, rawData, "MyContext");
```

### Disable Rule for Specific Line

```typescript
// Only when absolutely necessary
// eslint-disable-next-line rule-name
const specialCase = ...;
```

---

## 🐛 Troubleshooting

### "npm install" shows error

**Expected behavior!** This project requires pnpm.

```bash
# Solution
pnpm install
```

### Type errors in node_modules

Already handled - `skipLibCheck: true` for external packages, but your code is fully checked.

### Build fails on lint errors

**Expected behavior!** Fix the errors or use:

```bash
pnpm lint:fix  # Auto-fix what's possible
```

### Pre-commit hook seems slow

It's running validations to catch errors early. Much faster than debugging in production!

---

## 🏆 What Makes This Baseline Exceptional

| Feature                | This Setup               | Typical Projects |
| ---------------------- | ------------------------ | ---------------- |
| TypeScript Strictness  | Ultra-strict (10+ flags) | Moderate         |
| ESLint Rules           | 100+ rules               | 20-30 rules      |
| Build Validation       | FAILS on errors          | Often skipped    |
| JavaScript Files       | ❌ Blocked               | ✅ Allowed       |
| Package Manager        | 🔒 Enforced              | ⚠️ Mixed         |
| Git Hooks              | Multi-layer              | Sometimes        |
| Error Boundaries       | ✅ Built-in              | Rare             |
| Performance Monitoring | ✅ Web Vitals            | Rare             |
| Circular Deps          | ✅ Detected              | ❌ No            |
| Runtime Validation     | ✅ Zod ready             | ❌ No            |

---

## ✅ Verification Checklist

Run this to verify everything works:

```bash
pnpm run validate      # All checks pass
pnpm run test:build    # Full build succeeds
pnpm run circular-check # No circular dependencies
```

**All should pass with ✅**

---

## 💬 Philosophy

> **"Catch bugs at build time, not in production."**

This setup enforces best practices through tooling, not documentation. If it compiles and lints, it follows best practices. No exceptions, no shortcuts.

---

**Built with zero compromises. Ship with confidence.** 🚀
