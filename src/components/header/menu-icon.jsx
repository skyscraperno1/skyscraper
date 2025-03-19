import { motion } from 'framer-motion';
import { useState } from 'react';

export const MenuIcon = ({
  color = '#fff',
  isOpen,
  setIsOpen
}) => {
  const pathLength = 16;
  const [isHover, setIsHover] = useState(false);

  const topLineVariants = {
    open: {
      rotate: 45,
      y: 4,
      strokeDasharray: pathLength,
      strokeDashoffset: 0,
      transition: {
        strokeDashoffset: { duration: 0.2 },
        rotate: { duration: 0.2 },
        y: { duration: 0.1 }
      }
    },
    closed: {
      rotate: 0,
      y: 0,
      strokeDasharray: `${pathLength}, 6`,
      strokeDashoffset: 8,
      transition: { duration: 0.2 }
    },
    hover: {
      strokeDashoffset: 0,
      transition: { duration: 0.2 }
    }
  };

  const bottomLineVariants = {
    open: {
      rotate: -45,
      y: -4,
      strokeDasharray: 8,
      strokeDashoffset: 4,
      transition: {
        strokeDashoffset: { duration: 0.2 },
        rotate: { duration: 0.2 },
        y: { duration: 0.1 }
      }
    },
    closed: {
      rotate: 0,
      y: 0,
      strokeDasharray: pathLength - 2,
      strokeDashoffset: 0,
      transition: { duration: 0.2 }
    },
    hover: {
      rotate: isOpen ? -45 : 0,
      y: isOpen ? -4 : 0,
      strokeDashoffset: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      onClick={() => setIsOpen(!isOpen)}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <motion.path
        d="M5 8h16"
        variants={topLineVariants}
        animate={isOpen ? "open" : isHover ? "hover" : "closed"}
        initial="closed"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <motion.path
        d="M5 16h16"
        variants={bottomLineVariants}
        animate={!isOpen ? "closed" : isHover ? "hover" : "open"}
        initial="closed"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </motion.svg>
  )
};
