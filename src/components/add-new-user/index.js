'use client';
import { addNewUserActions, editUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context";
import { addNewUserFormControls, addNewUserFormInitialState } from "@/utils";
import { useContext, useState } from "react";

function AddNewUser() {
      const {
        currentEditedID,
        setCurrentEditedID,
        openPopup,
        setOpenPopup,
        addNewUserFormData,
        setAddNewUserFormData,
      } = useContext(UserContext);
    function handleSaveButtonValid() {
      return Object.keys(addNewUserFormData).every(
        (key) => addNewUserFormData[key].trim() !== ""
      );
    }

    async function handleAddNewUserAction(){
      const result = currentEditedID !== null ?  await editUserAction(currentEditedID, addNewUserFormData, '/user-management') : addNewUserActions(addNewUserFormData, '/user-management')
      console.log(result)
      setOpenPopup(false)
      setAddNewUserFormData(addNewUserFormInitialState);   
      setCurrentEditedID(null)   
    }


    return (
      <div>
        <Button
          onClick={() => setOpenPopup(true)}
          className="bg-violet-500 hover:bg-violet-600"
        >
          Add New User
        </Button>
        <Dialog
          open={openPopup}
          onOpenChange={() => {
            setOpenPopup(false);
            setAddNewUserFormData(addNewUserFormInitialState);
            setCurrentEditedID(null)
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {currentEditedID !== null ? "Edit User" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <form action={handleAddNewUserAction}>
              {addNewUserFormControls.map((controlItem) => (
                <div className="mb-5" key={controlItem.name}>
                  <Label htmlFor={controlItem.name} className="text-right">
                    {controlItem.label}
                  </Label>
                  <Input
                    id={controlItem.label}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    type={controlItem.type}
                    value={addNewUserFormData[controlItem.name]}
                    onChange={(event) => {
                      setAddNewUserFormData({
                        ...addNewUserFormData,
                        [controlItem.name]: event.target.value,
                      });
                    }}
                    className="font-light outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:shadow-md transition-all focus:shadow-md focus:border-violet-500 focus:ring-offset-0"
                  />
                </div>
              ))}
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!handleSaveButtonValid()}
                  className="bg-violet-500 hover:bg-violet-600 disabled:opacity-55"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default AddNewUser;