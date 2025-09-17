import React from 'react';
import { Button } from '@vkontakte/vkui';

import type { IChoice, IScene } from 'app/model/types';
import { ChoiceEditor } from 'features/diagram/view/choice';
import { ChoiceViewer } from 'features/diagram/view/choice/choice-viewer/choice-viewer';
import type { ChoiceType } from 'features/diagram/model/types';
import { cn } from 'shared/utils/cn';

import classes from './choice-manager.module.css';

type Props = {
  type: ChoiceType;
  choice: IChoice;
  isEdit: boolean;
  scenes: IScene[];
  onChange(id: string, data?: IChoice): void;
  toggleEditor(): void;
};
export const ChoiceManager: React.FC<Props> = ({ choice, type, isEdit, scenes, toggleEditor, onChange }) => {
  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <ChoiceViewer
          type={type}
          choice={choice}
          scenes={scenes}
          className={classes.viewer}
        />
        <div className={classes.controls}>
          <Button 
            className={classes.btnEdit}
            onClick={toggleEditor}
          >
            {isEdit ? 'Закрыть' : 'Изменить'}
          </Button>
          <Button 
            className={classes.btnDelete}
            mode='secondary'
            onClick={() => onChange(choice.id, undefined)}
          >
            Удалить
          </Button>
        </div>
      </header>
      <ChoiceEditor
        type={type}
        choice={choice}
        scenes={scenes}
        className={cn(isEdit ? classes.editorActive : classes.editorInactive, classes.editor)}
        onSave={(data) => onChange(choice.id, data)}
        onCancel={toggleEditor}
      />
    </section>
  );
};
