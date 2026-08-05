import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetCurrentUser } from "@/api/authApi";
import { setUser } from "@/redux/slices/authslices";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await GetCurrentUser();
        dispatch(setUser(res.data));
      } catch (err) {
        // Not logged in / session expired — that's fine, stay logged out.
      } finally {
        setChecked(true);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return children;
};

export default AuthInitializer;