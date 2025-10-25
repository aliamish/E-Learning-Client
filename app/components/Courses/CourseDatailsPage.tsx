import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Routes/Footer';
import CourseDetails from "./CourseDetails"
import { useTheme } from 'next-themes';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import {loadStripe} from "@stripe/stripe-js"

type Props = {
    id:string;
}

const CourseDatailsPage = ({id}: Props) => {
       const [route, setRoute] = useState("Login");
       const [open, setOpen] = useState(false);
       const {data,isLoading} = useGetCourseDetailsQuery(id);
       const {data: config} = useGetStripePublishableKeyQuery({});
       const [createPaymentIntent,{data:paymentIntentData}] = useCreatePaymentIntentMutation()
       const [stripePromise, setStripePromise] = useState<any>(null);
       const [clientSecret,setClientSecret] = useState('')
       const {theme} = useTheme(); 

       useEffect(() => {
        if(config){
          const publishablekey = config?.publishablekey;
          setStripePromise(loadStripe(publishablekey))
        }
        if(data){
          const amount = Math.round(data.course.price * 100);
          createPaymentIntent(amount)
        }
       }, [config,data]);


useEffect(() => {
  console.log("Config:", config);
  if (config) {
    const publishablekey = config?.publishablekey;
    console.log("Publishable Key:", publishablekey);
    setStripePromise(loadStripe(publishablekey));
  }
  if (data) {
    const amount = Math.round(data.course.price * 100);
    console.log("Creating Payment Intent with amount:", amount);
    createPaymentIntent(amount);
  }
}, [config, data]);

useEffect(() => {
  console.log("Payment Intent Data:", paymentIntentData);
  if (paymentIntentData?.client_secret) {
    setClientSecret(paymentIntentData.client_secret);
  } else {
    console.warn("⚠️ Stripe client_secret missing:", paymentIntentData);
  }
}, [paymentIntentData]);


  return (
    <>
      {
        isLoading ? (
            <Loader/>
        ): (
            <div className={`${theme === "dark" ? "text-white bg-slate-900" : "text-black bg-white"}`}>
                <Heading
                 title={data.course.name + ' - ELearning'}
                 description={
                    "ELearning is a programming community which is developed by ali  for helping programmers"
                 }
                 keywords={data?.course?.tags}
                />
                <Header
                  route={route}
                  setRoute={setRoute}
                  open={open}
                  setOpen={setOpen}
                  activeItem={1}
                />
                {
                  stripePromise && (
                       <CourseDetails data={data.course} stripePromise={stripePromise} clientSecret={clientSecret}  
                     
                  setRoute={setRoute}
                
                  setOpen={setOpen}/>

                  )
                }
                <Footer/>   
            </div>
        )
      }
    </>
  )
}

export default CourseDatailsPage