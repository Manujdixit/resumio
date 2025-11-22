import { motion } from "motion/react";

export const PrimaryLandingButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
      whileHover={{
        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
    >
      {children}
    </motion.button>
  );
};

export const OutlineLandingButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
      whileHover={{
        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 border-blue-600 border-px text-blue-600 rounded-full font-bold text-lg"
    >
      {children}
    </motion.button>
  );
};
