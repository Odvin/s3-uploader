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

import UserInfoEditor from './UserInfoEditor';

import { reqUserInfo } from '../../api';
import { setUserInfo, showCaseEditor } from '../../redux/actions/userInfo';

import UserInfo from './UserInfo';

const InputGroup = Input.Group;
const { Option } = Select;

function User(props) {
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.userInfo);
  const [userIdType, setUserIdType] = useState('internal');

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  async function getUserInfo() {
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('==== Get User Info ====');
        console.log('userIdType :: ', userIdType);
        const { userId = false } = values;
        if (userId) {
          const info = await reqUserInfo(userId);
          if (info) {
            dispatch(setUserInfo(info));
          } else {
            notification.open({
              message: 'User does not exits',
              description: `${userIdType} id = ${userId}`,
              icon: <Icon type='warning' />
            });
          }
        }
      }
    });
  }

  async function editUserInfo() {
    const userId = userInfo._id || null;
    console.log('=== Edit User Info ===');
    console.log('User ID: ', userId);

    dispatch(showCaseEditor(true));
  }

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
            })(<Input style={{ width: '60%' }} placeholder='Set UserID' />)}
          </InputGroup>
        </Form.Item>
        <Row>
          <Col   span={12} offset={6} style={{ textAlign: 'center' }}>
          <Button.Group style={{marginBottom: 20}}>
          <Button  onClick={getUserInfo}>
            Get User Info
          </Button>
          <Button  onClick={editUserInfo}>
            {!userInfo._id ? 'Add User Info' : 'Edit User Info'}
          </Button>
          </Button.Group>
          </Col>
        </Row>
        {userInfo.exists && <UserInfo />}
      </Col>
      <UserInfoEditor />
    </Row>
  );
}

export default Form.create({ name: 'userInfo' })(User);
