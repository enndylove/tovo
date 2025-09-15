import { useFormContext } from 'react-hook-form';

import { StepTitle } from "../ui/StepTitle";
import { GuestOption } from "../ui/GuestOption";
import { PriceDisplay } from "../ui/PriceDisplay";
import { NavigationButtons } from "../ui/NavigationButtons";

import { guestOptions } from "../constants";

import type { NewBookingOrder } from '@tovo/database';
import type { DefaultSelectionStepProps } from '../types';

export const GuestSelectionStep = ({ onNext }: DefaultSelectionStepProps) => {
  const { watch, setValue } = useFormContext<NewBookingOrder>();
  const guests = watch('guests');

  return (
    <div className="p-4 space-y-4">
      <StepTitle>Select guests</StepTitle>
      <div className="grid grid-cols-3 gap-2.5">
        {guestOptions.map(option => (
          <GuestOption
            key={option.value}
            option={option}
            isSelected={guests === option.value || (option.value === 5 && guests >= 5)}
            onClick={() => setValue('guests', option.value === 5 ? 5 : option.value)}
          />
        ))}
      </div>

      <div className="pt-8 space-y-4">
        <PriceDisplay
          price="650 NOK"
          description={`${guests} guest${guests !== 1 ? 's' : ''}`}
        />
        <NavigationButtons showBack={false} onNext={onNext} />
      </div>
    </div>
  );
};
