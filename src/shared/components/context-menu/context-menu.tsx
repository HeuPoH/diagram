import React from 'react';

import { cn } from 'shared/utils/cn';
import type { ContextMenuItem } from 'shared/components/context-menu/types';

import classes from 'shared/components/context-menu/context-menu.module.css';

interface Props {
  items: ContextMenuItem[];
  onClose(): void;
}

export const ContextMenu: React.FC<Props> = ({ items, onClose }) => {
  const menuRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!menuRef.current?.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', onClick, { capture: true });
    return () => document.removeEventListener('mousedown', onClick, { capture: true });
  }, [onClose]);

  return (
    <menu
      ref={menuRef}
      className={classes.contextMenu}
    >
      {items.map((item, idx) => {
        return item.icon
          ? <MenuItemWithIcon key={idx} item={item} onClick={onClose} />
          : <MenuItem key={idx} item={item} onClick={onClose} />;
      })}
    </menu>
  );
};

type MenuItemProps = {
  item: ContextMenuItem;
  onClick(): void;
};

const MenuItem: React.FC<MenuItemProps> = ({ item, onClick }) => (
  <div
    onMouseDown={() => {
      item.command();
      onClick();
    }}
    className={classes.contextMenuItem}
  >
    {item.label}
  </div>
);

const MenuItemWithIcon: React.FC<MenuItemProps> = ({ item, onClick }) => (
  <div
    onMouseDown={() => {
      item.command();
      onClick();
    }}
    className={cn(classes.contextMenuItemWithIcon, classes.contextMenuItem)}
  >
    <img className={classes.contextMenuIcon} src={item.icon} alt={item.label} />
    {item.label}
  </div>
);
