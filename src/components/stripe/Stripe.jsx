// import { getStripeSecret } from "@/services/stripe";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

const Checkout = ({ amount, handlePrint, quoteLoading }) => {
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm handlePrint={handlePrint} quoteLoading={quoteLoading} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;

function CheckoutForm({ quoteLoading }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {quoteLoading ? (
        <div className="flex justify-content-center align-items-center mt-5">
          <Puff height="40" width="40" color="#fff" visible={true} />
        </div>
      ) : (
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          style={{
            marginTop: 20,
          }}
        >
          <span id="button-text">
            {isLoading ? (
              <Puff height="20" width="20" color="#000" visible={true} />
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      )}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
