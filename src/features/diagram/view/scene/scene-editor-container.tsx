import React from 'react';

import type { IScene } from 'app/model/types';
import { SceneEditorView } from 'features/diagram/view/scene/scene-editor-view';

type Props = {
  scene: IScene;
  onSceneChanged: (scene: IScene) => void;
};
export const SceneEditorContainer: React.FC<Props> = ({ scene, onSceneChanged }) => {
  const [sceneData, setSceneData] = React.useState(() => ({ ...scene }));
  const onSceneChangedHandler = (partial: Partial<IScene>) => {
    setSceneData(prev => {
      const nextData = { ...prev, ...partial };
      onSceneChanged(nextData);
      return nextData;
    });
  };

  return <SceneEditorView scene={sceneData} onChange={onSceneChangedHandler} />;
};
