import React from 'react';
import { useHistory } from 'react-router-dom';

function UserForm (props) {
  const history = useHistory();

  const { getFieldDecorator } = props.form;

  function getUserInfo() {
    e.preventDefault();

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

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  return (
    <Form {...formItemLayout} onSubmit={getUserInfo}>
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
            </Button.Group>
          </Col>
        </Row>
    </Form>
  )
}

export default Form.create({ name: 'UserForm' })(UserForm);