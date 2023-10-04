import { Table, Space, Button, Modal } from "antd"; // Import Space and Button
import React, { useEffect, useState } from "react";

const StudentTable = () => {
  const [columns, setColumns] = useState([
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "firstName",
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleView(record)}>View</Button>
          <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="dashed" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ]);

  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  // Define the handleView, handleEdit, and handleDelete functions
  const handleView = (record) => {
    setSelectedStudent(record);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    console.log(`Editing student with ID ${record.id}`);
  };

  const handleDelete = (record) => {
    console.log(`Deleting student with ID ${record.id}`);
  };
  const handleModalCancel = () => {
    // Close the modal
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetch("https://run.mocky.io/v3/a7139360-6924-4c40-ab02-9fcda739cb81")
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result.student);
      });
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        title="Student Details"
        visible={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        {selectedStudent && (
          <div>
            <p><strong>ID:</strong> {selectedStudent.id}</p>
            <p><strong>First Name:</strong> {selectedStudent.firstName}</p>
            <p><strong>Last Name:</strong> {selectedStudent.lastName}</p>
            <p><strong>Birthday:</strong> {selectedStudent.birthday}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <p><strong>Phone:</strong> {selectedStudent.mobileNumber}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Guardian Name:</strong> {selectedStudent.guardianName}</p>
            <p><strong>Guardian Contact Number:</strong> {selectedStudent.guardianContactNumber}</p>
            <p><strong>Other Details:</strong> {selectedStudent.otherDetails}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentTable;
