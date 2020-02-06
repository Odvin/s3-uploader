import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';

import { reqQuota } from '../../api';

import UserInfo from './UserInfo';

const InputGroup = Input.Group;
const { Option } = Select;

function User(props) {
  const [userIdType, setUserIdType] = useState('internal');
  const [userQuota, setUserQuota] = useState(null);

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
  };

  async function getUserQuota(userId) {
    const quota = await reqQuota(userId);
    console.log(quota);
    setUserQuota(quota);
  }

  const getUserInfo = async () => {
    const { userId } = await props.form.validateFields((err, values) => {
      if (!err) {
        console.log('==== Get User Quota ====');
        console.log('userIdType :: ', userIdType);
        console.log('userId ::', props.form.getFieldValue('userId'));
      }
    });

    if (userId) {
      await getUserQuota(userId);
    }
  };

  return (
    <Row>
      <Col span={12} offset={6}>
          <Form.Item {...formItemLayout} label='UserID'>
            <InputGroup compact>
              <Select
                name='idType'
                style={{ width: '30%' }}
                defaultValue={userIdType}
                onChange={setUserIdType}
              >
                <Option value='internal'>Internal</Option>
                <Option value='external'>External</Option>
              </Select>
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: 'UserID is required.'
                  }
                ]
              })(<Input style={{ width: '60%' }} placeholder='UserID' />)}
            </InputGroup>
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type='primary' onClick={getUserInfo}>
              Get User Info
            </Button>
          </Form.Item>
          {userQuota && <UserInfo userQuota={userQuota} />}
      </Col>
    </Row>
  );
}

export default Form.create({ name: 'userInfo' })(User);
