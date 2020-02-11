import React from 'react';
import { useSelector } from 'react-redux';
import { List, Icon } from 'antd';

function UserUploadCases() {
  const { cases = [] } = useSelector(state => state.userInfo);
  console.log(cases)

  return cases.length ? (
    <List
      dataSource={cases}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <span>
              <Icon
                key='delete-case'
                type='delete'
                style={{ marginRight: 8 }}
              />
              delete
            </span>
          ]}
        >
          <List.Item.Meta
            title={item.name}
            description={`min: ${item.minSize}; max: ${item.maxSize} (bits)`}
          />
          {(item.mimes || []).join(';  ')}
        </List.Item>
      )}
    />
  ) : null;
}

export default UserUploadCases;
