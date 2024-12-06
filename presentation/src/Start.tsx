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
import { createConnection, startConnection, subscribe } from "./HubClient";
import { useStateProvider } from "./StateProvider";

const IDENTIFIER = "SPIN_HUB";

export default function Start() {
  const [connection, setConnection] = useState<HubConnection>();
  const [message, setMessage] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  // const { gameState, setGameState } = useStateProvider();

  useEffect(() => {
    const id = uuidv4();
    setUserId(id);
  }, []);

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

  const connectToHub = async () => {
    const con = createConnection();
    setConnection(con);

    await startConnection(con);

    con.on(IDENTIFIER, (message: string) => {
      console.log("Game state updated:", message);
      setMessage(message);
    });
  };

  const handleCreate = async () => {
    // TODO
    console.log("Created game");
  };

  const handleJoin = async () => {
    await connectToHub();
    if (connection) await subscribe(connection, gameId, userId);
    console.log("Joined game");
  };

  return (
    <View style={styles.container}>
      <Text>Message: {message}</Text>
      <TextInput
        value={gameId}
        onChangeText={(input) => setGameId(input)}
        placeholder="Game id"
      />
      <Pressable onPress={handleCreate}>
        <Text>Create</Text>
      </Pressable>
      <TextInput
        value={gameId}
        onChangeText={(input) => setGameId(input)}
        placeholder="Game id"
      />
      <TouchableOpacity style={styles.button} onPress={handleJoin}>
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

  button: {
    width: 200,
    height: 100,
    backgroundColor: "red",
  },
});
