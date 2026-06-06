"use client"
import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import OneonOneProgram from "./one-on-one"
import GroupProgram from "./group-program"




const AddProgramPage: React.FC = () => {





  const editId = localStorage.getItem("edit_program_id")
  const [programType, setProgramType] = React.useState<string>("")
  const [tabValue, setTabValue] = React.useState("group");
  React.useEffect(() => {
  if (editId && programType) {
    setTabValue(programType);
  }
}, [editId, programType]); 





  return (
    <div className="mx-auto w-full p-0">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
        <h2 className="mb-2 text-2xl font-semibold">
          {editId ? "Edit Program" : "Add Program"}
        </h2>

        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList>
            <TabsTrigger disabled={Boolean(editId) && programType === "one_one"} value="group" className="data-[state=active]:bg-brand cursor-pointer ">
              Group
            </TabsTrigger>
            <TabsTrigger disabled={Boolean(editId) && programType === "group"} value="one_one" className="data-[state=active]:bg-brand  cursor-pointer ">
              One-on-One
            </TabsTrigger>
          </TabsList>
          <TabsContent value="group" className="mt-4 max-h-[75vh] overflow-y-auto pr-1 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <GroupProgram setProgramType={setProgramType} />
          </TabsContent>
          <TabsContent value="one_one" className="mt-4 max-h-[75vh] overflow-y-auto pr-1 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <OneonOneProgram setProgramType={setProgramType} />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}

export default AddProgramPage
