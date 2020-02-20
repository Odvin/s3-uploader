import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Modal, Row, Col, Button, notification, Icon } from 'antd';

import UserForm from './UserForm';
import UserInfoForm from './UserInfoForm';

import { reqUserInfo } from '../../api';
import { setUserInfo } from '../../redux/actions/userInfo';

import UserStatistics from './UserStatistics';

function User() {
  const dispatch = useDispatch();
  const { userId, userIdType } = useParams();

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [whatToDoWithUser, setWhatToDoWithUser] = useState('create');

  useEffect(() => {
    async function getUseInfoByRouterParam(userId, userIdType) {
      if (userId) {
        const { resData: info, reqFailed } = await reqUserInfo(userId);
        if (!reqFailed) {
          dispatch(setUserInfo(info));
        } else {
          notification.open({
            message: 'User does not exits',
            description: `ID (${userIdType}) = ${userId}`,
            icon: <Icon type='warning' />
          });
        }
      }
    }

    getUseInfoByRouterParam(userId, userIdType);
  }, [userId, userIdType, dispatch]);

  const { _id: userInfoId, exists: userInfoExists } = useSelector(
    state => state.userInfo
  );

  function activateEditor(actionType) {
    setIsEditorVisible(true);
    setWhatToDoWithUser(actionType);
  }

  function closeEditor() {
    setIsEditorVisible(false);
  }

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <UserForm />

          <div style={{ textAlign: 'center', marginTop: 20, marginLeft: -20 }}>
            <Button.Group>
              <Button onClick={() => activateEditor('create')}>
                Add User
              </Button>

              <Button
                onClick={() => activateEditor('edit')}
                disabled={!userInfoId}
              >
                Edit User
              </Button>
            </Button.Group>
          </div>

          {userInfoExists && <UserStatistics />}
        </Col>
      </Row>

      <Modal
        visible={isEditorVisible}
        title='Add / Edit User Info'
        onCancel={closeEditor}
        footer={null}
      >
        {isEditorVisible && (
          <UserInfoForm
            whatToDoWithUser={whatToDoWithUser}
            closeEditor={closeEditor}
          />
        )}
      </Modal>
    </>
  );
}

export default User;
