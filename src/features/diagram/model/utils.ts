import { addChoice, removeChoice, updateChoice } from 'app/model/utils';
import type { IChoice, IScene } from 'app/model/types';
import type { ChoiceData } from 'features/diagram/model/types';

export const NEW_CHOICE_ID = -1;
export function getNextTempChoiceId(prev: string) {
  const numPrev = +prev;
  if (numPrev > NEW_CHOICE_ID) {
    return NEW_CHOICE_ID;
  } else {
    return numPrev - 1;
  }
}

type State = { choices: Record<string, IChoice>; scenes: Record<string, IScene> };
export function applyChanges(state: State, changes: ChoiceData[]) {
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    switch (change.type) {
      case 'none':
        break;
      case 'added':
        addChoice(state, change.choice);
        break;
      case 'deleted':
        removeChoice(state, change.choice.id);
        break;
      case 'updated':
        updateChoice(state, change.choice);
        break;
    }
  }
}
