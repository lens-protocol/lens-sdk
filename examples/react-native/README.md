# [React Native](https://reactnative.dev/) + [TypeScript](https://www.typescriptlang.org/) + Lens React Native SDK Example

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 0: Install dependencies

After having setup the Lens monorepo (see [main README](../../README.md#setup)), install the dependencies for this example:

```bash
pnpm install
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
pnpm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
pnpm run android
```

### For iOS

The first time you run this example on iOS, you will need to install the _CocoaPods_ dependencies. To do so, run the following command:

```bash
pnpm run pod:install
```

then run the following command to start the app:

```bash
pnpm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.
