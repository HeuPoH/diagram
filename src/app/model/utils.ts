import type { IChoice, IScene, State } from 'app/model/types';

export function addChoice(state: State, choice: IChoice) {
  choice.id = getNextChoiceId(state.choices);
  state.choices[choice.id] = choice;
  addChoiceIdToScene(choice.id, state.scenes[choice.from]);
  addChoiceIdToScene(choice.id, state.scenes[choice.to]);
}

export function updateChoice(state: State, choice: IChoice) {
  const prevChoice = state.choices[choice.id];
  if (!choice || !prevChoice) {
    return;
  }

  if (prevChoice.to !== choice.to) {
    deleteChoiceIdFromScene(prevChoice.to, state.scenes[prevChoice.to]);
    addChoiceIdToScene(choice.to, state.scenes[choice.to]);
  }

  state.choices[choice.id] = choice;
}

export function removeChoice(state: State, choiceId: string) {
  const choice = state.choices[choiceId];
  if (!choice) {
    return;
  }

  delete state.choices[choiceId];
  const { from, to } = choice;
  deleteChoiceIdFromScene(choiceId, state.scenes[from]);
  deleteChoiceIdFromScene(choiceId, state.scenes[to]);
}

export function moveChoiceId(state: State, deleteFromSceneId: string, putToSceneId: string, choiceId: string) {
  deleteChoiceIdFromScene(choiceId, state.scenes[deleteFromSceneId]);
  addChoiceIdToScene(choiceId, state.scenes[putToSceneId]);
}

export const addChoiceIdToScene = (choiceId: string, scene?: IScene) => {
  if (!scene) {
    console.warn('Сцена не найдена', scene);
    return;
  }
  scene.choiceIds.push(choiceId);
};

export const deleteChoiceIdFromScene = (choiceId: string, scene?: IScene) => {
  if (!scene) {
    console.warn('Сцена не найдена', scene);
    return;
  }
  scene.choiceIds = scene.choiceIds.filter(ch => ch !== choiceId);
};

export const getNextChoiceId = (choices: Record<string, IChoice>) => {
  const lastChoice = Object.values(choices).at(-1);
  return lastChoice ? `${+lastChoice.id + 1}` : '1';
};