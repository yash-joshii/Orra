

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        Security & Logins
      </h2>

     
      <div className="border rounded-2xl p-6 mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium">
            Password
          </h3>

          <p className="text-gray-500 mt-1">
            Last updated 3 months ago
          </p>
        </div>

        <button className="border px-5 py-2 rounded-lg hover:bg-gray-100">
          Update
        </button>
      </div>

      
      <div className="border rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium">
            Two-Factor Authentication
          </h3>

          <p className="text-gray-500 mt-1">
            Protect your account with an extra layer of security.
          </p>
        </div>

        <button className="bg-slate-900 text-white px-5 py-2 rounded-lg">
          Enable
        </button>
      </div>
    </div>
  );
}

export default SecuritySettings;