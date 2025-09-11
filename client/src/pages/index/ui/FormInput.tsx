import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormType {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormInputRrops {
  form: UseFormReturn<FormType, any, FormType>,
  name: "firstName" | "lastName" | "email",
  label: string,
  placeholder: string,
  type?: string | "text",
}

export const FormInput = ({ form, name, label, placeholder, type }: FormInputRrops) => (
  <FormField
    control={form.control}
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
