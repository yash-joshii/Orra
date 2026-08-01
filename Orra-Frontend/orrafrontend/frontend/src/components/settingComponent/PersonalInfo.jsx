import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateUserProfile } from "@/api/userApi";

import {
  setError,
  setLoading,
  setUser,
  updateUser,
} from "@/redux/slices/userprofileSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function PersonalInfo() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userProfile.user);
  const loading = useSelector((state) => state.userProfile.loading);
  const error = useSelector((state) => state.userProfile.error);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      dispatch(setLoading(true));

      const response = await getUser();

      dispatch(setUser(response.data));

      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(setError(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      updateUser({
        [name]: value,
      }),
    );
  };

  const handleSave = async () => {
    try {
      dispatch(setLoading(true));

      const response = await updateUserProfile(user);

      dispatch(setUser(response.data));

      dispatch(setLoading(false));

      alert("Profile updated successfully!");

      setIsEditing(false);
    } catch (err) {
      dispatch(setLoading(false));

      dispatch(setError(error.message));

      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Card className="max-w-2xl">
        <CardContent className="p-8">
          <Skeleton className="h-8 w-56 mb-8" />

          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-8 w-28 mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="space-y-2 mb-6">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-11 w-36" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No User Found</div>;
  }

  return (
    <Card className="w-[64%]">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-8">Personal Information</h2>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">
                {(user.firstName?.[0] || "") + (user.lastName?.[0] || "")}
              </span>
            )}
          </div>

          <div>
            <p className="font-semibold text-indigo-600">Profile Photo</p>
            <p className="text-sm text-muted-foreground mb-2">
              Upload a professional photo to build trust.
            </p>
            <Button type="button" variant="outline" size="sm">
              Change Photo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="mb-2 block">First Name</Label>
            <Input
              disabled={!isEditing}
              type="text"
              name="firstName"
              value={user.firstName || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="mb-2 block">Last Name</Label>
            <Input
              disabled={!isEditing}
              type="text"
              name="lastName"
              value={user.lastName || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <Label className="mb-2 block">Email Address</Label>
          <div className="flex gap-2">
            <Input
              disabled={!isEditing}
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="flex-1"
            />
            <Button type="button" variant="outline">
              Verify
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Label className="mb-2 block">Phone Number</Label>
          <Input
            disabled={!isEditing}
            type="text"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <Label className="mb-2 block">Location</Label>
          <Input
            disabled={!isEditing}
            type="text"
            name="location"
            value={user.location || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3">
          {!isEditing ? (
            <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Save Changes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonalInfo;