import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { SerializedError } from "@reduxjs/toolkit";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating academic Faculty...");
    try {
      const res = await createAcademicFaculty(data);
      console.log(res);
      if (res.error) {
        toast.error((res.error as SerializedError)?.message, { id: toastId });
      } else {
        toast.success("Academic semester created successfully", {
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
          <PhInput name="name" label="name" type="text" />
          <Button htmlType="submit">submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
