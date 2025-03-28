import { Button, Modal, Table, TableColumnsType, Tag } from "antd";
interface DataType {
  _id: string;
  prefix: string;
  title: string;
  code: string;
}
interface FacultyInfo {
  key: string;
}
import { OrbitProgress } from "react-loading-indicators";
import {
  useAssignFacultyMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

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
        return <AssignFacultyModal facultyInfo={item} />;
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



const AssignFacultyModal = ({ facultyInfo }: { facultyInfo: FacultyInfo }) => {
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [assignFaculty] = useAssignFacultyMutation();

  const facultiesOptions = facultiesData?.data?.map((item: any) => ({
    value: item?._id,
    label: item?.fullName,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    let toastId: string | undefined;
    try {
      toastId = toast.loading("assign....") as string;
      const facultiesData = {
        courseId: facultyInfo?.key,
        data,
      };

      await assignFaculty(facultiesData);

      // **Close the modal after successful submission**
      setIsModalOpen(false);
      toast.success("Faculty assigned successfully!", { id: toastId });
    } catch (error) {
      if (toastId) {
        toast.error("Failed to assign faculty. Please try again.", {
          id: toastId,
        });
      }
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
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
