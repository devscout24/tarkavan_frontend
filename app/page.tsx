"use client"

import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"
import Banner from "@/components/custom/banner"
import BrowseCoaches from "@/components/custom/coach"
import Counter from "@/components/custom/counter"
import Ecosystem from "@/components/custom/ecosystem"
import HowGoEliteWorks from "@/components/custom/how-to"
import StartJourney from "@/components/custom/journy"
import ToComplite from "@/components/custom/to-complite"
import AthletesAndCoaches from "@/components/custom/trusted"
import { useEffect, useState } from "react"
import { getLandingPageData } from "./action"
import { THeroData, TLandingPageData } from "@/types/landing.type"

export default function Page() {

  const [allData, setAllData] = useState<TLandingPageData | null>(null)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getLandingPageData()
         
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          setAllData(res.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Nav />

      <Banner data={allData?.hero} />

      <Counter data={allData?.stats} />

      <Ecosystem data={allData?.ecosystem} />

      <HowGoEliteWorks data={allData?.how_it_works} />

      <ToComplite data={allData?.features} />

      <BrowseCoaches />

      <AthletesAndCoaches data={allData?.reviews?.items} />

      <StartJourney />

      <Footer />
    </>
  )
}
