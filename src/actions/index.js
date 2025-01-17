'use server';
import connectToDB from "@/database"
import User from "@/models/user";
import Joi from "joi";
import { revalidatePath } from "next/cache";

const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(10).max(100).required(),
})
// add new user action
export async function addNewUserActions(formData, pathToRevalidate) {
  const { error, value } = userSchema.validate(formData);
  
  if (error) {
    return {
      success: false,
      message: error.details[0].message,
    }
  }

  await connectToDB();

  try {
    const newlyCreatedUser = await User.create(value)

    if (newlyCreatedUser) {
      revalidatePath(pathToRevalidate)
      return {
        success: true,
        message: 'User added successfully!'
      }
    } else {
      return {
        success: false,
        message: "Some error occured! Please try again",
      };
    }
  } catch(error) {
    console.log(error)
    return {
      success: false,
      message: 'Some error occured! Please try again'
    }
  }
}

// fetch users actions
export async function fetchUsersAction(){
  await connectToDB();

  try {
    const listOfUsers = await User.find({});
    if (listOfUsers) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(listOfUsers)),
      };
    } else {
      return {
        success: false,
        message: 'Some error occured! Please tty again',
      }
    }
  } catch(error){
    console.log(error)
    return {
      success: false,
      message: 'Some error occured! Please try again'
    }
  }
}

// delete a user action
export async function deleteUserAction(currentUserId, pathToRevalidate){
  await connectToDB();

  try {
    const deletedUser = await User.findByIdAndDelete(currentUserId)
    if (deletedUser){
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: 'User deleted successfully',
      }
    } else {
      return {
        success: false,
        messsage: "Not able to perform delete operation! Please try again",
      };
    }
  } catch(error){
    console.log(error);
    return {
      success: false,
      messsage: 'Some error occured! Please try again'
    }
  }
}

// edit a new function
export async function editUserAction(
  currentUserID,
  formData,
  pathToRevalidate
) {
  await connectToDB();

  try {
    const { firstName, lastName, email, address } = formData;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: currentUserID,
      },
      { firstName, email, lastName, address },
      { new: true }
    );
    if (updatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User updated successfully",
      };
    } else {
      return {
        success: false,
        message: "Not able to update the user! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occured! Please try again",
    };
  }
}