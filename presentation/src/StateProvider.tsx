import { useState, createContext, useContext, ReactNode } from "react";

interface IStateProvider {
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: IStateProvider = {
  gameState: "START",
  setGameState: () => {},
};

const StateContext = createContext<IStateProvider>(defaultContextValue);

export const useStateProvider = () => useContext(StateContext);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<string>(GameState.Lobby);

  const value = {
    gameState,
    setGameState,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
