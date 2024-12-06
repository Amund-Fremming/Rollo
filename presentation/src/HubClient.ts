import * as signalR from "@microsoft/signalr";

const HUB_ENDPOINT =
  "https://rollo-frhufugpchezckfj.northeurope-01.azurewebsites.net/spinhub";

// Create the connection
export const createConnection = (): signalR.HubConnection => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${HUB_ENDPOINT}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  console.info("Connection created");
  return connection;
};

// Start the connection
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
  userId: string,
  gameId: string
): Promise<void> => {
  try {
    await connection.invoke("Subscribe", userId, gameId);
  } catch (error) {
    console.error("Error subscribing", error);
  }
};

export const createGame = async (
  connection: signalR.HubConnection,
  userId: string,
  gameId: string
): Promise<void> => {
  try {
    await connection.invoke("CreateGame", userId, gameId);
  } catch (error) {
    console.error("Error creating game", error);
  }
};
