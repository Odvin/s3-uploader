import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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
  let history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    async function getUseInfoByRouterParam(userId) {
      if (userId) {
        const { resData: info, reqFailed } = await reqUserInfo(userId);
        if (!reqFailed) {
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

    getUseInfoByRouterParam(userId);
  }, [userId]);

  const userInfo = useSelector(state => state.userInfo);
  const [userIdType, setUserIdType] = useState('internal');

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  function getUserInfo() {
    props.form.validateFields((err, values) => {
      if (!err) {
        const { userId } = values;
        console.log('==== Get User Info ====');
        console.log('userIdType :: ', userIdType);
        console.log('userId :: ', userId);

        history.push(`/user/${userId}`);
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
          <Col span={12} offset={6} style={{ textAlign: 'center' }}>
            <Button.Group style={{ marginBottom: 20 }}>
              <Button onClick={getUserInfo}>Get User Info</Button>
              <Button onClick={editUserInfo}>
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
