# ReactNativeProject 🚀

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Expo](https://img.shields.io/badge/Expo-CLI-blue)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A **React Native monorepo** containing multiple inner apps using **Expo**, **shared dependencies**, and a single `node_modules` to reduce duplication and save space.

**Included Inner Apps**:

- `keyboard-avoiding` – Example app demonstrating keyboard handling
- `socket-connections` – Example app demonstrating WebSocket usage
- `context` – Example app demonstrating React Context and state management

---

## 📂 Project Structure

```
ReactNativeProject/
├─ package.json           # Root workspace
├─ node_modules/          # Shared dependencies
├─ apps/                  # Inner projects
│  ├─ keyboard-avoiding/
│  ├─ socket-connections/
│  └─ context/
├─ packages/              # Shared modules (UI, utilities)
├─ .gitignore
└─ README.md
```

- **apps/** → Contains all inner apps  
- **packages/** → Shared modules (UI components, utils)  
- **node_modules/** → Shared dependencies (no duplication in inner apps)

---

## ⚡ Prerequisites

- Node.js >= 18  
- npm / yarn / pnpm  
- Expo CLI globally installed:

```bash
npm install -g expo-cli
```

---

## ⚙️ Setup

1. **Clone the repository**:

```bash
git clone <your-repo-url>
cd ReactNativeProject
```

2. **Install dependencies (from root)**:

```bash
# npm
npm install

# or yarn
yarn install

# or pnpm (recommended)
pnpm install
```

> ⚠️ Do not run `npm install` inside inner apps — all dependencies are shared.

---

## ▶️ Running an Inner App

```bash
cd apps/keyboard-avoiding
npx expo start
```

- Android: `npx expo start --android`  
- iOS: `npx expo start --ios`  
- Web: `npx expo start --web`

---

## 🆕 Adding a New Inner App

```bash
cd apps
npx create-expo-app new-app-name
cd new-app-name
rm -rf node_modules package-lock.json
cd ../../
npm install
cd apps/new-app-name
npx expo start
```

---

## 📦 Shared Packages

- Shared code (UI components, utilities) should go in `packages/`  
- Example: `packages/ui-kit`

Add shared package as a dependency in inner apps:

```json
"dependencies": {
  "@myorg/ui-kit": "*"
}
```

- Install / link packages from root:

```bash
npm install
```

- Import in any inner app:

```javascript
import { Button } from '@myorg/ui-kit';
```

---

## 🌐 Running All Inner Apps (Development)

Open **separate terminals** for each inner app:

```bash
# Terminal 1
cd apps/keyboard-avoiding
npx expo start

# Terminal 2
cd apps/socket-connections
npx expo start

# Terminal 3
cd apps/context
npx expo start
```

---

## 📝 Git Notes

- Only **source code and configuration** are tracked.  
- `node_modules`, build folders, and caches are ignored.  
- Recommended `.gitignore` for this monorepo:

```gitignore
# Node modules
node_modules/
**/node_modules/

# Expo / React Native
.expo/
.expo-shared/

# iOS / Android build files
ios/build/
android/build/
android/.gradle/

# Logs
*.log

# Temp files
.DS_Store

# Allow inner apps code
!apps/**/package.json
!apps/**/app/
!apps/**/components/
!apps/**/assets/
```

- Make sure **inner apps are tracked** (not just node_modules).

---

## 💡 Useful Commands (Mac)

```bash
# Clone & install
git clone <your-repo-url>
cd ReactNativeProject
npm install  # or yarn / pnpm

# Run an inner app
cd apps/keyboard-avoiding
npx expo start
npx expo start --android   # Android
npx expo start --ios       # iOS
npx expo start --web       # Web

# Run multiple apps simultaneously (open separate terminals)
cd apps/socket-connections && npx expo start
cd apps/context && npx expo start

# Add new inner app
cd apps
npx create-expo-app new-app-name
cd new-app-name
rm -rf node_modules package-lock.json
cd ../../
npm install
cd apps/new-app-name
npx expo start
```

---

## 🎯 Tips

- Use **pnpm** for faster installs and better deduplication.  
- Keep **shared components in `packages/`** for reusability.  
- Each inner app should list **only its own dependencies** in its `package.json`.