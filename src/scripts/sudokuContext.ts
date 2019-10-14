import React from "react";

interface ISudokuContext {
  dimensions: {
    width: number;
    height: number;
    baseWidth: number;
  };
}

const SudokuContext = React.createContext<ISudokuContext>({
  dimensions: {
    width: 0,
    height: 0,
    baseWidth: 0
  }
});

export const SudokuProvider = SudokuContext.Provider;
export const SudokuConsumer = SudokuContext.Consumer;
export default SudokuContext;
