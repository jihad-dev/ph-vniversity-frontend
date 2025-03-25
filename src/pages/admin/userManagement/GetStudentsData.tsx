import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import PhModal from "../../../components/form/PhModal";
import { OrbitProgress } from "react-loading-indicators";

type DataType = {
  _id: string;
  name: string;
  id: string;
  gender: string;
  email: string;
  fullName: string;
  contactNo: string;
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
    ({ _id, name, id, email, fullName, contactNo }: DataType) => ({
      _id,
      name,
      id,
      email,
      fullName,
      contactNo,
      key: _id, // This is important! Each row should have a unique key
    })
  );

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
            <PhModal />
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
          height: "100vh", // Make it take the full height of the viewport
          width: "100%", // Ensures full width
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
