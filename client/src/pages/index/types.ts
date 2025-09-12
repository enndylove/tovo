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
  bookingData: BookingDataType;
  onNext: (data: PartialBookingData) => void; // required
  onBack?: () => void;
}
