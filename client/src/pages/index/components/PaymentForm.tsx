import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentFormValues } from "@/shared/schemas/payment/payment.schema";
import { useCreateIntentMutation } from "../mutations/create-intent.mutation";

import type { BookingOrder } from "@tovo/database";
import type { PaymentIntent } from "@stripe/stripe-js";

interface PaymentFormProps {
  bookingId: BookingOrder['id'];
  amount: BookingOrder['price'];
  customerEmail: BookingOrder['email'];
  onSuccess: (paymentIntent: PaymentIntent) => void;
  onError: (error: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  bookingId,
  amount,
  customerEmail,
  onSuccess,
  onError,
}) => {
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    mode: "onBlur",
  });

  const createIntentMutation = useCreateIntentMutation();

  const onSubmit = async (reqData: PaymentFormValues) => {
    setPaymentStatus("Creating payment intent...");

    try {
      // Step 1: Create payment intent
      const { data } = await createIntentMutation.mutateAsync({
        bookingId,
        amount,
        currency: "nok",
        customerEmail,
      });

      const { clientSecret, paymentIntentId } = data;
      setPaymentStatus("Processing payment...");

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock outcomes
      if (reqData.cardNumber === "4242424242424242") {
        const mockPaymentIntent = {
          id: paymentIntentId,
          status: "succeeded",
          amount: amount * 100,
          currency: "nok",
        } as unknown as PaymentIntent;

        onSuccess(mockPaymentIntent);

        setPaymentStatus("Payment successful!");
      } else if (reqData.cardNumber === "4000000000000002") {
        throw new Error("Your card was declined");
      } else {
        const mockPaymentIntent = {
          id: paymentIntentId,
          status: "succeeded",
          amount: amount * 100,
          currency: "nok",
        } as unknown as PaymentIntent;
        onSuccess(mockPaymentIntent);
        setPaymentStatus("Payment successful!");
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : "Unknown error");
      setPaymentStatus("Payment failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Complete Payment
        </h2>
        <p className="text-gray-600">Amount: {amount.toFixed(2)} NOK</p>
        <p className="text-gray-600">Booking ID: {bookingId}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <input
            type="text"
            placeholder="4242 4242 4242 4242"
            maxLength={16}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("cardNumber")}
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-sm mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* Expiry Date + CVC */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("expiryDate")}
            />
            {errors.expiryDate && (
              <p className="text-red-600 text-sm mt-1">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              maxLength={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("cvc")}
            />
            {errors.cvc && (
              <p className="text-red-600 text-sm mt-1">{errors.cvc.message}</p>
            )}
          </div>
        </div>

        {paymentStatus && (
          <div
            className={`mt-4 p-3 rounded-md ${
              paymentStatus.includes("successful")
                ? "bg-green-100 text-green-700"
                : paymentStatus.includes("failed")
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {paymentStatus}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 py-3 px-4 rounded-md font-medium ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Processing..." : `Pay ${amount.toFixed(2)} NOK`}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Test card numbers:</p>
        <p>Success: 4242424242424242</p>
        <p>Decline: 4000000000000002</p>
        <p>Use any future expiry date and any 3-digit CVC</p>
      </div>
    </div>
  );
};
