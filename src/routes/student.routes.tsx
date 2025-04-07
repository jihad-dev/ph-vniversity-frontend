import OfferedCourse from "../pages/student/OfferedCourse";
import Schedule from "../pages/student/Schedule";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element:<StudentDashboard/>,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse/>,
  },
  {
    name: "Enrolled Course",
    path: "enrolled-course",
    element: <Schedule/>,
  },
];
