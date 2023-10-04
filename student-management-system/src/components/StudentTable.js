import { Table, Space, Button, Modal, Input, message, Alert, Form, DatePicker, Radio, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";

// const { TextArea } = Input; 
const { RangePicker } = DatePicker;

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
          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="default" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="dashed" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
      align: "center",
    },
  ]);

  const [dataSource, setDataSource] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Student modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  const handleView = (record) => {
    setSelectedStudent(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record) => {
    console.log(`Editing student with ID ${record.id}`);
  };

  const handleDelete = (record) => {
    console.log(`Deleting student with ID ${record.id}`);
  };

  const handleModalCancel = () => {
    setIsViewModalOpen(false);
    setIsAddModalOpen(false); // Close Add Student modal when clicking cancel
  };

  const handleIdInputChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleNameInputChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearch = () => {
    setError(null);

    const filteredData = dataSource.filter((student) => {
      const idMatches = student.id.toString().includes(searchId);
      const nameMatches = student.firstName.toLowerCase().includes(searchName.toLowerCase());
      return idMatches && nameMatches;
    });

    if (filteredData.length === 0) {
      setFilteredData([]);
      setNoMatchingRecords(true);
    } else {
      setFilteredData(filteredData);
      setNoMatchingRecords(false);
    }
  };
  const [noMatchingRecords, setNoMatchingRecords] = useState(false);

  const clearSearch = () => {
    setSearchId("");
    setSearchName("");
    setError(null);
    setFilteredData([]);
  };

  useEffect(() => {
    fetch("https://run.mocky.io/v3/e5dbf20e-af35-4e64-9316-e6007ac7fceb")
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result.student);
      });
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    setIsAddModalOpen(false); // Close Add Student modal after submitting the form
    form.resetFields();
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="Search by ID"
          value={searchId}
          onChange={handleIdInputChange}
          className="inputfields"
        />
        <Input
          placeholder="Search by Name"
          value={searchName}
          onChange={handleNameInputChange}
          className="inputfields"
        />
        <Button type="primary" onClick={handleSearch} className="searchbtn">
          Search
        </Button>
        <Button type="default" onClick={clearSearch} className="clearbtn">
          Clear
        </Button>
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
      )}
      {noMatchingRecords && (
        <Alert
          message="No matching records found."
          className="alert"
          type="error"
          closable
          onClose={() => setNoMatchingRecords(false)}
        />
      )}
      <Table
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : dataSource}
        style={{ margin: "16px" }}
      ></Table>
      <Modal
        title="Student Details"
        visible={isViewModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        className="custom-view-details-modal"
      >
        {selectedStudent && (
          <div  className="custom-details-container">
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
      <div style={{ textAlign: "right", marginTop: "16px", marginRight: "120px" }}>
        <Button type="primary" onClick={() => setIsAddModalOpen(true)} className="addbtn">
          Add Student
        </Button>
      </div>
      <Modal
        title="Add Student"
        visible={isAddModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          className="custom-form"
        >
          <Form.Item name="firstName" label="First Name">
            <Input className="custom-input"/>
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input className="custom-input"/>
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Radio.Group>
              <Radio value="Male"> Male </Radio>
              <Radio value="Female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="mobileNumber" label="Mobile number">
            <InputNumber className="custom-input"/>
          </Form.Item>
          <Form.Item name="birthday" label="Birthday">
            <DatePicker />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input className="custom-input"/>
          </Form.Item>
          <Form.Item name="guardianName" label="Guardian Name">
            <Input className="custom-input"/>
          </Form.Item>
          <Form.Item name="guardianContactNumber" label="Guardian contact number">
            <InputNumber className="custom-input"/>
          </Form.Item>
          <Form.Item name="otherDetails" label="Other Details">
            <TextArea rows={4} className="custom-input"/>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit"  className="custom-button">
              Add Student
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default StudentTable;
