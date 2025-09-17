import React from 'react';
import { createRoot } from 'react-dom/client';

import type { ContextMenuItem } from 'shared/components/context-menu/types';
import { appendToBody } from 'shared/utils/dom';
import { ContextMenu } from 'shared/components/context-menu/context-menu';

export class Menu {
  static currentCloseHandler: (() => void) | null;

  static show(e: React.MouseEvent, items: ContextMenuItem[]) {
    e.preventDefault();
    Menu.currentCloseHandler?.();

    const [domNode, unmount] = appendToBody();
    const root = createRoot(domNode);

    const onClose = () => {
      unmount();
      root.unmount();
      Menu.currentCloseHandler = null;
    };

    Menu.currentCloseHandler = onClose;

    root.render((
      <div style={{ position: 'absolute', left: e.clientX, top: e.clientY }}>
        <ContextMenu items={items} onClose={onClose} />
      </div>
    ));
  }
}
