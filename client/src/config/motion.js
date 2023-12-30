export const transition = { type: "spring", duration: 0.8 };

export const fadeAnimation = {
    initial: {
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      opacity: 0,
      transition: { ...transition, delay: 0 },
    },
  };
  