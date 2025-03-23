import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import PhForm from "../../../components/form/PhForm";
import { FieldValues } from "react-hook-form";
import { semesterOptions } from "../../../constans/semester";
import { monthOptions } from "../../../constans/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../Schemas/AcademicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { SerializedError } from "@reduxjs/toolkit";
const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating academic semester");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    try {
      const res = await addAcademicSemester(semesterData);
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

  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm
          onsubmit={onsubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PhSelect label="Name" name="name" options={semesterOptions} />
          <PhSelect label="Year" name="year" options={yearOptions} />
          <PhSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PhSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
