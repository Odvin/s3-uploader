import React from 'react';
import { useSelector } from 'react-redux';
import { List, Tabs } from 'antd';

import BasicUpload from './BasicUpload';

function Cases() {
  const { cases = [] } = useSelector(state => state.userInfo);
  return (
    <List
      dataSource={cases}
      renderItem={item => (
        <List.Item key={item._id}>
          <List.Item.Meta
            title={item.name}
            description={`min: ${item.minSize}; max: ${item.maxSize} (bits)`}
          />
          {(item.mimes || []).join(';  ')}
        </List.Item>
      )}
    />
  );
}

function UserUploads() {
  const handleTabsChange = key => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey='cases' onChange={handleTabsChange}>
      <Tabs.TabPane tab='Cases' key='cases'>
        <Cases />
      </Tabs.TabPane>
      <Tabs.TabPane tab='Actions' key='actions'>
        <BasicUpload />
      </Tabs.TabPane>
      <Tabs.TabPane tab='Uploads' key='uploads'>
        Content of Tab Pane 3
      </Tabs.TabPane>
    </Tabs>
  );
}

export default UserUploads;
