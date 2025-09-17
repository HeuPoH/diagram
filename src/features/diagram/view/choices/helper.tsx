import React from 'react';
import { Button } from '@vkontakte/vkui';

import classes from './choices.module.css';

type ButtonProps = { onClick: () => void };
export const AddButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button appearance='neutral' onClick={onClick} className={classes.btnAdd}>
      <span>Добавить переход</span>
    </Button>
   );
};
