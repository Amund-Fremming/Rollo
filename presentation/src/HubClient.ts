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
    console.info("Connection started");
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
    console.info(`Player ${userId}, joined game ${userId}`);
  } catch (error) {
    console.error("Error subscribing :", error);
  }
};
