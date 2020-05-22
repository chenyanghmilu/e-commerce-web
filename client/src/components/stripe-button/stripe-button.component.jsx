import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_LNTjkE3w5eKprEcIOterrNQQ00Wwy7Gugv";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((respose) => {
        alert("payment is successful");
      })
      .catch((error) => {
        console.log("payment error:", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please sure you use the provided credit cart"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="YC Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
