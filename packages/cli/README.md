# Lens CLI

CLI tool for Lens developers.

**Please note, this is an experimental tool and it may undergo significant changes in the future.**

## Usage

Install the Lens CLI from npm.

```bash
npm install -g @lens-protocol/cli
```

See the available commands. The first level command decides the environment: `development` or `production`.
You can use shorthand `dev` and `prod` instead.

```bash
lens development --help
```

or

```bash
lens production --help
```

## Local Setup

First install dependencies. Run all commands from the monorepo root directory.

```bash
pnpm install
```

Start the development mode. It will watch for changes and rebuild the CLI.

```bash
pnpm --dir packages/cli dev
```

Then link the package globally.

```bash
pnpm --dir packages/cli link --global
```

Now you can run the CLI from anywhere.

```bash
lens --help
```

Delete the global link when you're done.

```bash
pnpm remove --global @lens-protocol/cli
```
