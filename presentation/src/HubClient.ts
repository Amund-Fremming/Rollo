import * as signalR from "@microsoft/signalr";

const HUB_ENDPOINT =
  "https://rollo-frhufugpchezckfj.northeurope-01.azurewebsites.net/spinhub";

export const createConnection = (): signalR.HubConnection => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${HUB_ENDPOINT}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  console.info("Connection created");
  return connection;
};

export const stopConnection = async (connection: signalR.HubConnection) => {
  return connection
    .stop()
    .then(() => console.log("Connection stopped"))
    .catch((err) => console.error("Error while stopping connection: ", err));
};

export const startConnection = async (
  connection: signalR.HubConnection
): Promise<void> => {
  try {
    await connection.start();
  } catch (error) {
    console.error("Start connection failed", error);
  }
};

export const subscribe = async (
  connection: signalR.HubConnection,
  gameId: string,
  userId: string
): Promise<void> => {
  try {
    await connection.invoke("Subscribe", gameId, userId);
  } catch (error) {
    console.error("Error subscribing", error);
  }
};

export const createGame = async (
  connection: signalR.HubConnection,
  gameId: string,
  userId: string
): Promise<void> => {
  try {
    await connection.invoke("CreateGame", gameId, userId);
  } catch (error) {
    console.error("Error creating game", error);
  }
};

export const startGame = async (
  connection: signalR.HubConnection,
  gameId: string
): Promise<void> => {
  try {
    await connection.invoke("StartGame", gameId);
  } catch (error) {
    console.error("Error starting game", error);
  }
};

export const startSpinnner = async (
  connection: signalR.HubConnection,
  gameId: string,
  userId: string
): Promise<void> => {
  try {
    await connection.invoke("StartSpinner", gameId, userId);
  } catch (error) {
    console.error("Error creating game", error);
  }
};
