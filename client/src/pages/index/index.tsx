import { useState } from 'react';

import { GuestSelectionStep } from './components/GuestStep';
import { DateSelectionStep } from './components/DateStep';
import { TimeSelectionStep } from './components/TimeStep';
import { DetailsStep } from './components/DetailsStep';

import type { PartialBookingData } from './types';
import { dates } from './constants';
import { PayStep } from './components/PayStep';

export function IndexPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    guests: 1,
    date: dates[0].value,
    time: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleStepData = (data: PartialBookingData) => {
    setBookingData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const goBack = () => setCurrentStep(prev => prev - 1);

  const steps = [
    <GuestSelectionStep
      key="guests"
      bookingData={bookingData}
      onNext={handleStepData}
    />,
    <DateSelectionStep
      key="date"
      bookingData={bookingData}
      onNext={handleStepData}
      onBack={goBack}
    />,
    <TimeSelectionStep
      key="time"
      bookingData={bookingData}
      onNext={handleStepData}
      onBack={goBack}
    />,
    <DetailsStep
      key="details"
      onNext={handleStepData}
      bookingData={bookingData}
      onBack={goBack}
    />,
    <PayStep
      key="pay"
      onNext={() => {}}
      bookingData={bookingData}
      onBack={goBack}
    />
  ];

  return (
    <>
      {steps[currentStep]}
    </>
  );
};
