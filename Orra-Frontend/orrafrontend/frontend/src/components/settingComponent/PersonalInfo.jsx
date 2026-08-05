import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateUserProfile, uploadAvatar } from "@/api/userApi";

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
import LazyImage from "../common/LazyImage";

const API_BASE_URL = import.meta.env.VITE_SPRINGBOOT_API_URL;

const getAvatarSrc = (avatarPath) => {
  if (!avatarPath) return null;
  // If backend ever returns a full URL, don't double-prefix it
  if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
    return avatarPath;
  }
  return `${API_BASE_URL}${avatarPath}`;
};

function PersonalInfo() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userProfile.user);
  const loading = useSelector((state) => state.userProfile.loading);
  const error = useSelector((state) => state.userProfile.error);

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fileInputRef = useRef(null);

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
      })
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
      dispatch(setError(err.message));

      alert("Failed to update profile");
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await uploadAvatar(formData);

      dispatch(setUser(response.data));
      setAvatarPreview(null);
    } catch (err) {
      console.error("Avatar upload failed:", err);
      dispatch(setError(err.message));
      setAvatarPreview(null);
    } finally {
      setUploading(false);
      e.target.value = "";
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
        <h2 className="text-2xl font-bold mb-8">
          Personal Information
        </h2>

        {/* Profile Photo */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
            {avatarPreview || user.avatar ? (
              <LazyImage
                src={avatarPreview || getAvatarSrc(user.avatar)}
                alt="Profile"
                className={`h-full w-full object-cover ${uploading ? "opacity-60" : ""}`}
              />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">
                {(user.firstName?.[0] || "") +
                  (user.lastName?.[0] || "")}
              </span>
            )}

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-indigo-600">
              Profile Photo
            </p>

            <p className="text-sm text-muted-foreground mb-2">
              Upload a professional photo to build trust.
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleChangePhotoClick}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Change Photo"}
            </Button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* First Name / Last Name */}
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

        {/* Email */}
        <div className="mb-4">
          <Label className="mb-2 block">
            Email Address
          </Label>

          <div className="flex gap-2">
            <Input
              disabled={!isEditing}
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="flex-1"
            />

            <Button
              type="button"
              variant="outline"
            >
              Verify
            </Button>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <Label className="mb-2 block">
            Phone Number
          </Label>

          <Input
            disabled={!isEditing}
            type="text"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <Label className="mb-2 block">
            Location
          </Label>

          <Input
            disabled={!isEditing}
            type="text"
            name="location"
            value={user.location || ""}
            onChange={handleChange}
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <Label className="mb-2 block">
            Bio
          </Label>

          <textarea
            disabled={!isEditing}
            rows="4"
            name="bio"
            value={user.bio || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Buttons */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 border rounded-lg"
          >
            Edit
          </button>
        )}

        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PersonalInfo;