import * as signalR from "@microsoft/signalr";

const HUB_ENDPOINT = "spinhub";

// Create the connection
export const createConnection = (): signalR.HubConnection => {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${HUB_ENDPOINT}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();
};

// Start the connection
export const startConnection = async (
  connection: signalR.HubConnection
): Promise<void> => {
  try {
    await connection.start();
    console.log("Connection started");
  } catch (error) {
    console.error("GameHub Error: ", error);
  }
};

export const subscribe = async (
  connection: signalR.HubConnection,
  userId: string,
  gameId: string
): Promise<void> => {
  try {
    await connection.invoke("Subscribe", userId, gameId);
    console.log(`Player ${userId}, joined game ${userId}`);
  } catch (error) {
    console.error("Error leaving game:", error);
  }
};
