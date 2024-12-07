import { StyleSheet, View, Text } from "react-native";
import Start from "./Start";
import Lobby from "./Lobby";
import Spinner from "./Spinner";
import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import {
  createConnection,
  createGame,
  startConnection,
  startGame,
  startSpinnner,
  stopConnection,
  subscribe,
} from "./HubClient";

const MESSAGE = "MESSAGE";
const GAME_STATE = "GAME_STATE";
const PERM_CHOOSEN = "PERM_CHOOSEN";

const START = "START";
const LOBBY = "LOBBY";
const SPINNER = "SPINNER";

export default function Router() {
  const [gameState, setGameState] = useState<string>(START);
  const [creator, setCreator] = useState<boolean>(false);
  const [connection, setConnection] = useState<HubConnection>();
  const [message, setMessage] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [permChoosen, setPermChoosen] = useState<string>("");

  useEffect(() => {
    const id = uuidv4();
    setUserId(id);
  }, []);

  useEffect(() => {
    handleHub();
  }, [gameState]);

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

    con.on(PERM_CHOOSEN, (gameId: string) => {
      console.log("Recieved choosen player: ", gameId);
      setPermChoosen(gameId);
    });

    con.onclose(async () => {
      console.warn("Connection lost. Attempting to reconnect...");
      await startConnection(con);
    });

    return async () => {
      await stopConnection(con);
      setCreator(false);
    };
  };

  const handleStartGame = async () => {
    if (connection) await startGame(connection, gameId);
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
    if (connection) {
      await createGame(connection, gameId, userId);
      setCreator(true);
    }
  };

  const handleJoin = async () => {
    if (connection) await subscribe(connection, gameId, userId);
  };

  const handleStartSpinner = async () => {
    if (connection) await startSpinnner(connection, gameId);
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      {gameState === START && (
        <Start
          gameId={gameId}
          setGameId={setGameId}
          handleCreate={handleCreate}
          handleJoin={handleJoin}
        />
      )}
      {gameState == LOBBY && (
        <Lobby isCreator={creator} handleStartGame={handleStartGame} />
      )}
      {gameState == SPINNER && (
        <Spinner
          userId={userId}
          isCreator={creator}
          handleStartSpinner={handleStartSpinner}
          permChoosen={permChoosen}
        />
      )}
    </View>
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
