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
      className="relative overflow-hidden  border border-white/10 py-2  "
    >
      {/* Accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand via-violet-500 to-sky-400" />

      <div className="relative pt-3  sm:px-7">
 
        <div className="flex items-start gap-4 pr-14"> 
 
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
              Complete the player's profile with accurate information. 
            </motion.p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}