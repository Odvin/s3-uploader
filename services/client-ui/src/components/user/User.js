import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  notification,
  Icon
} from 'antd';

import { reqQuota } from '../../api';
import { setUserQuota } from '../../redux/actions/userQuota';

import UserInfo from './UserInfo';

const InputGroup = Input.Group;
const { Option } = Select;

function User(props) {
  const dispatch = useDispatch();

  const userQuota = useSelector(state => state.userQuota);
  const [userIdType, setUserIdType] = useState('internal');

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
  };

  async function getUserQuota() {
    const { userId } = await props.form.validateFields((err, values) => {
      if (!err) {
        console.log('==== Get User Quota ====');
        console.log('userIdType :: ', userIdType);
        console.log('userId ::', props.form.getFieldValue('userId'));
      }
    });

    if (userId) {
      const quota = await reqQuota(userId);
      if (quota) {
        dispatch(setUserQuota(quota));
      } else {
        notification.open({
          message: 'User does not exits',
          description: `${userIdType} id = ${userId}`,
          icon: <Icon type='warning' />
        });
      }
    }
  }

  return (
    <Row>
      <Col span={10} offset={7}>
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
          <Button type='primary' onClick={getUserQuota}>
            Get User Info
          </Button>
        </Form.Item>
        {userQuota.exists && <UserInfo />}
      </Col>
    </Row>
  );
}

export default Form.create({ name: 'userInfo' })(User);
