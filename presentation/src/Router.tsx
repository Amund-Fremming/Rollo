import { StyleSheet, View } from "react-native";
import { StateProvider, useStateProvider } from "./StateProvider";
import { GameState } from "./GameState";
import Start from "./Start";
import Lobby from "./Lobby";
import Spinner from "./Spinner";

export default function Router() {
  const { gameState, setGameState } = useStateProvider();

  return (
    <StateProvider>
      <View style={styles.container}>
        {gameState === GameState.Start && <Start />}
        {gameState === GameState.Lobby && <Lobby />}
        {gameState === GameState.Started && <Spinner />}
      </View>
    </StateProvider>
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
