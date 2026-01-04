# Monorepo Developer Guide 🛠️

This guide explains how to **develop and manage dependencies** in a React Native monorepo with multiple inner apps and packages.

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
│  └─ ui-kit/
├─ scripts/               # Helper scripts
│  └─ add-package.js
└─ README.md
```

- `apps/` → React Native inner apps
- `packages/` → Reusable packages (components, utils)
- `scripts/` → Helper scripts for dependency management
- `node_modules/` → Shared dependencies across the monorepo

---

## ⚡ Prerequisites

- Node.js >= 18
- npm / yarn / pnpm
- Expo CLI globally installed:

```bash
npm install -g expo-cli
```

---

## 📥 Installing Dependencies

All dependencies should be installed **from the root** to maintain a single `node_modules`:

```bash
# Install all dependencies for the monorepo
npm install
# or yarn install / pnpm install
```

> Do not run `npm install` inside inner apps or packages.

---

## ▶️ Running Inner Apps

```bash
# Navigate to the inner app
cd apps/keyboard-avoiding
npx expo start

# Options:
npx expo start --android  # Android
npx expo start --ios      # iOS
npx expo start --web      # Web
```

> Open multiple terminals to run multiple apps simultaneously.

---

## ➕ Adding Dependencies

### Using the custom `addpkg` script

We have a script to **install dependencies in apps or packages** easily.

### Usage:

```bash
npm run addpkg <workspace-name> [-a | -p] [package-name] [--dev]
```

#### Options:

| Flag | Meaning |
|------|---------|
| `-a` | Install in apps folder |
| `-p` | Install in packages folder |
| `workspace-name` | Specific app/package (optional, otherwise installs in all) |
| `--dev` | Install as dev dependency |

#### Examples:

**Install in a single app:**
```bash
npm run addpkg react-native-gesture-handler -a keyboard-avoiding
```

**Install in all apps:**
```bash
npm run addpkg react-native-gesture-handler -a
```

**Install in a single package:**
```bash
npm run addpkg lodash -p ui-kit
```

**Install in all packages:**
```bash
npm run addpkg lodash -p
```

**Install as dev dependency:**
```bash
npm run addpkg @types/react-native-gesture-handler -a keyboard-avoiding --dev
```

---

## 🏗️ Adding a New Inner App

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

> The inner app will use **shared dependencies** from the root.

---

## 🏗️ Adding a New Package

```bash
cd packages
mkdir new-package
cd new-package
npm init -y
```

- Create `src/` folder and add components or utils.
- Add `index.ts` to export all components.
- Build TypeScript:

```bash
npm run build
```

- Use `addpkg` script to install dependencies if needed.

---

## 📌 Best Practices

- Use **workspace-aware installs** with `addpkg` instead of running `npm install` inside apps/packages.
- Keep **shared components in `packages/`** to avoid duplication.
- Each inner app/package should declare its own dependencies in its `package.json`.
- Use `pnpm` or `yarn` workspaces for faster installs and better deduplication.
- Always run `npm install` or `yarn install` from the **root**.

---

This guide ensures **consistent dependency management** across your React Native monorepo and makes it easy for developers to add packages safely.

