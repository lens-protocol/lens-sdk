import { IBindings, LensConfig, LensProvider, sources, staging } from "@lens-protocol/react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { ExplorePublications } from "./src/ExplorePublications";
import { mmkvStorageProvider } from "./src/mmkvStorageProvider";

export function bindings(): IBindings {
  return {
    getProvider: async ({}) => {
      throw new Error("NOT SUPPORTED");
    },
    getSigner: async ({}) => {
      throw new Error("NOT SUPPORTED");
    },
  };
}

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: staging,
  sources: [sources.lenster, sources.orb, "any-other-app-id"],
  storage: mmkvStorageProvider(),
};

export default function App() {
  return (
    <LensProvider config={lensConfig}>
      <ExplorePublications />
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </LensProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
