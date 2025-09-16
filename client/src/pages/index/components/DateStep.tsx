import { useFormContext } from 'react-hook-form';

import { StepTitle } from "../ui/StepTitle";
import { DateOption } from "../ui/DateOption";
import { PriceDisplay } from "../ui/PriceDisplay";
import { NavigationButtons } from "../ui/NavigationButtons";

import { dates } from "../constants";
import { format } from "date-fns";

import type { NewBookingOrder } from '@tovo/database';
import type { DefaultSelectionStepProps } from '../types';


export const DateSelectionStep = ({ onNext, onBack }: DefaultSelectionStepProps) => {
  const { watch, setValue } = useFormContext<NewBookingOrder>();
  const guests = watch('guests');
  const date = watch('date');

  return (
    <div className="p-4 space-y-4">
      <StepTitle>Select a date</StepTitle>

      <div className="grid grid-cols-3 gap-2.5">
        {dates.map(dateOption => (
          <DateOption
            key={dateOption.value}
            date={dateOption}
            isSelected={date === dateOption.value}
            onClick={() => setValue('date', dateOption.value)}
          />
        ))}
      </div>

      <div className="pt-8 space-y-4">
        <PriceDisplay price="650 NOK" description={`${guests} guest${guests !== 1 ? 's' : ''}, ${format(date, 'dd.MM')}`} />
        <NavigationButtons onBack={onBack} onNext={onNext} />
      </div>
    </div>
  );
};
