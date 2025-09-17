import React from 'react';
import { Group } from '@vkontakte/vkui';

import type { IChoice, IScene } from 'app/model/types';
import { Choices } from 'features/diagram/view/choices/choices';
import { SceneEditorContainer } from 'features/diagram/view/scene/scene-editor-container';
import type { ChoiceData } from 'features/diagram/model/types';

import { defer, Modal, ModalButtons } from 'shared/components/modal';
import { TabsContainer } from 'shared/components/tabs/tabs';

import classes from './scene-editor.module.css';

type Result = {
  scene: IScene;
  choices: ChoiceData[];
};

type Args = {
  scene: IScene;
  scenes: IScene[];
  choices: IChoice[];
};
export function openSceneEditor(args: Args) {
  return defer<Result | undefined>((resolve) => (
    <SceneEditor
      {...args}
      onOk={resolve}
      onCancel={() => resolve(undefined)}
    />
  ));
}

type Props = Args & {
  onOk(res: Result): void;
  onCancel(): void;
};

const SceneEditor: React.FC<Props> = ({ onOk, onCancel, scene, scenes, choices }) => {
  const sceneDataRef = React.useRef(scene);
  const choicesDataRef = React.useRef<ChoiceData[]>([]);

  const onSceneChanged = React.useCallback((s: IScene) => sceneDataRef.current = s, []);
  const onChoicesChanged = React.useCallback((choices: ChoiceData[]) => (choicesDataRef.current = choices), []);
  const getDataToSave = () => ({ scene: sceneDataRef.current, choices: choicesDataRef.current });
  
  const tabs = React.useMemo(() => {
    return [
      {
        id: 'scene',
        label: 'Свойства сцены',
        content: () => (
          <Group mode='plain' className={classes.sceneEditor}>
            <SceneEditorContainer
              scene={scene}
              onSceneChanged={onSceneChanged}
            />
          </Group>
        )
      },
      {
        id: 'choices',
        label: 'Связи сцены',
        content: () => (
          <Group mode='plain' className={classes.choicesEditor}>
            <Choices
              currSceneId={scene.id}
              choices={choices}
              onChoicesChanged={onChoicesChanged}
              scenes={scenes}
            />
          </Group>
        )
      }
    ];
  }, [scene, onSceneChanged, choices, onChoicesChanged, scenes]);

  return (
    <Modal onClose={onCancel} className={classes.modal}>
      <div className={classes.modalContent}>
        <EditorHeader />
        <div style={{ flex: 1 }}>
          <TabsContainer tabs={tabs} />
        </div>
        <ModalButtons onOk={() => onOk(getDataToSave())} onCancel={onCancel} />
      </div>
    </Modal>
  );
};

const EditorHeader: React.FC = () => {
  return (
    <div>
      <h3>
        Редактор сцены
      </h3>
    </div>
  );
};
