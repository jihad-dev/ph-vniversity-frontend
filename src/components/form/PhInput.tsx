import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface PhInputProps {
  type: string;
  name: string;
  label?: string;
}

const PhInput = ({ type, name, label }: PhInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
  
      <Controller
        name={name}
        render={({ field ,fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
            {error && <p style={{ color: "red" }}>{error?.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
