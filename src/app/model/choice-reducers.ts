import type { PayloadAction } from '@reduxjs/toolkit';
import type { IChoice, IChoiceInfo, State } from 'app/model/types';
import { moveChoiceId, removeChoice } from 'app/model/utils';

type AddPayload = {
  id: string;
  from: string;
  to: string;
};

export const choiceReducers = {
  addChoice: (state: State, action: PayloadAction<AddPayload>) => {
    const { id } = action.payload;
    state.choices[id] = {
      title: `Выбор #${id}`,
      description: 'Описание',
      ...action.payload
    };
  },
  updateChoices: (state: State, action: PayloadAction<Record<string, IChoice>>) => {
    state.choices = action.payload;
  },
  updateChoice: (state: State, action: PayloadAction<{ id: string; data: IChoiceInfo }>) => {
    const { id, data } = action.payload;
    const choice = state.choices[id];
    if (!choice) {
      return;
    }

    if (choice.from !== data.from) {
      moveChoiceId(state, choice.from, data.from, id);
    }

    if (choice.to !== data.to) {
      moveChoiceId(state, choice.to, data.to, id);
    }

    Object.assign(choice, data);
  },
  removeChoice: (state: State, action: PayloadAction<{ id: string }>) => {
    removeChoice(state, action.payload.id);
  }
};
