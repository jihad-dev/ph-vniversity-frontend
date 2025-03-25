import { OrbitProgress } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";

const UpdateStudent = () => {
  const { studentId } = useParams();
  const { data: student, error, isLoading } = useGetStudentByIdQuery(studentId);

  if (isLoading)
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
  if (error) return <p>Error fetching student details</p>;
  const { email } = student;

  return <div>UpdateStudent  : {email}</div>;
};

export default UpdateStudent;
