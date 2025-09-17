import { Handle, Node, Position, type NodeProps } from '@xyflow/react';
import { useAppStore } from 'app/store/hooks';
import type { ContainerData } from 'features/diagram/model/types';

import classes from 'features/diagram/view/diagram.module.css';

export const Scene: React.FC<NodeProps<Node<ContainerData, 'entityId'>>> = (props) => {
  const { getState } = useAppStore();
  const { scenes } = getState().scenes;
  const scene = scenes[props.data.entityId];

  if (!scene) {
    return null;
  }

  return (
    <>
      <Handle
        type='source'
        position={Position.Bottom}
        isConnectable={props.isConnectable}
      />
      <article className={classes.scene}>
        <h2>{scene.title}</h2>
        <div>{scene.description}</div>
      </article>
      <Handle
        type='target'
        position={Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={props.isConnectable}
      />
    </>
  );
};
