import { useFormContext } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { StepTitle } from "../ui/StepTitle";
import { PayInput } from "../ui/PayInput";

import { format } from "date-fns";

import type { NewBookingOrder } from '@tovo/database';

interface PayStepProps {
  onBack: () => void;
}

export const PayStep = ({ onBack }: PayStepProps) => {
  const { watch } = useFormContext<NewBookingOrder>();
  const bookingData = watch();

  return (
    <div className="p-4 space-y-4">
      <div className="mb-17">
        <StepTitle className="mb-4">Booking summary</StepTitle>
        <div className="flex flex-col gap-2">
          <PayInput type="Product">Sauna session (Grimen sauna)</PayInput>
          <PayInput type="Date">{format(bookingData.date, "dd.MM.yyyy")}</PayInput>
          <PayInput type="Time">{bookingData.time}</PayInput>
          <PayInput type="Guests">{bookingData.guests}</PayInput>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full text-center flex flex-col gap-1">
          <h3 className="text-4xl font-bold text-[#454C6A]">650 NOK</h3>
          <p className="text-sm text-[#6069A2]">inkl. MVA</p>
        </div>
        <p className="text-base text-[#6069A2]">Choose how you’d like to pay for your booking</p>
        <Button className="w-full py-3 flex items-center gap-4 font-normal text-base text-[#454C6A]" variant="outline">
          <img className="object-contain h-2.5" src="/stripe.png" />
          Pay now with Stripe
        </Button>

        <Button type="button" variant="ghost" className="w-fit mx-auto text-primary text-base px-8 py-3.5" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};
