import React from 'react';
import { useSelector } from 'react-redux';
import { List, Tabs } from 'antd';

import BasicUpload from './BasicUpload';
import CompletedUploads from './CompletedUploads';

import { filesSizeDescription } from '../utility';

function Cases() {
  const { cases = [] } = useSelector(state => state.userInfo);
  return (
    <List
      dataSource={cases}
      renderItem={item => (
        <List.Item key={item._id}>
          <List.Item.Meta
            title={item.name}
            description={filesSizeDescription(item.minSize, item.maxSize)}
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
        <CompletedUploads />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default UserUploads;
