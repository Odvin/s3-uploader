import React, {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

function UserInfo(props) {
 
  const [checkNick, setCheckNick] = useState(false);

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

  const check = () => {
    props.form.validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
  };

  const handleChange = e => {
    setCheckNick(e.target.checked);
    props.form.validateFields(['externalUserId'], { force: true })
  };

  return (
    <div>
      <Form.Item {...formItemLayout} label="User Id">
          {getFieldDecorator('userId', {
            rules: [
              {
                required: true,
                message: 'Please input user Id',
              },
            ],
          })(<Input placeholder="Please input user Id" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="External User Id">
          {getFieldDecorator('externalUserId', {
            rules: [
              {
                required: checkNick,
                message: 'Please input external user Id',
              },
            ],
          })(<Input placeholder="Please input external user Id" />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Checkbox checked={checkNick} onChange={handleChange}>
            Search by external user Id
          </Checkbox>
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={check}>
            Get User Info
          </Button>
        </Form.Item>
    </div>
  )
}

export default Form.create({ name: 'userInfo' })(UserInfo);