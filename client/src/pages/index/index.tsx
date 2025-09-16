import { GuestSelectionStep } from './components/GuestStep';
import { DateSelectionStep } from './components/DateStep';
import { TimeSelectionStep } from './components/TimeStep';
import { DetailsStep } from './components/DetailsStep';
import { PayStep } from './components/PayStep';
import { StripePaymentDemo } from './components/StripePaymentDemo';

import { dates } from './constants';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import type { NewBookingOrder } from '@tovo/database';

export function IndexPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<NewBookingOrder>({
    defaultValues: {
      guests: 1,
      date: dates[0].value,
      price: 650,
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
    <DetailsStep key="details" form={form} onNext={goNext} onBack={goBack} />,
    <PayStep key="pay" onNext={goNext} onBack={goBack} />,
    <StripePaymentDemo key="stripe-demo" form={form} />
  ];

  return (
    <FormProvider {...form}>
      {steps[currentStep]}
    </FormProvider>
  );
}
