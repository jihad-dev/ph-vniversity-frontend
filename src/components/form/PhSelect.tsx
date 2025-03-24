import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PhSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

const PhSelect = ({ label, name, options, disabled }: PhSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            size="large"
            options={options}
            disabled={disabled}
          />
          {error && <p style={{ color: "red" }}>{error?.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default PhSelect;
