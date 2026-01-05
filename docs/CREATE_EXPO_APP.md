# create-expo-app.sh — Scaffold inner Expo apps

This helper script scaffolds new Expo apps into the monorepo `apps/` folder.

Location
- `create-expo-app.sh` at the project root
- NPM shortcuts in `package.json`:
  - `npm run create:app`
  - `npm run create:app:router`
  - `npm run create:app:ts`

Usage (from repo root)
```bash
chmod +x create-expo-app.sh
npm run create:app -- --typescript my-app        # create TypeScript app
npm run create:app:router -- my-router-app       # create app and install Expo Router
# or run directly
./create-expo-app.sh --router --typescript my-app
```

What it does
- Creates the app at `apps/<app-name>` using `npx create-expo-app`.
- Optionally installs `expo-router` and scaffolds a minimal `app/` layout when `--router` is provided.
- Uses the TypeScript template when `--typescript` is passed.

Notes
- Run commands from the project root so `npm` finds the root `package.json`.
- If you prefer running from anywhere, you can use `npm --prefix <project-root> run ...` or make the script globally executable.

Example
```bash
# Create a router-enabled TypeScript app
npm run create:app:router -- my-app
```
