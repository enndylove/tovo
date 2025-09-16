export type BookingDataType = {
  guests: number;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type PartialBookingData = Partial<BookingDataType>;

export interface DefaultSelectionStepProps {
  onNext: () => void; // required
  onBack?: () => void;
}
