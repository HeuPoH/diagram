import { Button } from '@vkontakte/vkui';
import { cn } from 'shared/utils/cn';
import classes from 'shared/components/modal/modal.module.css';

type Props = React.PropsWithChildren & {
  onClose(): void;
  closeOnOverlayClick?: boolean;
  className?: string;
};

export function Modal({ children, className, onClose, closeOnOverlayClick }: Props) {
  return (
    <div
      role='dialog'
      className={classes.modalOverlay}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <section className={cn(classes.modalContent, className)} onClick={e => e.stopPropagation()}>
        <button className={classes.modalClose} onClick={onClose}>&times;</button>
        <div className={classes.modalBody}>
          {children}
        </div>
      </section>
    </div>
  );
};

type ModalButtonsProps = {
  onOk(): void;
  onCancel(): void;
};

export const ModalButtons: React.FC<ModalButtonsProps> = ({ onOk, onCancel }) => {
  return (
    <div className={classes.modalButtonsContainer}>
      <Button className={classes.modalButton} appearance='overlay' onClick={onCancel}>Отменить</Button>
      <Button className={classes.modalButton} appearance='positive' onClick={onOk}>Сохранить</Button>
    </div>
  );
};