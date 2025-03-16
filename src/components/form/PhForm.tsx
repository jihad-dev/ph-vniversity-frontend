import { FormProvider, useForm } from "react-hook-form";

const PhForm = ({ onsubmit, children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onsubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PhForm;
