import React from 'react';
import { useSelector } from 'react-redux';
import { List, Icon } from 'antd';

function UploadCases(props) {
  const { cases = [] } = useSelector(state => state.userQuota);
  
  const editCase = props.editCase;

  return cases.length ? (
    <List
      dataSource={cases}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <span onClick={() => editCase(item._id)}>
              <Icon key='edit-case' type='edit' style={{ marginRight: 8 }} />
              edit
            </span>,
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
            title={item.case}
            description={`min: ${item.minSize}; max: ${item.maxSize} (bits)`}
          />
          {(item.mineTypes || []).join(';  ')}
        </List.Item>
      )}
    />
  ) : null;
}

export default UploadCases;
