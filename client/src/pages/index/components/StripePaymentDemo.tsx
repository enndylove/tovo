import { useState } from "react";

import { PaymentForm } from "./PaymentForm";
import { Error } from "@/shared/components/Error";
import { Button } from "@/components/ui/button";

import type { NewBookingOrder } from "@tovo/database";
import type { UseFormReturn } from "react-hook-form";

import { useCanGoBack, useRouter } from "@tanstack/react-router";

interface StripePaymentDemoProps {
  form: UseFormReturn<NewBookingOrder, any, NewBookingOrder>
}

export const StripePaymentDemo: React.FC<StripePaymentDemoProps> = ({
  form
}: StripePaymentDemoProps) => {
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handlePaymentSuccess = (paymentIntent: any) => {
    setPaymentResult(paymentIntent);
    setError("");
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setPaymentResult(null);
  };

  const router = useRouter()
  const canGoBack = useCanGoBack()

  if (paymentResult) {
    return (
      <Error
        status={"200"}
        title={"Booking confirmed!"}
        description="Thank you for using our service"
      >
        {canGoBack ? (
          <Button onClick={() => router.history.back()}
            className="text-primary font-normal py-3 px-5 text-base"
            variant={"ghost"}
          >
            Back
          </Button>
        ) : null}
      </Error>
    );
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Stripe Payment Integration Demo
          </h1>
          <p className="text-gray-600">
            This demo shows how to integrate Stripe payments with your NestJS
            backend
          </p>
        </div>

        <PaymentForm
          bookingId={form.watch("id") ?? 0}
          amount={form.watch("price") ?? 0}
          customerEmail={form.watch("email")}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />

        {error && (
          <div className="mt-4 max-w-md mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};
