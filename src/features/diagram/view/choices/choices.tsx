import React from 'react';

import type { IChoice, IScene } from 'app/model/types';
import { AddButton } from 'features/diagram/view/choices/helper';
import type { ChoiceData } from 'features/diagram/model/types';
import { useChoices } from 'features/diagram/view/choices/hooks';
import { ChoiceManager } from 'features/diagram/view/choice/choice-manager/choice-manager';

import classes from './choices.module.css';

type Props = {
  currSceneId: string;
  scenes: IScene[];
  choices: IChoice[];
  onChoicesChanged(choices: ChoiceData[]): void;
};

export const Choices: React.FC<Props> = ({ choices, currSceneId, scenes, onChoicesChanged }) => {
  const { choices: choicesData, addChoice, updateChoice, deleteChoice } = useChoices(choices, currSceneId);
  const [editedChoiceId, setEditedChoiceId] = React.useState('');
  const activeChoices = React.useMemo(() => choicesData.filter(item => item.type !== 'deleted'), [choicesData]);

  React.useEffect(() => { onChoicesChanged(choicesData); }, [choicesData]);

  const updateEditedChoiceId = (id: string) => {
    const nextChoiceId = id !== editedChoiceId ? id : '';
    setEditedChoiceId(nextChoiceId);
  };

  const renderChoices = () => {
    if (!activeChoices.length) {
      return <div>Переходов нет</div>;
    }

    const onChange = (id: string, data?: IChoice) => {
      if (data) {
        updateChoice(id, data);
      } else {
        deleteChoice(id);
      }
      updateEditedChoiceId('');
    };

    return (
      <ul className={classes.choicesList}>
        {activeChoices.map(({ choice }) => (
          <li key={choice.id} className={classes.choicesItem}>
            <div className={classes.choiceItemBody}>
              <ChoiceManager
                type={choice.to === currSceneId ? 'in' : 'out'}
                scenes={scenes}
                onChange={onChange}
                choice={choice}
                isEdit={choice.id === editedChoiceId}
                toggleEditor={() => updateEditedChoiceId(choice.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div>
        <AddButton
          onClick={() => {
            const newChoice = addChoice();
            updateEditedChoiceId(newChoice.id);
          }}
        />
        <hr />
      </div>
      {renderChoices()}
    </>
  );
};
