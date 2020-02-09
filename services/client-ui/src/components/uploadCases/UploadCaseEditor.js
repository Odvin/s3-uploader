import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, Slider, Select } from 'antd';

import { consumeUploadCaseEditor } from '../../redux/actions/uploadCases';

const { Option } = Select;

function UploadCaseEditor(props) {
  const dispatch = useDispatch();

  const { isEditorVisible, activeUploadCaseId } = useSelector(
    state => state.uploadCases
  );

  const [processCaseUpdate, setProcessCaseUpdate] = useState(false);

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = props.form;

  function updateUploadCase() {
    console.log('Update case:', activeUploadCaseId);
  }

  function closeUploadCaseEditor() {
    dispatch(consumeUploadCaseEditor(false));
  }

  const marks = {
    0: '1 Kb',
    10: '10 Mb',
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

  return (
    <Modal
      visible={isEditorVisible}
      title='Upload Case'
      onOk={updateUploadCase}
      onCancel={closeUploadCaseEditor}
      footer={[
        <Button key='back' onClick={closeUploadCaseEditor}>
          Return
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
      <Form>
        <Form.Item>
          {getFieldDecorator('caseName', {
            rules: [
              { required: true, message: 'Please input user upload case name' }
            ]
          })(<Input placeholder='Upload Case Name' />)}
        </Form.Item>
        <Form.Item>
          <Slider range marks={marks} defaultValue={[0, 10]} />
        </Form.Item>
        <Form.Item>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select files mineTypes'
          >
            {fileMineTypes}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create({ name: 'uploadCaseEditor' })(UploadCaseEditor);
