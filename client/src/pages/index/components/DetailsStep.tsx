import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { StepTitle } from "../ui/StepTitle";
import { FormInput } from "../ui/FormInput";

import { DefaultSelectionStepProps } from "../types";
import { type DetailsFormData, detailsSchema } from "@/shared/schemas/selection/details.schema";

import { useForm } from "react-hook-form";


interface DetailsStepProps extends DefaultSelectionStepProps {
  onSubmit: (data: DetailsFormData) => void;
}

export const DetailsStep = ({ bookingData, onSubmit, onBack }: DetailsStepProps) => {
  const form = useForm({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
    },
  });

  const handleSubmit = (data: DetailsFormData) => {
    // console.log('Final booking data:', { ...bookingData, ...data });
    alert('Booking submitted successfully!');
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <StepTitle className="mb-2">Your details</StepTitle>
          <p className="text-[#6A76B6] text-base">Please provide your details below</p>
        </div>

        <div className="space-y-6">
          <FormInput
            form={form}
            name="firstName"
            label="First name"
            placeholder="Name"
          />

          <FormInput
            form={form}
            name="lastName"
            label="Second name"
            placeholder="Surname"
          />

          <FormInput
            form={form}
            name="email"
            label="E-mail"
            placeholder="your.email@gmail.com"
            type="email"
          />
        </div>

        <div className="pt-8 space-y-4 flex flex-col justify-center items-center">
          <Button
            type="button"
            className="bg-primary text-white px-8 py-3.5 h-fit w-fit text-base"
            onClick={form.handleSubmit(handleSubmit)}
          >
            Confirm
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-fit text-primary text-base px-8 py-3.5"
            onClick={onBack}
          >
            Back
          </Button>
        </div>
      </div>
    </Form>
  );
};
