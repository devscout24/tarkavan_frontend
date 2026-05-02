import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export function EditProfileModal(
  { 
    profileTopInfo, 
    handleEditProfileModdal,
    editProfileModalOpen,
    setEditProfileModalOpen
  }: { 
    profileTopInfo: {
      name: string; 
    }; 
    handleEditProfileModdal: (name: string) => void 
    editProfileModalOpen: boolean
    setEditProfileModalOpen: (open: boolean) => void
  }) {

const [name, setName] = useState("")

useEffect(() => {
  setName(profileTopInfo.name)
}, [profileTopInfo.name])
    
    

  return (
    <Dialog open={editProfileModalOpen} onOpenChange={setEditProfileModalOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent  hover:bg-transparent border border-brand text-brand hover:text-brand     ">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field> 
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-transparent">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() => handleEditProfileModdal(name) } className="cursor-pointer ">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
