import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SpinnerProps {
  userId: string;
  isCreator: boolean;
  handleStartSpinner: () => void;
  permChoosen: string;
}

export default function Spinner({
  userId,
  isCreator,
  handleStartSpinner,
  permChoosen,
}: SpinnerProps) {
  const [countDown, setCountDown] = useState<number>(3);
  const [backgroundColor, setBackgroundColor] = useState<string>("red");

  useEffect(() => {
    startSpinnerContext();
  }, []);

  useEffect(() => {
    if (permChoosen == userId) {
      setBackgroundColor("red");
    } else {
      setBackgroundColor("green");
    }
  }, [permChoosen]);

  const startSpinnerContext = async () => {
    for (var i = 3; i > 0; i--) {
      setCountDown(i);
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (isCreator) {
      /*await*/ handleStartSpinner(); // Fix async, this method is async
      console.log("Creator started spin");
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
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
