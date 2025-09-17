import type { Node } from '@xyflow/react';
import type { IChoice } from 'app/model/types';

export type ContainerData = { entityId: string };
export type Container = Node<ContainerData>;
export type State = {
  containers: Container[];
};
export type Metadata = 'updated' | 'deleted' | 'added' | 'none';
export type ChoiceData = {
  type: Metadata;
  choice: IChoice;
};

export type ChoiceType = 'in' | 'out';
