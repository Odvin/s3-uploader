import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Slider, Select } from 'antd';

import { reqCreateUser, reqUpdateUser } from '../../api';

import { showCaseEditor, setUserInfo } from '../../redux/actions/userInfo';

const { Option } = Select;

const MBSize = 1024 * 1024;

function UserInfoEditor(props) {
  const dispatch = useDispatch();

  const { cases: uploadCases } = useSelector(state => state.uploadCases);

  const {
    _id,
    extId,
    reseller,
    storageSize,
    cases,
    isEditorVisible
  } = useSelector(state => state.userInfo);

  const activeUserInfo = {
    extId: null,
    reseller: null,
    storageSize: (30 + 100) * MBSize,
    cases: []
  };

  // Information about existed user
  if (_id) {
    activeUserInfo.extId = extId;
    activeUserInfo.reseller = reseller;
    activeUserInfo.storageSize = storageSize;
    activeUserInfo.cases = cases.map(c => c._id);
  }

  const [processCaseUpdate, setProcessCaseUpdate] = useState(false);

  const { getFieldDecorator, validateFields } = props.form;

  async function updateUserInfo() {
    await validateFields(async (err, values) => {
      if (!err) {
        values.storageSize = (values.storageSize + 100) * MBSize;
        setProcessCaseUpdate(true);

        if (!_id) {
          // Create New User
          const newUser = await reqCreateUser(values);
          if (newUser._id) {
            dispatch(setUserInfo(newUser));
          }
        } else {
          // Update User
          values.userId = _id;
          console.log(values);
          const updatedUser = await reqUpdateUser(values);
          if (updatedUser._id) {
            dispatch(setUserInfo(updatedUser));
          }
        }

        setProcessCaseUpdate(false);
        dispatch(showCaseEditor(false));
      }
    });
  }

  function closeCaseEditor() {
    dispatch(showCaseEditor(false));
  }

  const marks = {
    0: '100 MB',
    30: '3000 MB',
    100: {
      label: <strong>10000 MB</strong>
    }
  };

  const defUploadCases = (uploadCases || []).map(c => (
    <Option key={c._id}>{c.name}</Option>
  ));

  const resellers = [
    <Option key='FreeHost'>FreeHost</Option>,
    <Option key='Amazon'>Amazon</Option>
  ];

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  return (
    <Modal
      visible={isEditorVisible}
      title={`User ID :: ${_id ? _id : 'Will be created'}`}
      onOk={updateUserInfo}
      onCancel={closeCaseEditor}
      footer={[
        <Button key='back' onClick={closeCaseEditor}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={processCaseUpdate}
          onClick={updateUserInfo}
        >
          Submit
        </Button>
      ]}
    >
      <Form {...formItemLayout}>
        <Form.Item label='External ID'>
          {getFieldDecorator('extId', {
            initialValue: activeUserInfo.extId,
            rules: [
              { required: true, message: 'Please input user external ID' }
            ]
          })(<Input placeholder='External User ID' />)}
        </Form.Item>
        <Form.Item label='Reseller'>
          {getFieldDecorator('reseller', {
            initialValue: activeUserInfo.reseller,
            rules: [{ required: true, message: 'Please select user reseller' }]
          })(
            <Select
              style={{ width: '100%' }}
              placeholder='Select user reseller'
            >
              {resellers}
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Storage Size'>
          {getFieldDecorator('storageSize', {
            initialValue: Math.floor(activeUserInfo.storageSize / MBSize - 100),
            rules: [
              { required: true, message: 'Please select user storage Size' }
            ]
          })(<Slider marks={marks} />)}
        </Form.Item>
        <Form.Item label='Upload Cases'>
          {getFieldDecorator('cases', {
            initialValue: activeUserInfo.cases,
            rules: [
              { required: true, message: 'Please select user upload cases' }
            ]
          })(
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Upload Cases'
            >
              {defUploadCases}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create({ name: 'UserInfoEditor' })(UserInfoEditor);
