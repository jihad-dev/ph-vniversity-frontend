import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { OrbitProgress } from "react-loading-indicators";

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
    <Table<DataType>
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
