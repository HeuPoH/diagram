import React from 'react';
import { Button } from '@vkontakte/vkui';

import type { IChoice, IScene } from 'app/model/types';
import type { ChoiceType } from 'features/diagram/model/types';
import { ChoiceEditorContainer } from 'features/diagram/view/choice/choice-editor/choice-editor-container';
import { cn } from 'shared/utils/cn';

import classes from './index.module.css';

type Props = {
  choice: IChoice;
  scenes: IScene[];
  type: ChoiceType;
  className?: string;
  onSave(data: IChoice): void;
  onCancel(): void;
};
export const ChoiceEditor: React.FC<Props> = ({ className, onSave, onCancel, ...rest }) => {
  const choiceDataRef = React.useRef<IChoice>(rest.choice);

  return (
    <section className={cn(classes.choiceEditor, className)}>
      <ChoiceEditorContainer
        onChoiceChanged={ch => choiceDataRef.current = ch}
        {...rest}
      />
      <footer className={classes.choiceEditorFooter}>
        <Button appearance='positive' onClick={() => onSave(choiceDataRef.current)}>
          Ок
        </Button>
        <Button appearance='negative' onClick={onCancel}>
          Отмена
        </Button>
      </footer>
    </section>
  );
};
