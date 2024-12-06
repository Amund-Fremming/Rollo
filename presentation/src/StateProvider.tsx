import { useState, createContext, useContext, ReactNode } from "react";
import { GameState } from "./GameState";

interface IStateProvider {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const defaultContextValue: IStateProvider = {
  gameState: GameState.Lobby,
  setGameState: () => {},
};

const StateContext = createContext<IStateProvider>(defaultContextValue);

export const useStateProvider = () => useContext(StateContext);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby);

  const value = {
    gameState,
    setGameState,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
