import { createSlice} from '@reduxjs/toolkit';
import type { State } from 'app/model/types';
import { sceneReducers } from 'app/model/scene-reducers';
import { choiceReducers } from 'app/model/choice-reducers';

const initialState: State = {
  scenes: {},
  choices: {}
};
export const slice = createSlice({
  name: 'scenes',
  initialState,
  reducers: {
    ...sceneReducers,
    ...choiceReducers
  }
});

export const sceneReducer = slice.reducer;
export const {
  add: addScene,
  update: updateScene,
  updateAll: updateScenes,
  remove: removeScene,
  addChoice,
  updateChoice,
  removeChoice,
  updateChoices,
} = slice.actions;
