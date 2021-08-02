import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Donut from "./src/components/Donut";

export default function App() {
  const payload = {
    percentage: 75,
    radius: 200,
    strokeWidth: 80,
    duration: 1000,
    color: "tomato",
    delay: 0,
    // textcolor: "#715",
    max: 100,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Donut payload={payload} />
    </View>
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
