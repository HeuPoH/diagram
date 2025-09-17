import React from 'react';
import { Tabs, TabsItem } from '@vkontakte/vkui';

type Tab = {
  id: string;
  label: string;
  content: () => React.JSX.Element;
  before?: string | React.JSX.Element;
};

type Props = {
  tabs: Tab[];
};
export const TabsContainer: React.FC<Props> = ({ tabs }) => {
  const [active, setActive] = React.useState<string>(tabs[0].id);

  const activeTabContent = React.useMemo(() => {
    return tabs.find(tab => tab.id === active)?.content();
  }, [active, tabs]);

  const renderTabs = () => {
    return tabs.map(tab => (
      <TabsItem key={tab.id} before={tab.before} id={tab.id} style={{ padding: '0 10px' }}>
        {tab.label}
      </TabsItem>
    ));
  };

  return (
    <>
      <Tabs
        selectedId={active}
        layoutFillMode='shrinked'
        onSelectedIdChange={setActive}
      >
        {renderTabs()}
      </Tabs>
      {activeTabContent}
    </>
  );
};
