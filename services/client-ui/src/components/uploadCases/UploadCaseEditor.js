import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Slider, Select } from 'antd';

import { reqUpdateUploadCase, reqCreateUploadCase } from '../../api';

import { consumeUploadCaseEditor, addUploadCase } from '../../redux/actions/uploadCases';

const { Option } = Select;

const MBSize = 1024 * 1024;

function UploadCaseEditor(props) {
  const dispatch = useDispatch();

  const { isEditorVisible, activeUploadCaseId, cases } = useSelector(
    state => state.uploadCases
  );

  const activeUploadCase = {
    name: null,
    mimes: [],
    minSize: 0,
    maxSize: 10
  };

  if (activeUploadCaseId) {
    const { name, mimes, minSize, maxSize } = (cases || []).find(
      c => c._id === activeUploadCaseId
    );
    if (name && mimes && minSize && maxSize) {
      activeUploadCase.name = name;
      activeUploadCase.mimes = mimes;
      activeUploadCase.minSize =
        minSize === 1024 ? 0 : Math.floor(minSize / MBSize);
      activeUploadCase.maxSize = Math.floor(maxSize / MBSize);
    }
  }

  const [processCaseUpdate, setProcessCaseUpdate] = useState(false);

  const { getFieldDecorator, validateFields } = props.form;

  async function updateUploadCase() {
    await validateFields(async (err, values) => {
      if (!err) {
        console.log('==== Edit upload case ====');

        const uploadCase = {
          name: values.name,
          minSize: values.limits[0] ? values.limits[0] * MBSize : 1024,
          maxSize: values.limits[1] * MBSize,
          mimes: values.mimes
        };

        setProcessCaseUpdate(true);
        if (activeUploadCaseId) {
          uploadCase.caseId = activeUploadCaseId;
          await reqUpdateUploadCase(uploadCase);
        } else {
          const newUploadCase = await reqCreateUploadCase(uploadCase);
          dispatch(addUploadCase(newUploadCase));
        }
        setProcessCaseUpdate(true);
        closeUploadCaseEditor();
      }
    });
  }

  function validateToExistedUploadCasesNames(rule, value, callback) {
    // When creating new upload case check that the name not in use
    // For new upload case activeUploadCaseId is null
    if (!activeUploadCaseId) {
      const uploadCasesNames = cases.map(c => c.case);
      if (uploadCasesNames.includes(value)) {
        callback('The name is already used.');
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  function closeUploadCaseEditor() {
    dispatch(consumeUploadCaseEditor(false));
  }

  const marks = {
    0: '1 Kb',
    20: '20 Mb',
    100: {
      label: <strong>100 MB</strong>
    }
  };

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

  return (
    <Modal
      visible={isEditorVisible}
      title='Upload Case'
      onOk={updateUploadCase}
      onCancel={closeUploadCaseEditor}
      footer={[
        <Button key='back' onClick={closeUploadCaseEditor}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={processCaseUpdate}
          onClick={updateUploadCase}
        >
          Submit
        </Button>
      ]}
    >
      <Form {...formItemLayout}>
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
          })(<Slider range marks={marks} />)}
        </Form.Item>
        <Form.Item label='Mimes'>
          {getFieldDecorator('mimes', {
            initialValue: activeUploadCase.mimes,
            rules: [
              { required: true, message: 'Please set possible mime types' }
            ]
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
      </Form>
    </Modal>
  );
}

export default Form.create({ name: 'uploadCaseEditor' })(UploadCaseEditor);
