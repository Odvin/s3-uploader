import React from 'react';

import { List, Icon } from 'antd';

function UploadCases(props) {
  const cases = props.cases || [];

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );


  return cases.length ? (
    <List
      dataSource={cases}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <IconText type='edit' text='edit' key='edit-case' />,
            <IconText type='delete' text='delete' key='delete-case' />
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
