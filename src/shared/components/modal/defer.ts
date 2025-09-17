import { createRoot } from 'react-dom/client';
import { appendToBody } from 'shared/utils/dom';

type Resolver<T> = (value: T) => void | (() => void);
type Renderer<T> = (resolve: Resolver<T>) => React.ReactElement;

export function defer<T>(render: Renderer<T>): Promise<T> {
  const [container, unmountContainer] = appendToBody();
  const root = createRoot(container);

  const unmount = () => {
    unmountContainer();
    root.unmount();
  };

  const mount = (res: Resolver<T>) => {
    root.render(render(res));
  };

  return new Promise<T>(mount).finally(unmount);
}
