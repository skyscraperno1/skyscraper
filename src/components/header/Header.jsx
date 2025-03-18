import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowRoundForward } from "react-icons/io";
import { MenuIcon } from './MenuIcon';
import { containerVariants, arrowVariants, ContactButton } from './animations';
import { Contact } from './Contact';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[80px] z-50 px-40">
        <div className="mx-auto h-full flex items-center justify-end px-6">
          <div className="flex items-center gap-12">
            <motion.button 
              className="rounded-full bg-[#6366f1] p-2"
            >
              <MenuIcon 
                isOpen={isMenuOpen} 
                setIsOpen={setIsMenuOpen}
              />
            </motion.button>
            <ContactButton
              initial="initial"
              whileHover="hover"
              className="px-4 py-2 rounded-full flex items-center justify-center gap-1"
            >
              <motion.div 
                className="relative z-10"
                variants={arrowVariants}
                transition={{ duration: 0.3 }}
              >
                Contact
              </motion.div>
              <motion.span
                className="relative z-10 inline-flex items-center"
                variants={arrowVariants}
                transition={{ duration: 0.3 }}
              >
                <IoMdArrowRoundForward color='#6366f1' size={20}/>
              </motion.span>
            </ContactButton>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-40 bg-zinc-900"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};