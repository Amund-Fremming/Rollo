import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Spinner from "./Spinner";
import Splash from "./Splash";
import Start from "./Start";
import Lobby from "./Lobby";

export default function Router() {
  const [index, setIndex] = useState<number>(0);

  return (
    <View style={styles.container}>
      {index == 0 && <Start />}
      {index == 1 && <Spinner />}
      {index == 2 && <Splash />}
      {index == 3 && <Lobby />}
      <Pressable onPress={() => setIndex(index + 1)}>
        <Text>next comp</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
