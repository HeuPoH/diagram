import type { PayloadAction } from '@reduxjs/toolkit';
import type { IScene, ISceneInfo, State } from 'app/model/types';
import { removeChoice } from 'app/model/utils';

export const sceneReducers = {
  add: (state: State, action: PayloadAction<{ id: string }>) => {
    const { id } = action.payload;
    state.scenes[id] = {
      id,
      choiceIds: [],
      title: `Сцена ${id}`,
      description: 'Описание'
    };
  },
  update: (state: State, action: PayloadAction<{ id: string; data: ISceneInfo }>) => {
    const { id, data } = action.payload;
    const scene = state.scenes[id];
    if (!scene) {
      return;
    }

    Object.assign(scene, data);
  },
  updateAll: (state: State, action: PayloadAction<Record<string, IScene>>) => {
    state.scenes = action.payload;
  },
  remove: (state: State, action: PayloadAction<{ id: string }>) => {
    const { id } = action.payload;
    const scene = state.scenes[id];
    if (!scene) {
      return;
    }

    delete state.scenes[id];
    scene.choiceIds.forEach(id => {
      removeChoice(state, id);
    });
  },
};
