import { OrbitProgress } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import PhSelect from "../../../components/form/PhSelect";
import { bloodGroupOptions } from "../../../constans/global";
import { semesterOptions } from "../../../constans/semester";
import { Controller, FieldValues } from "react-hook-form";
import PhDatePicker from "../../../components/form/PhDatePicker";

const UpdateStudent = () => {

  const { studentId } = useParams();
  const { data: student, error, isLoading } = useGetStudentByIdQuery(studentId);
  console.log(student);

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
  const { email, name } = student;
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <PhForm
            onsubmit={onSubmit}
            // resolver={zodResolver(createStudentSchema)}
          >
            <Divider>Personal Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput type="text" name="name.lastName" label="Last Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Input type="text" name="gender" defaultValue={student?.gender}  />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhDatePicker name="dateOfBirth" label="Date of birth" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhSelect
                  options={bloodGroupOptions}
                  name="bloodGroup"
                  label="Blood group"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Picture">
                      <Input
                        type="file"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Divider>Contact Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput type="text" name="email" label="Email" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput type="text" name="contactNo" label="Contact" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="emergencyContactNo"
                  label="Emergency Contact"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="presentAddress"
                  label="Present Address"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="permanentAddress"
                  label="Permanent Address"
                />
              </Col>
            </Row>
            <Divider>Guardian</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father ContactNo"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother ContactNo"
                />
              </Col>
            </Row>
            <Divider>Local Guardian</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput type="text" name="localGuardian.name" label="Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="localGuardian.occupation"
                  label="Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="localGuardian.contactNo"
                  label="Contact No."
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhInput
                  type="text"
                  name="localGuardian.address"
                  label="Address"
                />
              </Col>
            </Row>
            <Divider>Academic Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PhSelect
                  options={semesterOptions}
                  // disabled={sIsLoading}
                  name="admissionSemester"
                  label="Admission Semester"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                {/* <PhSelect
                  // options={departmentOptions}
                  // disabled={dIsLoading}
                  name="academicDepartment"
                  label="Admission Department"
                /> */}
              </Col>
            </Row>

            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateStudent;
