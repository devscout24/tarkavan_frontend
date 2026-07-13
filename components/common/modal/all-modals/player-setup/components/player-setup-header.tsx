"use client";

import { motion } from "framer-motion";
import { UserRound, X } from "lucide-react";

export default function PlayerSetupHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161B22]"
    >
      {/* Accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand via-violet-500 to-sky-400" />

      <div className="relative p-5 sm:p-7">
        {/* Close Button */}
        <motion.button
          whileHover={{
            rotate: 90,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/15"
        >
          <X className="h-5 w-5 text-white/70 hover:text-white" />
        </motion.button>

        <div className="flex items-start gap-4 pr-14">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{
              y: -3,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
            }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-violet-500 shadow-lg shadow-brand/20"
          >
            <UserRound className="h-7 w-7 text-white" />
          </motion.div>

          {/* Content */}
          <div className="min-w-0">
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl font-bold text-white sm:text-3xl"
            >
              Setup Player
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.25 }}
              className="mt-2 max-w-xl text-sm leading-6 text-white/60"
            >
              Complete the player's profile with accurate information. You can
              update everything later at any time.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}