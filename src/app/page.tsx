"use client";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInputfied";
import CustomToast from "@/components/CustomToast";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, FieldProps } from "formik";
import { sendWaitlistEmail } from "@/api/waitlist";
import { motion, AnimatePresence } from "framer-motion";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (
    values: { email: string },
    {
      resetForm,
    }: {
      resetForm: (nextState?: Partial<{ values: { email: string } }>) => void;
    }
  ) => {
    setError(null);
    setLoading(true);

    try {
      const data = await sendWaitlistEmail(values.email);
      setResponseData(data);
      resetForm();
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen px-4 md:px-4 lg:px-10 xl:px-20 py-10 md:py-16 bg-[url('/bg-image.png')] bg-cover bg-center overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/full-logo-white.svg"
              alt="TripGenie's logo"
              width={180}
              height={38}
              priority
              className="w-[140px] h-[25px] md:w-[250px] md:h-[40px] lg:w-[250px] lg:h-[40px] xl:w-[300px] xl:h-[46px]"
            />
          </motion.div>

          <div className="hidden md:block">
            <CustomButton
              label="Join the waitlist"
              ariaLabel="Join the waitlist"
              labelStyle="font-[600] text-white md:text-[12px] xl:text-[14px]"
              buttonStyle="md:w-auto w-full md:p-[2px] lg:p-[2.5px]"
            />
          </div>
        </div>
      </motion.header>

      {/* Body */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeInUp}
          className="flex justify-center items-center mt-24 md:mt-20 lg:mt-10 xl:mt-16"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/full-logo-colored.svg"
              alt="TripGenie's logo colored"
              width={350}
              height={100}
              className="w-[250px] h-[65px] md:w-[300px] md:h-[58px] lg:w-[300px] lg:h-[68px] xl:w-[370px] xl:h-[94px]"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer}>
          <motion.h1
            variants={fadeInUp}
            className="text-[24px] md:text-[35px] lg:text-[45px] xl:text-[60px] font-[900] text-transparent bg-clip-text bg-gradient-to-t from-[#737373] to-[#ffffff] text-center max-w-[1000px] mx-auto mt-10 leading-[1.3] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]"
          >
            Unlock the magic of AI-powered travel planning
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-[11px] md xl:text-[14px] text-center max-w-[300px] md:max-w-[500px] xl:max-w-[700px] mx-auto mt-4 md:mt-4"
          >
            Say farewell to traditional agents and let our intelligent AI craft
            your perfect trip to London, Paris, New York, and beyond—seamlessly
            covering every detail from transport, accommodation, to activities,
            ensuring a personalized, stress-free, and hassle-free journey.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Email waitlist */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10 md:mt-10 xl:mt-16 md:px-20 px-4 lg:px-[10em] 2xl:px-[26em]"
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailValidationSchema}
          onSubmit={(values, { resetForm }) =>
            handleFormSubmit(values, { resetForm })
          }
        >
          {({ handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 space-x-0">
                <Field name="email">
                  {({ field, form, meta }: FieldProps) => (
                    <CustomInput
                      type="email"
                      placeholder="Enter email"
                      field={field}
                      form={form}
                      meta={meta}
                      inputStyle="bg-gray-700 text-white placeholder-gray-400 px-4 py-3 text-[13px] md:px-4 md:py-3 md:text-[12px] lg:px-4 lg:py-[11px] lg:text-[13px] xl:px-6 xl:py-[16px] xl:text-[16px]"
                      wrapperStyle="flex-1 p-[1.8px] md:p-[2px] lg:p-[2.2px] xl:p-[2.5px]"
                    />
                  )}
                </Field>
                <CustomButton
                  label="Get early access"
                  ariaLabel="Get early access"
                  labelStyle="font-[600] text-black text-[13px] md:text-[12px] lg:text-[13px] xl:text-[16px]"
                  buttonStyle="md:w-auto w-full p-[1.8px] md:p-[2px] md:p-[2.2px] xl:p-[2.5px]"
                  buttonColor="bg-white"
                  loading={loading}
                  onClick={handleSubmit}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CustomToast title="Info" message={errors.email} type="info" />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CustomToast title="Error" message={error} type="error" />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </Formik>

        <AnimatePresence>
          {responseData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CustomToast
                title="Yay! You're on the waitlist🥳"
                message="Check your mail for more information"
                type="success"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Sticky Text at the Bottom */}
      <div className="absolute -bottom-[1em] md:-bottom-[6.1em] lg:-bottom-[9.1em] xl:-bottom-[11.1em] -left-[4em] md:-left-[8em] lg:-left-[12em] xl:-left-[2em] w-full text-center pointer-events-none">
        {/* Gradient Overlay */}
        <div
          className="absolute w-full h-full left-[4em] md:left-[8em] lg:left-[12em] xl:left-[2em]"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
            zIndex: 1,
          }}
        />

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 0.2,
            y: 0,
            x: [-10, 10, -10],
          }}
          transition={{
            opacity: { duration: 2, delay: 0.5 },
            y: { duration: 1.5, delay: 0.5, ease: "easeOut" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-[190px] md:text-[255px] lg:text-[305px] xl:text-[415px] font-black text-transparent relative z-0 select-none"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            lineHeight: "1",
          }}
        >
          TripGenie
        </motion.h2>
      </div>
    </div>
  );
}
