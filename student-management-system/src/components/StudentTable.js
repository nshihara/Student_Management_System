import React, { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';

const columns = [
  {
    title: 'Student ID',
    dataIndex: 'id',
    key: 'id',
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
const handleView = (record) => {
    // Implement logic for viewing student information
    console.log(`Viewing student with ID ${record.id}`);
  };

  const handleEdit = (record) => {
    // Implement logic for editing student information
    console.log(`Editing student with ID ${record.id}`);
  };

  const handleDelete = (record) => {
    // Implement logic for deleting student information
    console.log(`Deleting student with ID ${record.id}`);
  };
const StudentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://run.mocky.io/v3/66e829ea-b690-4eaa-821a-0fd17c0fcbf3')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);



  return <Table columns={columns} dataSource={data} loading={loading} />;
};

export default StudentTable;
