import {
  Button,
  Modal,
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
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";

type DataType = {
  _id: string;
  name: string;
  id: string;
  gender: string;
  email: string;
  fullName: string;
  contactNo: string;
  user?: {
    status: string;
    _id: string;
  };
};

const GetStudentsData = () => {
  const [params, setParams] = useState<{ name: string; value: string }[]>([]);
  const [page, setPage] = useState(0);
  const {
    data: studentData,
    isLoading,
    refetch,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, name, email, fullName, contactNo, user }: DataType) => ({
      _id,
      name,
      email,
      fullName,
      contactNo,
      status: `${user?.status}`,
      userId: `${user?._id}`,
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
            <ChangeUserStatus userInfo={item} refetch={refetch} />
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

const ChangeUserStatus = ({
  userInfo,
  refetch,
}: {
  userInfo: { userId: string };
  refetch: () => void; // Pass the refetch function as a prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeStatus] = useUpdateUserStatusMutation();
  const statusOptions = [
    {
      label: "In Progress",
      value: "in-progress",
    },
    {
      label: "Blocked",
      value: "blocked",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      const userData = {
        userId: userInfo?.userId,
        data,
      };

      // Show a loading notification
      const toastId = toast.loading("Updating status...");

      // Call the API and wait for response
      const response = await changeStatus(userData);

      if (response) {
        // Show success notification and update UI
       
        toast.success("Status updated successfully!", { id: toastId });
        setIsModalOpen(false);
        // Trigger refetch to update the table data
        refetch();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      const toastId = toast.loading(""); // Ensure toastId is defined
      toast.error("Error updating status", { id: toastId });
      // Show error notification
      toast.error("Error updating status. Please try again.");
    }
  };

  return (
    <>
      <Button onClick={showModal}>Change Status</Button>
      <Modal
      footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PhForm onsubmit={onSubmit}>
          <PhSelect options={statusOptions} name="status" label="Status" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default GetStudentsData;
