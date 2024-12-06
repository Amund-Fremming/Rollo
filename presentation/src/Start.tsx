import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createConnection,
  createGame,
  startConnection,
  stopConnection,
  subscribe,
} from "./HubClient";
import { GameState } from "./GameState";
import { useStateProvider } from "./StateProvider";

const MESSAGE = "MESSAGE";
const GAME_STATE = "GAME_STATE";
export default function Start() {
  const [connection, setConnection] = useState<HubConnection>();
  const [message, setMessage] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const { gameState, setGameState } = useStateProvider();

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

    con.on(GAME_STATE, (gameState: GameState) => {
      console.log("Recieved state from backend: ", gameState);
      // setGameState(gameState);
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
    <View style={styles.container}>
      <Text>Message: {message}</Text>
      <TextInput
        style={styles.input}
        value={gameId}
        onChangeText={(input) => setGameId(input)}
        placeholder="Game id"
      />
      <Pressable style={styles.createButton} onPress={handleCreate}>
        <Text>Create</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={gameId}
        onChangeText={(input) => setGameId(input)}
        placeholder="Game id"
      />
      <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
        <Text>Join</Text>
      </TouchableOpacity>
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

  joinButton: {
    width: 200,
    height: 100,
    backgroundColor: "red",
  },

  createButton: {
    width: 200,
    height: 100,
    backgroundColor: "green",
  },

  input: {
    height: 60,
    width: 100,
  },
});
