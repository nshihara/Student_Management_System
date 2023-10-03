import React from 'react';
import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Home',
    children: '',
  },
  {
    key: '2',
    label: 'Students',
  },
  {
    key: '3',
    label: 'Contact',
    children: '',
  },
];

const App = () => (
  <div className="custom-tabs-container"> {/* Apply styles to a container */}
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarGutter={100}>
      {items.map((item) => (
        <Tabs.TabPane tab={item.label} key={item.key} className="custom-tab-pane">
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  </div>
);

export default App;
