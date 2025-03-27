import { Button, Modal, Table, TableColumnsType, Tag } from "antd";

interface AcademicSemester {
  name: string;
  year: string;
}

interface DataType {
  _id: string;
  prefix: string;
  title: string;
  code: string;
}

import { OrbitProgress } from "react-loading-indicators";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

const Courses = () => {
  const {
    data: courseData,
    isFetching,
    isLoading,
  } = useGetAllCoursesQuery(undefined);

  const tableData = courseData?.data?.map(
    ({ _id, title, prefix, code }: DataType) => ({
      key: _id,
      title: title,
      code: `${prefix}${code}`,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },

    {
      title: "Action",
      key: "action",
      render: (item) => {
        return <AssignFacultyModal data={item} />;
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
    />
  );
};

const AssignFacultyModal = ({ data }) => {
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);

  const facultiesOptions = facultiesData?.data?.map((item:any) => ({
    value: item?._id,
    label: item?.fullName,
  }));

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
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PhForm onsubmit={onSubmit}>
          <PhSelect
            mode="multiple"
            options={facultiesOptions}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default Courses;
