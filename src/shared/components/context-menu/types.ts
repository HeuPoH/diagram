export type ContextMenuItem = {
  label: string;
  command(): void;
  icon?: string;
};
