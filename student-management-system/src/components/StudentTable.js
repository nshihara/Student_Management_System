import { Table, Space, Button, Modal, Input, message, Alert, Form, DatePicker, Radio, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import axios from "axios";


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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button type="default" onClick={() => handleView(record)}>
    //         View
    //       </Button>
    //       <Button type="default" onClick={() => handleEdit(record)}>
    //         Edit
    //       </Button>
    //       <Button type="dashed" onClick={() => handleDelete(record)}>
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    //   align: "center",
    // },
  ]);

  const [editedStudent, setEditedStudent] = useState(null); // Add this line
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
    setEditedStudent(record);
    setIsEditModalOpen(true);
    form.setFieldsValue(record); // Populate the form fields with the selected student's data
  };

  const onEditFinish = (values) => {
    console.log("Edited values:", values);

    // Send a PUT request to update the student's data on the server
    axios.put(`http://localhost:3000/student/${editedStudent.id}`, values)
      .then((response) => {
        console.log("Student edited successfully:", response.data);

        // Update the dataSource with the edited student data
        const updatedDataSource = dataSource.map((student) => {
          if (student.id === editedStudent.id) {
            return { ...student, ...values };
          }
          return student;
        });

        setDataSource(updatedDataSource);
        setIsEditModalOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error editing student:", error);
      });
  };

  const openEditModal = (record) => {
    setEditedStudent(record);
    setIsEditModalOpen(true);
    form.setFieldsValue(record); // Populate the form fields with the selected student's data
  };
  
  // Function to close the Edit Student modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    form.resetFields(); // Reset the form fields when closing the modal
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
    fetch("http://localhost:3000/student")
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result.student);
      });
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
  
    // Create a new student object from the form values
    const newStudent = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      mobileNumber: values.mobileNumber,
      birthday: values.birthday.format("YYYY-MM-DD"),
      address: values.address,
      guardianName: values.guardianName,
      guardianContactNumber: values.guardianContactNumber,
      otherDetails: values.otherDetails,
    };
  
    // Send a POST request to your API endpoint
    axios.post("http://localhost:3000/student", newStudent)
      .then((response) => {
        console.log("Student added successfully:", response.data);
  
        // Update the dataSource with the new student data
        const updatedDataSource = [...dataSource, response.data];
        setDataSource(updatedDataSource);
  
        setIsAddModalOpen(false); // Close Add Student modal after submitting the form
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };
  
  const handleDelete = (record) => {
    console.log("Delete button clicked for student ID:", record.id);
    const updatedDataSource = dataSource.filter((student) => student.id !== record.id);
    setDataSource(updatedDataSource);
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
  columns={[
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="default" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="dashed" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
      align: "center",
    },
  ]}
  dataSource={filteredData.length > 0 ? filteredData : dataSource}
  style={{ marginTop: "40px", marginLeft: "10px", marginRight: "10px" }}
  rowKey="id"
/>
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
            <DatePicker format="YYYY-MM-DD" />
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
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>
      <Modal
        title="Edit Student"
        visible={isEditModalOpen}
        onCancel={closeEditModal} // Close the Edit Student modal
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onEditFinish}
          className="custom-form"
        >
          <Form.Item name="firstName" label="First Name">
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="mobileNumber" label="Mobile number">
            <InputNumber className="custom-input" />
          </Form.Item>
          {/* <Form.Item name="birthday" label="Birthday">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item> */}
          <Form.Item name="address" label="Address">
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item name="guardianName" label="Guardian Name">
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item name="guardianContactNumber" label="Guardian contact number">
            <InputNumber className="custom-input" />
          </Form.Item>
          <Form.Item name="otherDetails" label="Other Details">
            <TextArea rows={4} className="custom-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="custom-button">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentTable;