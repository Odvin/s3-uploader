import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Slider, Select, Button, notification, Icon } from 'antd';

import { reqUpdateUploadCase, reqCreateUploadCase } from '../../api';

import {
  addUploadCase,
  updateUploadCase
} from '../../redux/actions/uploadCases';

function UploadCaseForm(props) {
  const dispatch = useDispatch();

  const { activeUploadCase, closeUploadCaseEditor } = props;
  const { getFieldDecorator, validateFields } = props.form;

  const { cases } = useSelector(state => state.uploadCases);

  const [processCaseUpdate, setProcessCaseUpdate] = useState(false);

  async function editUploadCase(e) {
    e.preventDefault();

    await validateFields(async (err, values) => {
      if (!err) {
        const uploadCase = {
          name: values.name,
          minSize: values.limits[0],
          maxSize: values.limits[1],
          mimes: values.mimes
        };

        setProcessCaseUpdate(true);

        if (activeUploadCase._id) {
          uploadCase.caseId = activeUploadCase._id;
          const updatedUploadCase = await reqUpdateUploadCase(uploadCase);
          if (!updateUploadCase.reqFailed) {
            dispatch(updateUploadCase(updatedUploadCase));
          } else {
            notification.open({
              message: 'Cannot update the case',
              description: `Case name :: ${uploadCase.name}`,
              icon: <Icon type='warning' />
            });
          }
        } else {
          const newUploadCase = await reqCreateUploadCase(uploadCase);
          if (!newUploadCase.reqFailed) {
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

  const marks = {
    1048576: {
      label: <strong>1 Mb</strong>
    },
    20971520: {
      label: <strong>20 Mb</strong>
    },
    52428800: {
      label: <strong>50 Mb</strong>
    },
    104857600: {
      label: <strong>100</strong>
    }
  };

  const fileMineTypes = [
    <Select.Option key='text/plain'>'text/plain'</Select.Option>,
    <Select.Option key='text/html'>'text/html'</Select.Option>,
    <Select.Option key='text/javascript'>'text/javascript'</Select.Option>,
    <Select.Option key='text/css'>'text/css'</Select.Option>,
    <Select.Option key='image/jpeg'>'image/jpeg'</Select.Option>,
    <Select.Option key='image/png'>'image/png'</Select.Option>,
    <Select.Option key='audio/mpeg'>'audio/mpeg'</Select.Option>,
    <Select.Option key='audio/ogg'>'audio/ogg'</Select.Option>
  ];

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  function formatter(value) {
    const sizeInMb = Math.floor(value / 1048576);
    return `${sizeInMb} Mb`;
  }

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
      <Form.Item label='Limits'>
        {getFieldDecorator('limits', {
          initialValue: [activeUploadCase.minSize, activeUploadCase.maxSize]
        })(
          <Slider
            range
            marks={marks}
            tipFormatter={formatter}
            min={1048576}
            max={104857600}
            step={1048576}
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
