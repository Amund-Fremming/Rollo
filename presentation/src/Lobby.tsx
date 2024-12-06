import { StyleSheet, Text, View } from "react-native";

export default function Lobby() {
  return (
    <View style={styles.container}>
      <Text>Lobby</Text>
      <Text>Waiting for host</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "40%",
  },
});
