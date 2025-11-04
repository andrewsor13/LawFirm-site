import { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      when: "beforeChildren",
      staggerChildren: 0.1, // Delay între copii
    },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.2, // Delay personalizat per copil (dacă vrei)
    },
  }),
};
export { container, child };
