import React from 'react';

import type { IChoice, IScene } from 'app/model/types';
import type { ChoiceType } from 'features/diagram/model/types';
import { cn } from 'shared/utils/cn';

import classes from './choice-viewer.module.css';

type Props = {
  type: ChoiceType;
  choice: IChoice;
  scenes: IScene[];
  className?: string;
};

export const ChoiceViewer: React.FC<Props> = ({ type, scenes, choice, className }) => {
  const isIn = type === 'in';

  const sceneFrom = React.useMemo(() => 
    scenes.find(scene => scene.id === choice.from),
    [scenes, choice.from]
  );

  const sceneTo = React.useMemo(() => 
    scenes.find(scene => scene.id === choice.to),
    [scenes, choice.to]
  );

  return (
    <div className={cn(classes.choiceViewer, className)}>
      <div className={classes.header}>
        <span
          className={cn(
            classes.choiceTypeBadge,
            isIn ? classes.incoming : classes.outgoing
          )}
        >
          {isIn ? 'Входящая' : 'Исходящая'}
        </span>
        {choice.title}
      </div>
      <span className={classes.choiceDestination}>
        {isIn 
          ? `Из: ${sceneFrom?.title || 'Нет выбрано'}` 
          : `К: ${sceneTo?.title || 'Нет выбрано'}`
        }
      </span>
    </div>
  );
};