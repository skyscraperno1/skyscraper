import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowRoundForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { MenuIcon } from './menu-icon';
import { arrowVariants, ContactButton } from './animations';
import { Contact } from './contact-me';
import { LogoRolodex } from './logo-rolodex';
import { DragClosePanel } from './popover';
import { ScrollProgress } from '../scroll-progress';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[80px] z-50 px-40">
        <ScrollProgress
          className='absolute top-0 h-1 bg-[linear-gradient(to_right,rgba(255,255,255,0),#4f46e5,#6366f1)]'
          springOptions={{
            stiffness: 280,
            damping: 18,
            mass: 0.3,
          }}
        />
        <div className="mx-auto h-full flex items-center justify-between px-6">
          <div onClick={() => {
            window.open('https://github.com/skyscraperno1')
          }}>
            <LogoRolodex
              items={[
                <button key={1} className="bg-white text-black rounded-full p-2">
                  <SiGithub size={32} />
                </button>,
                <button key={2} className="bg-white text-black rounded-full p-2">
                  <SiGithub size={32} />
                </button>,
              ]}
            />
          </div>
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
              onClick={() => setIsContactOpen(true)}
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
                <IoMdArrowRoundForward color='#6366f1' size={20} />
              </motion.span>
            </ContactButton>
          </div>
        </div>
      </header>

      <DragClosePanel
        type="drawer"
        open={isMenuOpen}
        setOpen={setIsMenuOpen}
        size="85vh"
      >
        <Contact onClose={() => setIsMenuOpen(false)} />
      </DragClosePanel>

      <DragClosePanel
        open={isContactOpen}
        setOpen={setIsContactOpen}
        size='50vw'
      >
        123
      </DragClosePanel>
    </>
  );
};