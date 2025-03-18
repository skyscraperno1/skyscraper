import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ContactButton = styled(motion.button)`
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 900;
  position: relative;
  color: #ffffffdd;
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    cursor: pointer;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #6366f1;
    transition: transform 0.2s ease;
    z-index: -1;
    border-radius: 24px;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

export const containerVariants = {
  hidden: { 
    y: "100%",
    borderRadius: "30px 30px 0 0"
  },
  visible: {
    y: 0,
    borderRadius: ["30px 30px 0 0", "0px 0px 0 0"],
    transition: {
      y: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
      borderRadius: {
        duration: 0.3,
        delay: 0.6,
        ease: "easeOut"
      },
      staggerChildren: 0.1,
    },
  },
  exit: {
    y: "100%",
    borderRadius: "30px 30px 0 0",
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};


export const arrowVariants = {
  initial: { x: 0 },
  hover: { x: 13 }
}; 