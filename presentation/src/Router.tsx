import { StyleSheet, View } from "react-native";
import { StateProvider, useStateProvider } from "./StateProvider";
import { GameState } from "./GameState";
import Start from "./Start";
import Lobby from "./Lobby";
import Spinner from "./Spinner";
import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import {
  createConnection,
  createGame,
  startConnection,
  stopConnection,
  subscribe,
} from "./HubClient";

const MESSAGE = "MESSAGE";
const GAME_STATE = "GAME_STATE";

export default function Router() {
  const { gameState, setGameState } = useStateProvider();

  const [connection, setConnection] = useState<HubConnection>();
  const [message, setMessage] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = uuidv4();
    setUserId(id);

    handleHub();
  }, []);

  const handleHub = async () => {
    const con = createConnection();
    setConnection(con);
    await startConnection(con);

    con.on(MESSAGE, (message: string) => {
      console.log("Message received from backend: ", message);
      setMessage(message);
    });

    con.on(GAME_STATE, (gameState: string) => {
      console.log("Recieved state from backend: ", gameState);
      setGameState(gameState);
    });

    con.onclose(async () => {
      console.warn("Connection lost. Attempting to reconnect...");
      await startConnection(con);
    });

    return async () => await stopConnection(con);
  };

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const handleCreate = async () => {
    if (connection) await createGame(connection, gameId, userId);
  };

  const handleJoin = async () => {
    if (connection) await subscribe(connection, gameId, userId);
  };

  return (
    <StateProvider>
      <View style={styles.container}>
        {gameState === GameState.Start && (
          <Start
            gameId={gameId}
            setGameId={setGameId}
            handleCreate={handleCreate}
            handleJoin={handleJoin}
          />
        )}
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
