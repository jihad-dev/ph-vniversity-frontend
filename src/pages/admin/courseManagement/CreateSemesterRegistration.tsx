import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { semesterStatusOptions } from "../../../constans/semester";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item: any) => ({
    value: item?._id,
    label: `${item?.name} ${item?.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = await addSemester(semesterData);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onsubmit={onSubmit}>
          <PhSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PhSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PhDatePicker name="startDate" label="Start Date" />
          <PhDatePicker name="endDate" label="End Date" />
          <PhInput type="number" name="minCredit" label="Min Credit" />
          <PhInput type="number" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
