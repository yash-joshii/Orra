import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateUserProfile } from "@/api/userApi";

import {
  setError,
  setLoading,
  setUser,
  updateUser,
} from "@/redux/slices/userprofileSlice";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No User Found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Personal Information</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">First Name</label>

          <input
            disabled={!isEditing}
            type="text"
            name="firstName"
            value={user.firstName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">Last Name</label>

          <input
            disabled={!isEditing}
            type="text"
            name="lastName"
            value={user.lastName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email Address</label>

        <input
          disabled={!isEditing}
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Phone Number</label>

        <input
          disabled={!isEditing}
          type="text"
          name="phone"
          value={user.phone || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Location</label>

        <input
          disabled={!isEditing}
          type="text"
          name="location"
          value={user.location || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2">Bio</label>

        <textarea
          disabled={!isEditing}
          rows="4"
          name="bio"
          value={user.bio || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

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
      
    </div>
  );
}

export default PersonalInfo;