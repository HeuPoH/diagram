import { configureStore } from '@reduxjs/toolkit';

import { sceneReducer } from 'app/model/slice';
import { diagramReducer } from 'features/diagram/model/slice';

export const store = configureStore({
  reducer: {
    diagram: diagramReducer,
    scenes: sceneReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
