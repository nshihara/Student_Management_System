import React from 'react';
import { Table, Space, Button, Tag } from 'antd';

const columns = [
  {
    title: 'Student ID',
    dataIndex: 'ID',
    key: 'ID',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleView(record)}>View</Button>
        <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
        <Button type="dashed" onClick={() => handleDelete(record)}>Delete</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    ID: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    gender: 'male',
    tags: ['nice', 'developer'],
  },
];
const handleView = (record) => {
    // Implement logic for viewing student information
    console.log(`Viewing student with ID ${record.ID}`);
  };
  
  const handleEdit = (record) => {
    // Implement logic for editing student information
    console.log(`Editing student with ID ${record.ID}`);
  };
  
  const handleDelete = (record) => {
    // Implement logic for deleting student information
    console.log(`Deleting student with ID ${record.ID}`);
  };
const StudentTable = () => (
  <Table columns={columns} dataSource={data} />
);

export default StudentTable;
