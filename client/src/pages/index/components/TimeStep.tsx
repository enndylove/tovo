import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { StepTitle } from "../ui/StepTitle";
import { TimeOption } from "../ui/TimeOption";
import { PriceDisplay } from "../ui/PriceDisplay";
import { NavigationButtons } from "../ui/NavigationButtons";

import type { DefaultSelectionStepProps } from "../types";
import { type TimeFormData, timeSelectionSchema } from "@/shared/schemas/selection/time.schema";
import { times } from "../constants";
import { format } from "date-fns";


import { useForm } from "react-hook-form";

export const TimeSelectionStep = ({ bookingData, onNext, onBack }: DefaultSelectionStepProps) => {
  const form = useForm({
    resolver: zodResolver(timeSelectionSchema),
    defaultValues: { time: bookingData.time },
  });

  const handleNext = (data: TimeFormData) => onNext(data);

  const formatGuest = `${bookingData.guests} guest${bookingData.guests !== 1 ? 's' : ''}`
  const formatDate = format(bookingData.date, "dd.MM")


  return (
    <Form {...form}>
      <div className="p-4 space-y-4">
        <StepTitle>Select time</StepTitle>

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 gap-2.5">
                {times.map((timeOption) => (
                  <TimeOption
                    key={timeOption}
                    time={timeOption}
                    isSelected={field.value === timeOption}
                    onClick={() => field.onChange(timeOption)}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-8 space-y-4">
          <PriceDisplay
            total
            price="650 NOK"
            description={`${formatGuest}, ${form.watch('time')}, ${formatDate}`}
          />
          <NavigationButtons
            onBack={onBack}
            onNext={form.handleSubmit(handleNext)}
          />
        </div>
      </div>
    </Form>
  );
};
