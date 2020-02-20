import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

function UserForm(props) {
  const history = useHistory();

  const { getFieldDecorator } = props.form;

  function getUserInfo(e) {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        const { userId, userIdType } = values;
        history.push(`/user/${userId}/${userIdType}`);
      }
    });
  }

  return (
    <Form layout='inline' onSubmit={getUserInfo} style={{ textAlign: 'center' }}>
      <Form.Item>
        {getFieldDecorator('userIdType', {
          initialValue: 'internal',
          rules: [
            {
              required: true,
              message: 'The type of user ID is required.'
            }
          ]
        })(
          <Select
            style={{ width: 110 }}
          >
            <Option value='internal'>Internal ID</Option>
            <Option value='external'>External ID</Option>
          </Select>
        )}
         </Form.Item>
        <Form.Item>
          {getFieldDecorator('userId', {
            rules: [
              {
                required: true,
                message: 'User ID is required.'
              }
            ]
          })(<Input style={{ width: 210 }} placeholder='Set UserID' />)}
        </Form.Item>
      <Form.Item>
        <Button style={{ width: 110 }} htmlType='submit'>Get Info</Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'UserForm' })(UserForm);
