import React from 'react';

import type { IChoice, IScene } from 'app/model/types';
import type { ChoiceType } from 'features/diagram/model/types';
import { ChoiceEditorView } from 'features/diagram/view/choice/choice-editor/choice-editor-view';

type Props = {
  choice: IChoice;
  scenes: IScene[];
  type: ChoiceType;
  onChoiceChanged: (choice: IChoice) => void;
};
export const ChoiceEditorContainer: React.FC<Props> = ({ choice, scenes, type, onChoiceChanged }) => {
  const [state, setState] = React.useState(() => ({ ...choice }));
  const onChangeHandler = (data: Partial<IChoice>) => {
    setState(prev => ({ ...prev, ...data }));
  };

  React.useEffect(() => {
    onChoiceChanged(state);
  }, [onChoiceChanged, state]);

  return <ChoiceEditorView choice={state} type={type} scenes={scenes} onChange={onChangeHandler} />;
};

