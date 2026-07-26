import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getUser } from "@/api/userApi";

import { setError, setLoading, setUser } from "@/redux/slices/userprofileSlice";



function PersonalInfo() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userProfile.user);
  const loading = useSelector((state) => state.userProfile.loading);
  const error = useSelector((state) => state.userProfile.error);

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

  const handleSave = () => {
    console.log("Updated User :", user);

 

    alert("Profile updated successfully!");
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
      <h2 className="text-3xl font-semibold mb-8">
        Personal Information
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={user.firstName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={user.lastName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          value={user.phone || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Location
        </label>

        <input
          type="text"
          name="location"
          value={user.location || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2">
          Bio
        </label>

        <textarea
          rows="4"
          name="bio"
          value={user.bio || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;