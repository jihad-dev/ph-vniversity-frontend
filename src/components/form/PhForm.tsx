
import { FormProvider, useForm, Resolver } from "react-hook-form";
import { ReactNode } from "react";
import { Form } from "antd";

interface PhFormProps {
  onsubmit: (data: any) => void;
  children: ReactNode;
  resolver?: Resolver<any>; // Add resolver to props
}

const PhForm = ({ onsubmit, children, resolver }: PhFormProps) => {
  const methods = useForm({ resolver }); // Pass resolver to useForm
  const submit = (data: any) => {
    onsubmit(data);
    methods.reset();
  }

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PhForm;
