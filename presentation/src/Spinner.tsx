import { StyleSheet, Text, View } from "react-native";

export default function Spinner() {
  return (
    <View style={styles.container}>
      <Text>Spinner</Text>
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
