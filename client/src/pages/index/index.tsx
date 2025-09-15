import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { GuestSelectionStep } from './components/GuestStep';
import { DateSelectionStep } from './components/DateStep';
import { TimeSelectionStep } from './components/TimeStep';
import { DetailsStep } from './components/DetailsStep';
import { PayStep } from './components/PayStep';

import type { NewBookingOrder } from '@tovo/database';
import { dates } from './constants';

export function IndexPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<NewBookingOrder>({
    defaultValues: {
      guests: 1,
      date: dates[0].value,
      time: '',
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const goNext = () => setCurrentStep(prev => prev + 1);
  const goBack = () => setCurrentStep(prev => prev - 1);

  const steps = [
    <GuestSelectionStep key="guests" onNext={goNext} />,
    <DateSelectionStep key="date" onNext={goNext} onBack={goBack} />,
    <TimeSelectionStep key="time" onNext={goNext} onBack={goBack} />,
    <DetailsStep key="details" onNext={goNext} onBack={goBack} />,
    <PayStep key="pay" onBack={goBack} />,
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(goNext)}>
        {steps[currentStep]}
      </form>
    </FormProvider>
  );
}
