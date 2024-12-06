import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
    const id = crypto.randomUUID();
    setUserId(id);
  }, []);

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
      <Pressable onPress={handleJoin}>
        <Text>Join</Text>
      </Pressable>
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
