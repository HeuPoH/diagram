import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Container, State } from 'features/diagram/model/types';

const initialState: State = { containers: [] };
const slice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    add: (state: State, action: PayloadAction<{ container: Pick<Container, 'id' | 'position'> }>) => {
      const { id, position } = action.payload.container;
      state.containers.push({
        id,
        type: 'scene',
        position,
        data: { entityId: id }
      });
    },
    remove: (state: State, action: PayloadAction<{ id: string }>) => {
      state.containers = state.containers.filter(cont => cont.id !== action.payload.id);
    },
    update: (state: State, action: PayloadAction<State['containers']>) => {
      state.containers = action.payload;
    }
  }
});

export const diagramReducer = slice.reducer;
export const {
  update: updateContainers,
  add: addContainer,
  remove: removeContainer
} = slice.actions;
