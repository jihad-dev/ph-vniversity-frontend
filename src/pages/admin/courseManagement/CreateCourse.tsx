import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import {
  useAddCoursesMutation,
  useAddRegisteredSemesterMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PhSelect from "../../../components/form/PhSelect";

const CreateCourse = () => {
  const [addCourses] = useAddCoursesMutation();
  const { data: courses, isLoading } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item: any) => ({
    value: item?._id,
    label: item?.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item:any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = await addCourses(courseData);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Course created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onsubmit={onSubmit}>
          <PhInput type="text" name="title" label="Title" />
          <PhInput type="text" name="prefix" label="Prefix" />
          <PhInput type="number" name="code" label=" Code" />
          <PhInput type="number" name="credits" label=" Credits" />
          <PhSelect
            mode="multiple"
            label="PreRequisiteCourse"
            name="preRequisiteCourses"
            disabled={isLoading}
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
