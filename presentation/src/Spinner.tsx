import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SpinnerProps {
  isCreator: boolean;
  handleStartSpinner: () => void;
}

export default function Spinner({
  isCreator,
  handleStartSpinner,
}: SpinnerProps) {
  const [countDown, setCountDown] = useState<number>(3);

  useEffect(() => {
    startSpinnerContext();
  }, []);

  const startSpinnerContext = async () => {
    for (var i = 3; i > 0; i--) {
      setCountDown(i);
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (isCreator) {
      /*await*/ handleStartSpinner(); // Fix async, this method is async
    }
  };

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
