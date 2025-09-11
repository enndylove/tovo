import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { DefaultSelectionStepProps } from "../types";

import { StepTitle } from "../ui/StepTitle";
import { GuestOption } from "../ui/GuestOption";
import { PriceDisplay } from "../ui/PriceDisplay";
import { NavigationButtons } from "../ui/NavigationButtons";

import { guestOptions } from "../constants";
import { type GuestFormData, guestSelectionSchema } from "@/shared/schemas/selection/guest.schema";

import { useForm } from "react-hook-form";

export const GuestSelectionStep = ({ bookingData, onNext }: DefaultSelectionStepProps) => {
  const form = useForm({
    resolver: zodResolver(guestSelectionSchema),
    defaultValues: { guests: bookingData.guests },
  });

  const handleNext = (data: GuestFormData) => onNext(data);

  return (
    <Form {...form}>
      <div className="p-4 space-y-4">
        <StepTitle>Select a date</StepTitle>

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 gap-2.5">
                {guestOptions.map((option) => (
                  <GuestOption
                    key={option.value}
                    option={option}
                    isSelected={field.value === option.value || (option.value === 5 && field.value >= 5)}
                    onClick={() => field.onChange(option.value === 5 ? 5 : option.value)}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-8 space-y-4">
          <PriceDisplay
            price="650 NOK"
            description={`${form.watch('guests')} guest${form.watch('guests') !== 1 ? 's' : ''}`}
          />
          <NavigationButtons
            showBack={false}
            onNext={form.handleSubmit(handleNext)}
          />
        </div>
      </div>
    </Form>
  );
};
