import React from 'react';
import { type NodeChange, applyNodeChanges, Edge, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { updateChoices, updateScenes } from 'app/model/slice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { openSceneEditor } from 'features/diagram/view/scene/scene-editor-modal';
import { customNodes } from 'features/diagram/model/config';
import { updateContainers } from 'features/diagram/model/slice';
import type { Container } from 'features/diagram/model/types';
import { applyChanges } from 'features/diagram/model/utils';
import { useDispatchSceneAndContainer } from 'features/diagram/model/hooks';
import { Menu } from 'shared/components/context-menu';
import { deepCopy } from 'shared/utils/objects';

import classes from './diagram.module.css';

import addIcon from 'assetss/icons/add.svg';
import deleteIcon from 'assetss/icons/delete.svg';
import editIcon from 'assetss/icons/edit.svg';

export const Diagram: React.FC = () => {
  const [containers, add, remove] = useDispatchSceneAndContainer();
  const scenes = useAppSelector(state => state.scenes.scenes);
  const choices = useAppSelector(state => state.scenes.choices);
  const dispatch = useAppDispatch();

  const edges = React.useMemo<Edge[]>(() => {
    const arr = Object.values(choices);
    return arr.map(ch => ({ id: ch.id, source: ch.from, target: ch.to }));
  }, [choices]);

  const onContextMenu = (e: React.MouseEvent) => {
    const menu = [{
      label: 'Добавить сцену',
      command: () => add(e),
      icon: addIcon
    }];
    Menu.show(e, menu);
  };

  const openSceneEditorHandler = async (sceneId: string) => {
    const scene = scenes[sceneId];
    if (scene) {
      const arrScenes = Object.values(scenes).filter(scene => scene.id !== sceneId);
      const arrChoices = scene.choiceIds.map(id => choices[id]);
      const res = await openSceneEditor({ scene, scenes: arrScenes, choices: arrChoices });
      if (res) {
        const copiedState = deepCopy({ choices, scenes });
        applyChanges(copiedState, res.choices);
        dispatch(updateChoices(copiedState.choices));
        dispatch(updateScenes(copiedState.scenes));
      }
    }
  };

  const onNodeContextMenu = (e: React.MouseEvent, node: Container) => {
    e.stopPropagation();
    const sceneId = node.data.entityId;
    const menu = [
      {
        label: 'Редактировать сцену',
        command: () => openSceneEditorHandler(sceneId),
        icon: editIcon
      },
      {
        label: 'Удалить сцену',
        command: () => remove(sceneId),
        icon: deleteIcon
      }
    ];
    Menu.show(e, menu);
  };

  const onNodesChanged = React.useCallback((changes: NodeChange<Container>[]) => {
    const nextContainers = applyNodeChanges(changes, containers);
    dispatch(updateContainers(nextContainers));
  }, [containers, dispatch]);

  return (
    <div className={classes.diagram}>
      <ReactFlow
        edges={edges}
        nodeTypes={customNodes}
        onNodesChange={onNodesChanged}
        nodes={containers}
        onContextMenu={onContextMenu}
        onNodeContextMenu={onNodeContextMenu}
        onNodeDoubleClick={(_, node) => openSceneEditorHandler(node.data.entityId)}
      />
    </div>
  );
};
