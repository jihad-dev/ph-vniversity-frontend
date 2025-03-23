

import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AcademicDepartment = () => {
  const {
    data: departmentData,
    isFetching,
    isLoading,
  } = useGetAcademicDepartmentsQuery(undefined);

  const tableData = departmentData?.data?.map((department: any) => ({
    name: department?.name,
    key: department?._id,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Department Name",
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

export default AcademicDepartment        ;
