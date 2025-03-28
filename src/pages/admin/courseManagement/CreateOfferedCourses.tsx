import { Button, Col, Flex } from "antd";
import { useState } from "react";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import moment from "moment";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PhInput from "../../../components/form/PhInput";
import { weekDaysOptions } from "../../../constans/global";
import PHTimePicker from "../../../components/form/PhTimePicker";

const CreateOfferedCourses = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemesterQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);
console.log(semesterRegistrationData);

  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: item.name,
    })
  );

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onsubmit={onSubmit}>
          <PhSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PhSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PhSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PhSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <PhInput type="text" name="section" label="Section" />
          <PhInput type="text" name="maxCapacity" label="Max Capacity" />
          <PhSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourses;
