import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserProfile, uploadAvatar } from "@/api/userApi";
import { setUser, setLoading, setError } from "@/redux/slices/userprofileSlice";
import {
  User,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Settings,
  Camera,
} from "lucide-react";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=e5e7eb&color=555";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const user = useSelector((state) => state.userProfile.user);
  const loading = useSelector((state) => state.userProfile.loading);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getUser();
      dispatch(setUser(response.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(setError(err.message));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
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
      setAvatarPreview(null);
      dispatch(setError(err.message));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleEditProfile = () => {
    navigate("/settings");
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <div className="p-8">No user found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Button onClick={handleEditProfile} className="gap-2 bg-black hover:bg-gray-800">
          <Settings size={16} />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
        {/* LEFT: Profile Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div
              className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer"
              onClick={handleAvatarClick}
            >
              <img
                src={avatarPreview || user.avatar || DEFAULT_AVATAR}
                alt="avatar"
                className={`w-24 h-24 rounded-full object-cover border-4 border-gray-100 ${
                  uploading ? "opacity-60" : ""
                }`}
              />
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
              {uploading && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {user.verified && (
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <h2 className="text-xl font-semibold">
              {user.firstName || user.lastName
                ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                : "—"}
            </h2>
            <p className="text-gray-400 text-sm mb-3">
              {user.username ? `@${user.username}` : ""}
            </p>

            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              {user.roles?.includes("OWNER") && (
                <Badge className="bg-purple-100 text-purple-700">Owner</Badge>
              )}
              {user.roles?.includes("BUYER") && (
                <Badge className="bg-blue-100 text-blue-700">Buyer</Badge>
              )}
              {user.roles?.includes("ADMIN") && (
                <Badge className="bg-red-100 text-red-700">Admin</Badge>
              )}
              <Badge className="bg-green-100 text-green-700">
                {user.status || "Active"}
              </Badge>
            </div>

            <div className="border-t pt-4 mt-2 text-left space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                {user.email || "Not provided"}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                {user.phone || "Not provided"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                Member since {user.memberSince || "—"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: Details */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User size={18} className="text-indigo-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name" value={user.firstName} />
                <Field label="Last Name" value={user.lastName} />
                <div className="md:col-span-2">
                  <Field label="Email Address" value={user.email} />
                </div>
                <Field label="Phone Number" value={user.phone} />
                <Field label="Location" value={user.location} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck size={18} className="text-green-500" />
                  Verification Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Verification Status</p>
                  <Badge className="bg-green-100 text-green-700">
                    {user.verified ? "Verified" : "Not Verified"}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Government ID</p>
                  <p className="text-sm font-medium">{user.govId || "Not submitted"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin size={18} className="text-orange-500" />
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Roles</p>
                  <div className="flex gap-2">
                    {user.roles?.includes("OWNER") && (
                      <Badge className="bg-purple-100 text-purple-700">Owner</Badge>
                    )}
                    {user.roles?.includes("BUYER") && (
                      <Badge className="bg-blue-100 text-blue-700">Buyer</Badge>
                    )}
                    {user.roles?.includes("ADMIN") && (
                      <Badge className="bg-red-100 text-red-700">Admin</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Account Created</p>
                  <p className="text-sm font-medium">{user.accountCreated || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Last Updated</p>
                  <p className="text-sm font-medium">{user.lastUpdated || "—"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div>
    <label className="block text-xs text-gray-400 mb-1">{label}</label>
    <input
      type="text"
      value={value || ""}
      placeholder="Not provided"
      readOnly
      className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 text-gray-700 cursor-text"
    />
  </div>
);

export default ProfilePage;