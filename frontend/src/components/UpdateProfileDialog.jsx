import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setinput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phonenumber: user?.phonenumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const dispatch=useDispatch();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
    const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({...input, file});
  };
  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file",input.file);
    }
   try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }


  return (
    <div>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-200 p-6 rounded-xl shadow-lg w-[90vw] max-w-md sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-center text-lg sm:text-xl">Update Profile</DialogTitle>
      </DialogHeader>

      <form onSubmit={submitHandler}>
        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="text-left sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              className="sm:col-span-3 w-full"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="email" className="text-left sm:text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              className="sm:col-span-3 w-full"
            />
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="number" className="text-left sm:text-right">
              Phone number
            </Label>
            <Input
              id="phone number"
              name="phonenumber"
              value={input.phonenumber}
              onChange={changeEventHandler}
              className="sm:col-span-3 w-full"
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="bio" className="text-left sm:text-right">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              className="sm:col-span-3 w-full"
              value={input.bio}
              onChange={changeEventHandler}
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="skills" className="text-left sm:text-right">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              className="sm:col-span-3 w-full"
              value={input.skills}
              onChange={changeEventHandler}
            />
          </div>

          {/* Resume */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="resume" className="text-left sm:text-right">
              Resume
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileHandler}
              className="sm:col-span-3 w-full"
            />
          </div>
        </div>

        <DialogFooter>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full sm:w-[380px] my-5 text-sm bg-fuchsia-800 sm:text-base hover:cursor-pointer"
            >
              Update
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</div>

  );
};
export default UpdateProfileDialog;
