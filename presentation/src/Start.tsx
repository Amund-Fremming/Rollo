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

interface StartProps {
  gameId: string;
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  handleCreate: () => void;
  handleJoin: () => void;
}

export default function Start({
  gameId,
  setGameId,
  handleCreate,
  handleJoin,
}: StartProps) {
  return (
    <View style={styles.container}>
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
