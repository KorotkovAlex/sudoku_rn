import React from "react";

interface ISudokuContext {
  dictionary: any;
}

const SudokuContext = React.createContext<ISudokuContext>({ dictionary: {} });

export const SudokuProvider = SudokuContext.Provider;
export const SudokuConsumer = SudokuContext.Consumer;
export default SudokuContext;
