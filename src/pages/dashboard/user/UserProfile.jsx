import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";
import avatarImg from "../../../assets/avatar.png";
import { setUser } from "../../../redux/features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isLoading, isError, error, isSuccess }] =
    useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    bio: "",
    profession: "",
    userId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        profileImage: user?.profileImage || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        userId: user?._id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      userId: formData.userId,
    };
    try {
      const response = await editProfile(updatedUser).unwrap();
      dispatch(setUser(response.user));
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg p-8 text-white">
        <div className="flex items-center space-x-6">
          <img
            src={formData?.profileImage || avatarImg}
            alt="User Avatar"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-2">
              {formData?.username || "Username not set"}
            </h3>
            <p className="text-lg">{formData.bio || "Bio not set"}</p>
            <p className="mt-2 italic text-sm">
              Profession: {formData.profession || "Not specified"}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit Your Profile
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData?.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="profileImage"
                >
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData?.profileImage}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData?.bio}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write a short bio"
                  className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="profession"
                >
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData?.profession}
                  onChange={handleChange}
                  placeholder="Enter your profession"
                  className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg font-semibold ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              {isError && (
                <p className="mt-4 text-red-500 text-center">
                  Failed to update profile. Please try again.
                </p>
              )}
              {isSuccess && (
                <p className="mt-4 text-green-500 text-center">
                  Profile updated successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
