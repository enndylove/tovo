import { useFormContext } from 'react-hook-form';

import { StepTitle } from "../ui/StepTitle";
import { TimeOption } from "../ui/TimeOption";
import { PriceDisplay } from "../ui/PriceDisplay";
import { NavigationButtons } from "../ui/NavigationButtons";

import { times } from "../constants";
import { format } from "date-fns";

import type { NewBookingOrder } from '@tovo/database';
import type { DefaultSelectionStepProps } from '../types';

export const TimeSelectionStep = ({ onNext, onBack }: DefaultSelectionStepProps) => {
  const { watch, setValue } = useFormContext<NewBookingOrder>();
  const guests = watch('guests');
  const date = watch('date');
  const time = watch('time');

  return (
    <div className="p-4 space-y-4">
      <StepTitle>Select time</StepTitle>

      <div className="grid grid-cols-3 gap-2.5">
        {times.map(timeOption => (
          <TimeOption
            key={timeOption}
            time={timeOption}
            isSelected={time === timeOption}
            onClick={() => setValue('time', timeOption)}
          />
        ))}
      </div>

      <div className="pt-8 space-y-4">
        <PriceDisplay price="650 NOK" total description={`${guests} guest${guests !== 1 ? 's' : ''}, ${time}, ${format(date, 'dd.MM')}`} />
        <NavigationButtons onBack={onBack} onNext={onNext} />
      </div>
    </div>
  );
};
