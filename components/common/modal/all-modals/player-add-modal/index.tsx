import { useState } from "react";
import CoreIdentity from "./components/core-identity";
import PositionMap from "./components/position-map";
import SeasonStats from "./components/season-stats";
import { Button } from "@/components/ui/button"; 
import { BsArrowRight } from "react-icons/bs"; 
import Strengths from "./components/strengths";
import Biography from "./components/biography";
import Highlights from "./components/highlights";

 

export default function PlayerAddModal() {
   
  const [currentStep, setCurrentStep] = useState(1) 
  const totalSteps = 8

  return (
    <div className="bg-[#090B10]      ">

      {currentStep === 1 ? 
      <CoreIdentity currentStep={currentStep} totalSteps={totalSteps} />
      :
      currentStep === 2 ?
      <PositionMap currentStep={currentStep} totalSteps={totalSteps}/>
      :
      currentStep === 3 ?
      <SeasonStats currentStep={currentStep} totalSteps={totalSteps}/>
      :
      currentStep === 4 ?
      <Strengths currentStep={currentStep} totalSteps={totalSteps}/>
      :
      currentStep === 5 ?
      <Biography currentStep={currentStep} totalSteps={totalSteps}/>
      :
      currentStep === 6 ?
      <Highlights currentStep={currentStep} totalSteps={totalSteps} />
      :
      null
      }

 
      <div className="flex justify-between items-center px-10 pb-10   ">

        {currentStep > 1 && 
        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}   className="text-brand border-brand hover:bg-transparent hover:text-brand    ">Previous</Button> 
         }

        {currentStep < totalSteps &&
        <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === totalSteps} className="bg-brand text-primary px-5 py-2 font-semibold text-base    ">Next <BsArrowRight/> </Button>
      }
      </div> 

    </div>
  )
}