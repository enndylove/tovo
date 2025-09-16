import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useFormContext } from "react-hook-form";

interface FormType {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormInputProps {
  form?: UseFormReturn<FormType>; // optional now
  name: keyof FormType;
  label: string;
  placeholder: string;
  type?: string;
}

export const FormInput = ({ form, name, label, placeholder, type = "text" }: FormInputProps) => {
  const formContext = useFormContext<FormType>();
  const actualForm = form ?? formContext;

  if (!actualForm) {
    throw new Error("FormInput must be used inside a FormProvider or receive a form prop");
  }

  return (
    <FormField
      control={actualForm.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="border-gray-200 rounded-lg h-12"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
