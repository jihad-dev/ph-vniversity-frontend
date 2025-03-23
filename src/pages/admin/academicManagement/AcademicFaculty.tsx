import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AcademicFaculty = () => {
  const {
    data: facultyData,
    isFetching,
    isLoading,
  } = useGetAcademicFacultyQuery(undefined);

  const tableData = facultyData?.data?.map((faculty: any) => ({
    name: faculty.name,
    key: faculty._id,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "20px",
          

        }}
      >
        Loading...
      </div>
    );
  }
  return (
    <Table<DataType>
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
