import React from 'react';
import { FormItem, Input, Textarea } from '@vkontakte/vkui';

import type { IScene } from 'app/model/types';

type Props = {
  scene: IScene;
  onChange: (partial: Partial<IScene>) => void;
};
export const SceneEditorView: React.FC<Props> = ({ scene, onChange }) => {
  return (
    <>
      <FormItem top='Название сцены:' noPadding>
        <Input
          value={scene.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </FormItem>
      <FormItem top='Описание сцены:' noPadding>
        <Textarea
          value={scene.description}
          onChange={(e) => onChange({ description: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </FormItem>
    </>
  );
};
