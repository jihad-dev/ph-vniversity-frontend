import {
  Button,
  Dropdown,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { useState } from "react";
import {
  useGetAllStudentsQuery,
  useUpdateUserStatusMutation,
} from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";

type DataType = {
  _id: string;
  name: string;
  id: string;
  gender: string;
  email: string;
  fullName: string;
  contactNo: string;
  status: string;
  user?: {
    status: string;
  };
};

const GetStudentsData = () => {
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const [page, setPage] = useState(0);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
 

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, name, id, email, fullName, contactNo, user }: DataType) => ({
      _id,
      name,
      id,
      email,
      fullName,
      contactNo,
      status: `${user?._id}`,
      key: _id, // Important! Each row needs a unique key
    })
   
  );


  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "id",
      key: "_id",
      dataIndex: "_id",
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
            <ChangeUserStatus userInfo={item} />
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
    </>
  );
};

const ChangeUserStatus = ({ userInfo }) => {
  console.log(userInfo.status);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const statusOptions = [
    {
      label: "In Progress",
      value: "in-progress",
    },
    {
      label: "Blocked",
      value: "blocked",
    },
  ];
  const [changeStatus] = useUpdateUserStatusMutation();

  const onSubmit = (data: any) => {
    console.log(data);
    const userData = {
      userId: userInfo?.status,
      data,
    };
    changeStatus(userData);
    console.log(userData);
  };
  return (
    <>
      <Button onClick={showModal}>Change Status</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PhForm onsubmit={onSubmit}>
          <PhSelect options={statusOptions} name="status" label="Status" />
          <Button htmlType="submit">submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};
export default GetStudentsData;
