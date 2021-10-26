import { createAction } from "@reduxjs/toolkit";

export const actions = {
  AUMENT: { type: "AUMENTA", value: 5 },
  INCREMENT: { type: "INCREMENTA", value: 5 },
  SETPOKEMON: createAction("SETPOKEMONS"),
  SETPOKEMONS: createAction("SETPOKEMONS"),
  SELECTEDPOKEMON: createAction("SELECTEDPOKEMON"),
};

export default actions;
