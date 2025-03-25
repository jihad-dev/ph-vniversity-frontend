import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";
import { OrbitProgress } from "react-loading-indicators";
import { Table } from "antd";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: student, error, isLoading } = useGetStudentByIdQuery(studentId);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <OrbitProgress
          variant="dotted"
          dense
          color="#000"
          size="medium"
          text="Loading..."
        />
      </div>
    );

  if (error)
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error fetching student details
      </p>
    );

  // Prepare table data
  const tableData = [
    { key: "1", field: "Full Name", value: student?.fullName },
    { key: "2", field: "Gender", value: student?.gender },
    { key: "3", field: "Email", value: student?.email },
    { key: "4", field: "Contact No", value: student?.contactNo },
    {
      key: "5",
      field: "Emergency Contact No",
      value: student?.emergencyContactNo,
    },
    {
      key: "6",
      field: "Date of Birth",
      value: new Date(student?.dateOfBirth).toLocaleDateString(),
    },
    { key: "7", field: "Blood Group", value: student?.bloodGroup },
    { key: "8", field: "Present Address", value: student?.presentAddress },
    { key: "9", field: "Permanent Address", value: student?.permanentAddress },
    {
      key: "10",
      field: "Admission Semester",
      value: `${student?.admissionSemester?.name} ${student?.admissionSemester?.year}`,
    },
    {
      key: "11",
      field: "Academic Department",
      value: student?.academicDepartment?.name,
    },
    {
      key: "12",
      field: "Academic Faculty",
      value: student?.academicFaculty?.name,
    },
    {
      key: "13",
      field: "Guardian (Father)",
      value: `${student?.guardian?.fatherName} (${student?.guardian?.fatherOccupation})`,
    },
    {
      key: "14",
      field: "Guardian (Mother)",
      value: `${student?.guardian?.motherName} (${student?.guardian?.motherOccupation})`,
    },
    {
      key: "15",
      field: "Local Guardian",
      value: `${student?.localGuardian?.name} (${student?.localGuardian?.occupation})`,
    },
  ];

  // Define table columns
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default StudentDetails;
