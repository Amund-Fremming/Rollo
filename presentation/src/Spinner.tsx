import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SpinnerProps {
  isCreator: boolean;
}

export default function Spinner({ isCreator }: SpinnerProps) {
  const [countDown, setCountDown] = useState<number>(3);

  useEffect(() => {
    if (isCreator) {
      for (var i = 3; i > 0; i--) {
        setCountDown(i);
        setTimeout(() => console.log(""), 1000);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Spinner is starting in: {countDown}</Text>
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
