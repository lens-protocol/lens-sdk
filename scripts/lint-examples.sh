#!/bin/bash

cd "$(dirname "$0")" || exit

cd ../examples/react-native || exit

pnpm install

pnpm lint
