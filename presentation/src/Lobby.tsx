import { Pressable, StyleSheet, Text, View } from "react-native";

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
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "40%",
  },
});
