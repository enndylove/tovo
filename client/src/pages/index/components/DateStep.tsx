import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import type { DefaultSelectionStepProps } from "../types";

import { StepTitle } from "../ui/StepTitle";
import { DateOption } from "../ui/DateOption";
import { PriceDisplay } from "../ui/PriceDisplay";
import { NavigationButtons } from "../ui/NavigationButtons";

import { type DateFormData, dateSelectionSchema } from "@/shared/schemas/selection/date.schema";
import { dates } from "../constants";
import { format } from "date-fns";

import { useForm } from "react-hook-form";

export const DateSelectionStep = ({ bookingData, onNext, onBack }: DefaultSelectionStepProps) => {
  const form = useForm({
    resolver: zodResolver(dateSelectionSchema),
    defaultValues: { date: bookingData.date },
  });

  const handleNext = (data: DateFormData) => onNext(data);

  const formatGuest = `${bookingData.guests} guest${bookingData.guests !== 1 ? 's' : ''}`


  return (
    <Form {...form}>
      <div className="p-6 space-y-6">
        <StepTitle>Select a date</StepTitle>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 gap-2.5">
                {dates.map((dateOption) => (
                  <DateOption
                    key={dateOption.value}
                    date={dateOption}
                    isSelected={field.value === dateOption.value}
                    onClick={() => field.onChange(dateOption.value)}
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
            description={`${formatGuest}, ${format(form.watch('date'), "MM.dd")}`}
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
