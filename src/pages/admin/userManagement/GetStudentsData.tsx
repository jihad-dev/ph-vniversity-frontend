// import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
// import { useState } from "react";
// import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
// import { Link } from "react-router-dom";

// import { OrbitProgress } from "react-loading-indicators";

// type DataType = {
//   _id: string;
//   name: string;
//   id: string;
//   gender: string;
//   email: string;
//   fullName: string;
//   contactNo: string;
// };

// const GetStudentsData = () => {
//   const [params, setParams] = useState<{ name: string; value: string }[]>([]);
//   const [page, setPage] = useState(0);

//   const {
//     data: studentData,
//     isLoading,
//     isFetching,
//   } = useGetAllStudentsQuery([
//     { name: "page", value: page },
//     { name: "sort", value: "id" },
//     ...params,
//   ]);

//   const metaData = studentData?.meta;
//   const tableData = studentData?.data?.map(
//     ({ _id, name, id, email, fullName, contactNo }: DataType) => ({
//       _id,
//       name,
//       id,
//       email,
//       fullName,
//       contactNo,
//       key: _id, // This is important! Each row should have a unique key
//     })
//   );

//   const columns: TableColumnsType<any> = [
//     {
//       title: "Name",
//       key: "name",
//       dataIndex: "fullName",
//     },

//     {
//       title: "Roll No.",
//       key: "id",
//       dataIndex: "id",
//     },
//     {
//       title: "Email",
//       key: "email",
//       dataIndex: "email",
//     },
//     {
//       title: "Contact No.",
//       key: "contactNo",
//       dataIndex: "contactNo",
//     },
//     {
//       title: "Action",
//       key: "x",
//       render: (item) => {
//         return (
//           <Space>
//             <Link to={`/admin/student-data/${item?.key}`}>
//               <Button>Details</Button>
//             </Link>
//             <Link to={`/admin/update-student/${item?.key}`}>
//               <Button>Update</Button>
//             </Link>
//             <Button>Change Status</Button>
//           </Space>
//         );
//       },
//       width: "1%",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh", // Make it take the full height of the viewport
//           width: "100%", // Ensures full width
//         }}
//       >
//         <OrbitProgress
//           variant="dotted"
//           dense
//           color="#000"
//           size="medium"
//           text="Loading..."
//           textColor=""
//         />
//       </div>
//     );
//   }
//   return (
//     <>
//       <Table<DataType>
//         loading={isFetching}
//         pagination={false}
//         columns={columns}
//         dataSource={tableData}
//         showSorterTooltip={{ target: "sorter-icon" }}
//       />
//       <Pagination
//         current={page}
//         onChange={(value) => setPage(value)}
//         pageSize={metaData?.limit}
//         total={metaData?.total}
//       />
//     </>
//   );
// };

// export default GetStudentsData;

import {
  Button,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
  message,
} from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

type DataType = {
  _id: string;
  name: string;
  id: string;
  gender: string;
  email: string;
  fullName: string;
  contactNo: string;
  status: string;
};

const GetStudentsData = () => {
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const [page, setPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<DataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState<string>("in-progress");

  const {
    data: studentData,
    isLoading,
    isFetching,
    refetch, // Used to refresh data after updating status
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, name, id, email, fullName, contactNo, status }: DataType) => ({
      _id,
      name,
      id,
      email,
      fullName,
      contactNo,
      status,
      key: _id, // Important! Each row needs a unique key
    })
  );

  // Handle modal opening
  const handleOpenModal = (student: DataType) => {
    setSelectedStudent(student);
    setStatus(student.status); // Set the current status in modal
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  };

  // Handle status update API call
  const handleUpdateStatus = async () => {
    if (!selectedStudent) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/change-status/${selectedStudent._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        message.success("User status updated successfully!");
        refetch(); // Refresh table data
        handleCancel(); // Close modal
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      message.error("Error updating status");
    }
  };

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            fontWeight: "bold",
            color: status === "active" ? "green" : "red",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/update-student/${item?.key}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={() => handleOpenModal(item)}>Change Status</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <OrbitProgress
          variant="dotted"
          dense
          color="#000"
          size="medium"
          text="Loading..."
          textColor=""
        />
      </div>
    );
  }

  return (
    <>
      <Table<DataType>
        loading={isFetching}
        pagination={false}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />

      {/* Status Change Modal */}
      <Modal
        title="Change Student Status"
        visible={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={handleCancel}
        okText="Update Status"
      >
        <p>
          Change status for: <strong>{selectedStudent?.fullName}</strong>
        </p>
        <Select
          value={status}
          style={{ width: "100%" }}
          onChange={(value) => setStatus(value)}
        >
          <Select.Option value="in-progress">Active</Select.Option>
          <Select.Option value="blocked">Inactive</Select.Option>
        </Select>
      </Modal>
    </>
  );
};

export default GetStudentsData;
