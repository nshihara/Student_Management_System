import React from 'react';
import { Input, Form, Button, Row, Col } from 'antd';

const MyForm = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form onFinish={onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 6 }} className='input'>
      <Row gutter={8} justify="end">
        <Col span={10}>
          <Form.Item
            label="ID"
            name="id"
          >
            <Input placeholder="Enter ID" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Name"
            name="name"
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        </Col>
        <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Form.Item wrapperCol={{ span: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MyForm;
