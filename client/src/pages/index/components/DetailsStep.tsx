import { useFormContext } from 'react-hook-form';

import { Button } from "@/components/ui/button";

import { StepTitle } from "../ui/StepTitle";
import { FormInput } from "../ui/FormInput";

import type { NewBookingOrder } from '@tovo/database';
import type { DefaultSelectionStepProps } from '../types';

export const DetailsStep = ({ onNext, onBack }: DefaultSelectionStepProps) => {
  const { register } = useFormContext<NewBookingOrder>();

  return (
    <div className="p-4 space-y-4">
      <div className="mb-8">
        <StepTitle className="mb-2">Your details</StepTitle>
        <p className="text-[#6A76B6] text-base">Please provide your details below</p>
      </div>

      <div className="space-y-6">
        <FormInput {...register('firstName')} label="First name" placeholder="Name" />
        <FormInput {...register('lastName')} label="Second name" placeholder="Surname" />
        <FormInput {...register('email')} label="E-mail" placeholder="your.email@gmail.com" type="email" />
      </div>

      <div className="pt-8 space-y-4 flex flex-col justify-center items-center">
        <Button type="submit" className="bg-primary text-white px-8 py-3.5 h-fit w-fit text-base" onClick={onNext}>Confirm</Button>
        <Button type="button" variant="ghost" className="w-fit text-primary text-base px-8 py-3.5" onClick={onBack}>Back</Button>
      </div>
    </div>
  );
};
