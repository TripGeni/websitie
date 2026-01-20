"use client";
import React from "react";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";

const CustomButton = ({
  label,
  disabled = false,
  ariaLabel = "",
  buttonStyle = "",
  labelStyle = "",
  buttonColor = "",
  onClick,
  loading = false,
}: {
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
  buttonStyle?: string;
  labelStyle?: string;
  buttonColor?: string;
  onClick?: () => void;
  loading?: boolean;
}) => {
  return (
    <motion.button
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative rounded-full p-1 bg-gradient-to-b from-[#9933CC] to-[#1140A4] cursor-pointer 
        overflow-hidden shadow-custom-purple ${
          disabled || loading ? "opacity-50 cursor-not-allowed" : ""
        } ${buttonStyle}`}
      aria-label={ariaLabel || label}
    >
      <div
        className={`px-6 py-3 rounded-[calc(3rem-1px)] relative z-10 flex justify-center items-center transition-colors ${
          loading ? "bg-white" : "bg-gray-950"
        } ${buttonColor}`}
      >
        <span className={`${labelStyle} ${loading ? "opacity-0" : ""}`}>
          {label}
        </span>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <MoonLoader size={16} color="#6B7280" />{" "}
          </div>
        )}
      </div>

      {/* Animated glow effect on hover */}
      {!disabled && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%]"
          animate={{
            translateX: ["100%", "-100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.button>
  );
};

export default CustomButton;
