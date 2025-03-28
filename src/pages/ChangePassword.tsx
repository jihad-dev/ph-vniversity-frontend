import { Button, Row } from "antd";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FieldValues) => {
    const res = await changePassword(data);
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    } 
   
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onsubmit={onSubmit}>
        <PhInput type="text" name="oldPassword" label="Old Password" />
        <PhInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">submit</Button>
      </PhForm>
    </Row>
  );
};

export default ChangePassword;
