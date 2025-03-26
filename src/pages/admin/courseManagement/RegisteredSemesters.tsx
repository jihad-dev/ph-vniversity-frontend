import { Table, TableColumnsType } from "antd";

interface AcademicSemester {
  name: string;
  year: string;
}

interface DataType {
  _id: string;
  status: string;
  academicSemester: AcademicSemester;
  startDate: string;
  endDate: string;
}

import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";

const RegisteredSemesters = () => {
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const {
    data: semesterRegisteredData,
    isFetching,
    isLoading,
  } = useGetAllRegisteredSemesterQuery(params);
  console.log(semesterRegisteredData);

  const tableData = semesterRegisteredData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }: DataType) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("yyyy-MM-dd"),
      endDate: moment(new Date(endDate)).format("yyyy-MM-dd"),
      status,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Academic Semester",
      dataIndex: "name",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
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
    <Table<DataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;

