import { FieldValues } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import {
  useCreateAcademicDepartmentMutation,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";



const CreateAcademicDepartment = () => {

  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const departmentOptions = useGetAcademicFacultyQuery(undefined);
  const onsubmit = async (data: FieldValues) => {
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    const toastId = toast.loading("Creating academic Department");

    try {
      const res = await createAcademicDepartment(departmentData);
      console.log(res);
      if ("error" in res) {
        toast.error((res.error as any)?.data?.message, { id: toastId });
      } else {
        toast.success("Academic Department created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onsubmit={onsubmit}>
          <PhInput
            
            name="name"
            label="Department name"
            type="text"
          />
          <PhSelect
            name="academicFaculty"
            label="Faculty"
            options={
              departmentOptions.data?.data?.map((faculty: any) => ({
                value: faculty._id,
                label: faculty.name,
              })) || []
            }
          />
          <Button htmlType="submit">submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
