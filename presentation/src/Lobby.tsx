import { version } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { verticalScale } from "./shared/assets/Dimentions";
import { Colors } from "./shared/assets/Colors";

interface LobbyProps {
  isCreator: boolean;
  handleStartGame: () => void;
}

export default function Lobby({ isCreator, handleStartGame }: LobbyProps) {
  return (
    <View style={styles.container}>
      <Text>Lobby</Text>
      <Text>Waiting for host</Text>
      {isCreator && (
        <Pressable onPress={handleStartGame}>
          <Text>StartGame</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Dark,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
