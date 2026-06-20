import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || { street: "", city: "", state: "", pincode: "", country: "India" },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.put("/auth/profile", form);
      updateUser(data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="card p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-500">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-gray-800 text-lg">{user?.name}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded mt-1 inline-block ${user?.role === "admin" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"}`}>
            {user?.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <h2 className="font-semibold text-gray-700">Update Information</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Street", key: "street", colSpan: true },
            { label: "City", key: "city" },
            { label: "State", key: "state" },
            { label: "Pincode", key: "pincode" },
          ].map(({ label, key, colSpan }) => (
            <div key={key} className={colSpan ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                className="input-field"
                value={form.address[key]}
                onChange={(e) => setForm({ ...form, address: { ...form.address, [key]: e.target.value } })}
              />
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;