"use client";
import React from "react";
import { FieldProps } from "formik";
import { motion } from "framer-motion";

const CustomInput = ({
  type,
  placeholder,
  field,
  meta,
  disabled = false,
  ariaLabel = "",
  inputStyle = "",
  wrapperStyle = "",
}: FieldProps & {
  type: string;
  placeholder: string;
  disabled?: boolean;
  ariaLabel?: string;
  inputStyle?: string;
  wrapperStyle?: string;
}) => {
  const { error, touched } = meta;

  return (
    <motion.div
      whileFocus={{ scale: 1.01 }}
      className={`p-[3px] rounded-full bg-gradient-to-r from-[#9933CC] to-[#1140A4] w-full transition-shadow duration-300 ${
        touched && error ? "shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "focus-within:shadow-[0_0_15px_rgba(153,51,204,0.5)]"
      } ${wrapperStyle}`}
    >
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full py-3 px-6 rounded-full bg-gray-900 text-white placeholder-gray-500 focus:outline-none
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${inputStyle}`}
        aria-label={ariaLabel || placeholder}
      />
    </motion.div>
  );
};

export default CustomInput;
