import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import type { IconType } from "react-icons";

type DropdownItem = {
  text: string;
  icon: IconType;
  onClick?: () => void;
};

const wrapperVariants = {
  open: { scaleY: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
  closed: { scaleY: 0, transition: { when: "afterChildren", staggerChildren: 0.1 } },
};
const iconVariants = { open: { rotate: 180 }, closed: { rotate: 0 } };
const itemVariants = {
  open: { opacity: 1, y: 0, transition: { when: "beforeChildren" } },
  closed: { opacity: 0, y: -15, transition: { when: "afterChildren" } },
};
const actionIconVariants = { open: { scale: 1, y: 0 }, closed: { scale: 0, y: -7 } };

const StaggeredDropDown = ({
  label = "Post actions",
  items,
}: {
  label?: string;
  items: DropdownItem[];
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0, width: 0 });
  const btnRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
 
  useLayoutEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right - window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);
 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={btnRef} className="relative inline-block">
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-black bg-brand hover:bg-brand transition-colors"
      >
        <span className="font-medium text-sm">{label}</span>
        <motion.span animate={open ? "open" : "closed"} variants={iconVariants}>
          <FiChevronDown />
        </motion.span>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <motion.ul
            ref={menuRef}
            animate={open ? "open" : "closed"}
            initial="closed"
            variants={wrapperVariants}
            style={{
              originY: "top",
              position: "absolute",
              top: coords.top,
              right: coords.right,
              minWidth: coords.width,
            }}
            className="flex flex-col gap-1 p-2 rounded-lg bg-white shadow-xl w-48 overflow-hidden z-999"
          >
            {items.map(({ text, icon: Icon, onClick }) => (
              <motion.li
                key={text}
                variants={itemVariants}
                onClick={() => {
                  onClick?.();
                  setOpen(false); 
                }}
                className="flex items-center gap-2 w-full p-2 text-[14px] font-medium whitespace-nowrap rounded-md hover:bg-brand/25 text-secondary hover:text-black transition-colors cursor-pointer"
              >
                <motion.span variants={actionIconVariants}>
                  <Icon />
                </motion.span>
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>,
          document.body
        )}
    </div>
  );
};

export default StaggeredDropDown;