import { containerVariants } from "./animations";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

const menuItems = [
  { title: "Home", href: "#home", imgSrc: '/src/assets/imgs/avatar.jpg', subheading: '主页' },
  { title: "Skills", href: "#skills", imgSrc: '/src/assets/imgs/avatar.jpg', subheading: '技能' },
  { title: "Experience", href: "#experiences", imgSrc: '/src/assets/imgs/avatar.jpg', subheading: '经历' },
  { title: "Projects", href: "#projects", imgSrc: '/src/assets/imgs/avatar.jpg', subheading: '作品' },
];

const Link = ({ heading, imgSrc, subheading, href, onClose }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleClick = (e) => {
    e.preventDefault();
    onClose(); // 先关闭弹窗

    // 等动画结束后滚动到对应区域
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="w-1/2 group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};

export const Contact = ({ onClose }) => {
  return (
    <motion.div
      className="h-full flex flex-col items-center justify-center gap-8 w-full"
      variants={containerVariants}
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          heading={item.title}
          subheading={item.subheading}
          imgSrc={item.imgSrc}
          href={item.href}
          onClose={onClose}
          className="text-6xl font-bold text-white cursor-pointer hover:text-[#6366f1]"
        />
      ))}
    </motion.div>
  );
};