import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Slider, Select } from 'antd';

import { reqCreateUser, reqUpdateUser } from '../../api';

import { setUserInfo } from '../../redux/actions/userInfo';

const { Option } = Select;

function UserInfoForm(props) {
  const dispatch = useDispatch();

  const { cases: uploadCases } = useSelector(state => state.uploadCases);
  const [processCaseUpdate, setProcessCaseUpdate] = useState(false);
  const { getFieldDecorator, validateFields } = props.form;
  const { whatToDoWithUser = 'create', closeEditor } = props;

  const activeUserInfo = {
    extId: null,
    reseller: null,
    storageSize: 314572800,
    cases: []
  };

  const { _id, extId, reseller, storageSize, cases } = useSelector(
    state => state.userInfo
  );

  if (whatToDoWithUser === 'edit' && _id) {
    activeUserInfo.Id = _id;
    activeUserInfo.extId = extId;
    activeUserInfo.reseller = reseller;
    activeUserInfo.storageSize = storageSize;
    activeUserInfo.cases = cases.map(c => c._id);
  }

  async function updateUserInfo(e) {
    e.preventDefault();

    await validateFields(async (err, values) => {
      if (!err) {
        setProcessCaseUpdate(true);

        if (whatToDoWithUser === 'create') {
          const { resData: newUser, reqFailed } = await reqCreateUser(values);
          if (!reqFailed && newUser._id) {
            dispatch(setUserInfo(newUser));
          }
        } else {
          values.userId = activeUserInfo.Id;
          const { resData: updatedUser, reqFailed } = await reqUpdateUser(
            values
          );
          if (!reqFailed && updatedUser._id) {
            dispatch(setUserInfo(updatedUser));
          }
        }

        setProcessCaseUpdate(false);
        closeEditor();
      }
    });
  }

  const marks = {
    104857600: {
      label: <strong>100 MB</strong>
    },
    314572800: {
      label: <strong>300 MB</strong>
    },
    1048576000: {
      label: <strong>1000</strong>
    }
  };

  function formatter(value) {
    return `${Math.floor(value / 1048576)} Mb`;
  }

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
    <Form {...formItemLayout} onSubmit={updateUserInfo}>
      <Form.Item label='External ID'>
        {getFieldDecorator('extId', {
          initialValue: activeUserInfo.extId,
          rules: [{ required: true, message: 'Please input user external ID' }]
        })(<Input placeholder='External User ID' />)}
      </Form.Item>
      <Form.Item label='Reseller'>
        {getFieldDecorator('reseller', {
          initialValue: activeUserInfo.reseller,
          rules: [{ required: true, message: 'Please select user reseller' }]
        })(
          <Select style={{ width: '100%' }} placeholder='Select user reseller'>
            {resellers}
          </Select>
        )}
      </Form.Item>
      <Form.Item label='Storage Size'>
        {getFieldDecorator('storageSize', {
          initialValue: activeUserInfo.storageSize,
          rules: [
            { required: true, message: 'Please select user storage Size' }
          ]
        })(
          <Slider
            marks={marks}
            min={104857600}
            max={1048576000}
            step={104857600}
            tipFormatter={formatter}
          />
        )}
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
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={processCaseUpdate}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'UserInfoForm' })(UserInfoForm);
