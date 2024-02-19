import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { getStripeSecret } from "../../store/reducers/strpe";
import { useDispatch } from "react-redux";

const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

const Checkout = ({ amount, handlePrint, quoteLoading }) => {
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    dispatch(getStripeSecret(amount)).then((res) => {
      setClientSecret(res.payload.clientSecret);
    });
  }, [amount]);

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

function CheckoutForm({ quoteLoading, handlePrint }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      return setIsLoading(false);
    }

    await handlePrint();
    return setIsLoading(false);
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
