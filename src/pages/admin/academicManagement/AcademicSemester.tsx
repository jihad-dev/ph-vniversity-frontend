import { Table, TableColumnsType, TableProps } from "antd";

interface DataType {
  address: any;
  _id: string;
  name: string;
  startMonth: string;
  endMonth: string;
  year: string;
}
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";

const AcademicSemester = () => {
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllSemestersQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }: DataType) => ({
      _id,
      name,
      startMonth,
      endMonth,
      year,
      key: _id, // This is important! Each row should have a unique key
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],

      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2029",
          value: "2029",
        },
      ],
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) =>
        record.address.indexOf(value as string) === 0,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) =>
        record?.address?.indexOf(value as string) === 0,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra?.action === "filter") {
      const queryParams: { name: string; value: string }[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: String(item) });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: String(item) });
      });
      setParams(queryParams as { name: string; value: string }[]);
    }
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
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
