import { LeftPanel } from 'pages/main/left-panel';
import { MainPanel } from 'pages/main/main-panel';

import classes from 'pages/main/index.module.css';

export const MainPage: React.FC = () => {
  return (
    <div className={classes.main}>
      <LeftPanel />
      <MainPanel />
    </div>
  );
};
