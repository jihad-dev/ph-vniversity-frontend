import {
  Button,
  Dropdown,
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
import { FieldValues } from "react-hook-form";

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

const items = [
  {
    label: "in-progress",
    key: "in-progress",
  },
  {
    label: "blocked",
    key: "blocked",
  },
];

const GetStudentsData = () => {
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const [page, setPage] = useState(0);

  const [status, setStatus] = useState<string>("");

  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(status.status);

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const handleStatusUpdate = (data: FieldValues) => {
    console.log(data);
    console.log(status);
    const updateStatusData = {
      id: status,
      data: {
        status: data?.key,
      },
    };
    // updateUserStatus(updateStatusData);
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, name, id, email, fullName, contactNo, user }: DataType) => ({
      _id,
      name,
      id,
      email,
      fullName,
      contactNo,
      status: `${user?.status}`,
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

            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setStatus(item)}>Change Status</Button>
            </Dropdown>
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

export default GetStudentsData;
