#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<USAGE
Usage: $0 [--router|-r] [--typescript|-t] <app-name>

Options:
  -r, --router       Scaffold app with Expo Router installed and an `app/` layout
  -t, --typescript   Use the TypeScript template
  -h, --help         Show this help
USAGE
  exit 1
}

if [ $# -eq 0 ]; then
  usage
fi

ROUTER=0
TS=0
APP_NAME=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -r|--router)
      ROUTER=1; shift ;;
    -t|--typescript)
      TS=1; shift ;;
    -h|--help)
      usage ;;
    --)
      shift; break ;;
    -* )
      echo "Unknown option: $1" >&2; usage ;;
    * )
      if [ -z "$APP_NAME" ]; then
        APP_NAME="$1"
        shift
      else
        usage
      fi
      ;;
  esac
done

if [ -z "$APP_NAME" ]; then
  echo "Error: <app-name> is required." >&2
  usage
fi

TEMPLATE="expo-template-blank"
if [ "$TS" -eq 1 ]; then
  TEMPLATE="expo-template-blank-typescript"
fi

TARGET_DIR="apps/$APP_NAME"

if [ -d "$TARGET_DIR" ]; then
  echo "Error: target directory '$TARGET_DIR' already exists." >&2
  exit 1
fi

echo "Creating Expo app '$APP_NAME' in $TARGET_DIR using template $TEMPLATE"
npx create-expo-app@latest "$TARGET_DIR" --template "$TEMPLATE"

cd "$TARGET_DIR"

if [ "$ROUTER" -eq 1 ]; then
  echo "Installing Expo Router and native dependencies..."
  npx expo install expo-router react-native-gesture-handler react-native-safe-area-context react-native-screens

  echo "Scaffolding minimal app/ layout and index files"
  mkdir -p app
  if [ "$TS" -eq 1 ]; then
    LAYOUT_EXT="tsx"
    INDEX_EXT="tsx"
  else
    LAYOUT_EXT="js"
    INDEX_EXT="js"
  fi

  cat > "app/_layout.$LAYOUT_EXT" <<'LAYOUT_EOF'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return <Stack />
}
LAYOUT_EOF

  cat > "app/index.$INDEX_EXT" <<'INDEX_EOF'
import React from 'react'
import { Text } from 'react-native'

export default function Home() {
  return <Text style={{ padding: 16 }}>Hello from Expo Router app</Text>
}
INDEX_EOF

  echo "Expo Router scaffolded. Add more routes by creating files under app/"
fi

echo "Finished. To run the app:" 
echo "  cd $TARGET_DIR"
echo "  npx expo start"
