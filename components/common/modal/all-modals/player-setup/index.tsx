"use client";

import { motion } from "framer-motion";
import PlayerSetupHeader from "./components/player-setup-header";


export default function PLayerSetup() {
  return (
    <div className=" mt-30 overflow-hidden rounded-3xl border border-white/10 bg-[#090B10] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
       
       <PlayerSetupHeader/>
 
 
    </div>
  );
}