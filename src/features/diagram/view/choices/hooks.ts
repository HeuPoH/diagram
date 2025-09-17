import React from 'react';

import type { IChoice } from 'app/model/types';
import type { ChoiceData, Metadata } from 'features/diagram/model/types';
import { getNextTempChoiceId } from 'features/diagram/model/utils';

export function useChoices(initChoices: IChoice[], currSceneId: string) {
  const [choices, setChoices] = React.useState<ChoiceData[]>(
    () => initChoices.map(choice => mark('none', choice))
  );

  const addChoice = () => {
    const { choice = { id: '' } } = choices.at(-1) ?? {};
    const newChoice = getNewChoice(choice.id, currSceneId);
    setChoices((prev) => ([mark('added', newChoice), ...prev]));
    return newChoice;
  };

  const updateChoice = (id: string, data: IChoice) => {
    setChoices(prev => {
      return prev.map(c => {
        if (c.choice.id !== id) {
          return c;
        }

        if (!['none', 'updated'].includes(c.type)) {
          return { type: c.type, choice: data };
        }

        return mark('updated', data);
      });
    });
  };

  const deleteChoice = (id: string) => {
    setChoices((prev) => {
      return prev.map(ch => ch.choice.id === id ? mark('deleted', ch.choice) : ch); 
    });
  };

  return {
    choices,
    addChoice,
    updateChoice,
    deleteChoice
  };
}

function mark(type: Metadata, choice: IChoice): ChoiceData {
  return { type, choice };
}

function getNewChoice(prevId: string, from: string): IChoice {
  const nextChoiceId = getNextTempChoiceId(prevId);
  return {
    id: `${nextChoiceId}`,
    title: 'Имя',
    description: 'Описание',
    from,
    to: ''
  };
}
