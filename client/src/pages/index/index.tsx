import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { GuestSelectionStep } from './components/GuestStep';
import { DateSelectionStep } from './components/DateStep';
import { TimeSelectionStep } from './components/TimeStep';
import { DetailsStep } from './components/DetailsStep';
import { PayStep } from './components/PayStep';

import { dates } from './constants';

import { useCreateOrderMutation } from './mutations/create-order.mutation';

import type { NewBookingOrder } from '@tovo/database';

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


  const onSuccess = () => {
    window.location.reload()
  }

  const createOrderMutation = useCreateOrderMutation({ form, onSuccess })

  const goNext = () => setCurrentStep(prev => prev + 1);
  const goBack = () => setCurrentStep(prev => prev - 1);


  const onSubmit = (data: NewBookingOrder) => {
    createOrderMutation.mutate(data)
  };

  const steps = [
    <GuestSelectionStep key="guests" onNext={goNext} />,
    <DateSelectionStep key="date" onNext={goNext} onBack={goBack} />,
    <TimeSelectionStep key="time" onNext={goNext} onBack={goBack} />,
    <DetailsStep key="details" onNext={goNext} onBack={goBack} />,
    <PayStep key="pay" onBack={goBack} />,
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {steps[currentStep]}
      </form>
    </FormProvider>
  );
}
