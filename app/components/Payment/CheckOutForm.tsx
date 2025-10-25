
import { styles } from "@/app/styles/styles";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = SocketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
  refetch?: any;
};

const CheckOutForm = ({  data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(true);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      toast.error(stripeError.message || "Payment failed");
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });

      toast.success("Payment successful!");
    }
  }; 

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      redirect(`/course-access/${data.id}`);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Order creation failed");
      } else {
        toast.error("Order creation failed");
      }
    }
  }, [orderData, error]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[500px] overflow-y-auto px-2"
    >
      <LinkAuthenticationElement id="link-authentication-element" />

      <PaymentElement id="payment-element" className="min-h-[60px]" />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full h-[45px]"
      >
        <span id="button-text" className={`${styles.button} mt-2 !h-[45px]`}>
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
    </form>
  );
};

export default CheckOutForm;
