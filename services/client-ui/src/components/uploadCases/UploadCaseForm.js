import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Slider, Select, Button, notification, Icon } from 'antd';

import { reqUpdateUploadCase, reqCreateUploadCase } from '../../api';

import {
  addUploadCase,
  updateUploadCase
} from '../../redux/actions/uploadCases';

const { Option } = Select;

function UploadCaseForm(props) {
  const dispatch = useDispatch();

  const { activeUploadCase, closeUploadCaseEditor } = props;
  const { getFieldDecorator, validateFields } = props.form;

  const { cases } = useSelector(state => state.uploadCases);

  const [processCaseUpdate, setProcessCaseUpdate] = useState(false);
  const [minSizeMode, setMinSizeMode] = useState(1024);
  const [maxSizeMode, setMaxSizeMode] = useState(1024 * 1024);

  async function editUploadCase(e) {
    e.preventDefault();

    await validateFields(async (err, values) => {
      if (!err) {
        const uploadCase = {
          name: values.name,
          minSize: values.minSize * minSizeMode,
          maxSize: values.maxSize * maxSizeMode,
          mimes: values.mimes
        };

        if (uploadCase.minSize >= uploadCase.maxSize) {
          notification.open({
            message: 'Cannot update the case',
            description: `Min size is bigger than Max`,
            icon: <Icon type='warning' />
          });
          return;
        }

        setProcessCaseUpdate(true);

        if (activeUploadCase._id) {
          uploadCase.caseId = activeUploadCase._id;
          const {
            resData: updatedUploadCase,
            reqFailed
          } = await reqUpdateUploadCase(uploadCase);
          if (!reqFailed) {
            dispatch(updateUploadCase(updatedUploadCase));
          } else {
            notification.open({
              message: 'Cannot update the case',
              description: `Case name :: ${uploadCase.name}`,
              icon: <Icon type='warning' />
            });
          }
        } else {
          const {
            resData: newUploadCase,
            reqFailed
          } = await reqCreateUploadCase(uploadCase);
          if (!reqFailed) {
            dispatch(addUploadCase(newUploadCase));
          } else {
            notification.open({
              message: 'Cannot create new case',
              description: `Case name :: ${uploadCase.name}`,
              icon: <Icon type='warning' />
            });
          }
        }
        setProcessCaseUpdate(true);
        closeUploadCaseEditor();
      }
    });
  }

  function validateToExistedUploadCasesNames(rule, value, callback) {
    const uploadCasesNames = cases
      .filter(c => c._id !== activeUploadCase._id)
      .map(c => c.name);
    if (uploadCasesNames.includes(value)) {
      callback('The name is already used.');
    } else {
      callback();
    }
  }

  const fileMineTypes = [
    <Option key='text/plain'>'text/plain'</Option>,
    <Option key='text/html'>'text/html'</Option>,
    <Option key='text/javascript'>'text/javascript'</Option>,
    <Option key='text/css'>'text/css'</Option>,
    <Option key='image/jpeg'>'image/jpeg'</Option>,
    <Option key='image/png'>'image/png'</Option>,
    <Option key='audio/mpeg'>'audio/mpeg'</Option>,
    <Option key='audio/ogg'>'audio/ogg'</Option>
  ];

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  const minSizeModeSelector = (
    <Select
      defaultValue={activeUploadCase.minSize > 1048576 ? '1048576' : '1024'}
      style={{ width: 100 }}
      onChange={value => setMinSizeMode(value)}
    >
      <Option value='1048576'>Mb</Option>
      <Option value='1024'>Kb</Option>
    </Select>
  );

  const maxSizeModeSelector = (
    <Select
      defaultValue={activeUploadCase.maxSize > 1048576 ? '1048576' : '1024'}
      style={{ width: 100 }}
      onChange={value => setMaxSizeMode(value)}
    >
      <Option value='1048576'>Mb</Option>
      <Option value='1024'>Kb</Option>
    </Select>
  );

  return (
    <Form {...formItemLayout} onSubmit={editUploadCase}>
      <Form.Item label='Name' hasFeedback>
        {getFieldDecorator('name', {
          initialValue: activeUploadCase.name,
          rules: [
            { required: true, message: 'Please input user upload case name' },
            {
              validator: validateToExistedUploadCasesNames
            }
          ]
        })(<Input placeholder='Upload Case Name' />)}
      </Form.Item>

      <Form.Item label='Min'>
        {getFieldDecorator('minSize', {
          initialValue:
            activeUploadCase.minSize > 1048576
              ? Math.floor(activeUploadCase.minSize / 1048576)
              : Math.floor(activeUploadCase.minSize / 1024),
          rules: [{ required: true, message: 'Please input min file size' }]
        })(
          <Input
            placeholder='Min file size for upload case'
            addonAfter={minSizeModeSelector}
          />
        )}
      </Form.Item>
      <Form.Item label='Max'>
        {getFieldDecorator('maxSize', {
          initialValue:
            activeUploadCase.maxSize > 1048576
              ? Math.floor(activeUploadCase.maxSize / 1048576)
              : Math.floor(activeUploadCase.maxSize / 1024),
          rules: [{ required: true, message: 'Please input max file size' }]
        })(
          <Input
            placeholder='Max file size for upload case'
            addonAfter={maxSizeModeSelector}
          />
        )}
      </Form.Item>

      <Form.Item label='Mimes'>
        {getFieldDecorator('mimes', {
          initialValue: activeUploadCase.mimes,
          rules: [{ required: true, message: 'Please set possible mime types' }]
        })(
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select files mime types'
          >
            {fileMineTypes}
          </Select>
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
        <Button type='primary' htmlType='submit' loading={processCaseUpdate}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'uploadCaseForm' })(UploadCaseForm);
