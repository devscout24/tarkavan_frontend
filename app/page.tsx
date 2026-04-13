"use client";

import Footer from "@/components/common/footer";
import Nav from "@/components/common/nav";
import Banner from "@/components/custom/banner"; 
import BrowseCoaches from "@/components/custom/coach"; 
import Counter from "@/components/custom/counter";
import Ecosystem from "@/components/custom/ecosystem"; 
import HowGoEliteWorks from "@/components/custom/how-to";
import StartJourney from "@/components/custom/journy";
import ToComplite from "@/components/custom/to-complite";
import AthletesAndCoaches from "@/components/custom/trusted";
 

 
 

export default function Page() { 

 

  return (
    <>
     <Nav/>
     
     <Banner/>
     
     <Counter/>
     
     <Ecosystem/>

     <HowGoEliteWorks/>

     <ToComplite/>

     <BrowseCoaches/>

     <AthletesAndCoaches/>

     <StartJourney/>

     <Footer/>

    </>
 
  );
}