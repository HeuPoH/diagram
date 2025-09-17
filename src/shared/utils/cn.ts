export function cn(...args: unknown[]): string {
  const res: string[] = [];
  args.forEach(arg => {
    if (typeof arg === 'string') {
      res.push(arg);
    }
  });

  return res.join(' ');
}
