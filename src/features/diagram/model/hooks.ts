import React from 'react';

import { useAppSelector } from 'app/store/hooks';
import { useDispatch } from 'react-redux';
import { addScene, removeScene } from 'app/model/slice';
import { addContainer, removeContainer } from 'features/diagram/model/slice';
import type { Container } from 'features/diagram/model/types';

export function useDispatchSceneAndContainer(): [
  Container[],
  (e: React.MouseEvent) => void,
  (id: string) => void
] {
  const containers = useAppSelector(state => state.diagram.containers);
  const dispatch = useDispatch();

  const addEntities = (e: React.MouseEvent) => {
    const len = containers.length;
    const lastId = containers[len - 1]?.id ?? '0';
    const nextId = `${+lastId + 1}`;
    dispatch(addContainer({ container: { id: nextId, position: { x: e.clientX, y: e.clientY } } }));
    dispatch(addScene({ id: nextId }));
  };

  const removeEntities = (id: string) => {
    const payload = { id };
    dispatch(removeContainer(payload));
    dispatch(removeScene(payload));
  };

  return [containers, addEntities, removeEntities];
}

export function useDeleteSceneAndContainer() {
  const containers = useAppSelector(state => state.diagram.containers);
  const dispatch = useDispatch();

  const addEntities = (e: React.MouseEvent) => {
    const len = containers.length;
    const lastId = containers[len - 1]?.id ?? '0';
    const nextId = `${+lastId + 1}`;
    dispatch(addContainer({ container: { id: nextId, position: { x: e.clientX, y: e.clientY } } }));
    dispatch(addScene({ id: nextId }));
  };

  return addEntities;
}
