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
			className="cursor-pointer rounded-full bg-blue-600 px-8 py-4 font-bold text-lg text-white transition-all duration-300 hover:bg-blue-700"
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
			className="rounded-full border-blue-600 border-px px-8 py-4 font-bold text-blue-600 text-lg"
		>
			{children}
		</motion.button>
	);
};
