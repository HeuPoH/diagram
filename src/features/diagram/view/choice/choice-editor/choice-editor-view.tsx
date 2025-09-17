import React from 'react';
import { FormItem, Input, Select, Textarea } from '@vkontakte/vkui';
import type { ChoiceType } from 'features/diagram/model/types';
import type { IChoice, IScene } from 'app/model/types';

interface Props {
  choice: IChoice;
  scenes: IScene[];
  type: ChoiceType;
  onChange: (partial: Partial<IChoice>) => void;
}

export const ChoiceEditorView: React.FC<Props> = ({ 
  choice, 
  scenes, 
  type, 
  onChange 
}) => {
  const sceneTransitionOptions = React.useMemo(() => 
    scenes.map(scene => ({ 
      label: scene.title, 
      value: scene.id 
    })), 
    [scenes]
  );

  const currentTransitionKey = type === 'out' ? choice.to : choice.from;
  const currentScene = React.useMemo(() =>
    sceneTransitionOptions.find(option => option.value === currentTransitionKey),
    [sceneTransitionOptions, currentTransitionKey]
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ description: e.target.value });
  };

  const handleSceneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const change = type === 'out' 
      ? { to: e.target.value } 
      : { from: e.target.value };
    onChange(change);
  };

  return (
    <>
      <FormItem top='Название:' noPadding>
        <Input
          value={choice.title}
          onChange={handleTitleChange}
          placeholder='Введите название выбора'
        />
      </FormItem>
      <FormItem top='Описание:' noPadding>
        <Textarea
          value={choice.description}
          onChange={handleDescriptionChange}
          placeholder='Опишите этот выбор'
        />
      </FormItem>
      <FormItem top='Переход:' noPadding>
        <Select
          value={currentScene?.value || ''}
          placeholder='Не выбрано'
          options={sceneTransitionOptions}
          onChange={handleSceneChange}
          disabled={!scenes.length || type === 'in'}
        />
      </FormItem>
    </>
  );
};