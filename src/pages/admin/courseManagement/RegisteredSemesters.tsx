import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

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
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";

const items = [
  {
    label: "ongoing",
    key: "ONGOING",
  },
  {
    label: "upcoming",
    key: "UPCOMING",
  },
  {
    label: "ended",
    key: "ENDED",
  },
];
const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const {
    data: semesterRegisteredData,
    isFetching,
    isLoading,
  } = useGetAllRegisteredSemesterQuery(params);
  console.log(semesterRegisteredData);
  
  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterRegisteredData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }: DataType) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("yyyy-MM-dd"),
      endDate: moment(new Date(endDate)).format("yyyy-MM-dd"),
      status,
    })
  );
  const handleStatusUpdate = (data) => {
    console.log(data.key);
    console.log(semesterId);
    const updateStatusData = {
      id: semesterId,
      data: {
        status: data?.key,
      },
    };
    updateSemesterStatus(updateStatusData);
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Academic Semester",
      dataIndex: "name",
    },
    {
      title: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item?.key)}>update</Button>
          </Dropdown>
        );
      },
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
