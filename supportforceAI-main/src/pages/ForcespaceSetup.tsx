// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Logo } from '../components/Logo';
// import { Check } from 'lucide-react';

// export const ForcespaceSetup: React.FC = () => {
//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: '',
//     workspaceName: '',
//     workspaceUrl: ''
//   });
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate('/dashboard');
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="mb-8">
//           <Logo />
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-8">
//           <div className="space-y-2 mb-6">
//             <div className="flex items-center gap-2 text-gray-600 mb-4">
//               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
//                 <Check className="w-4 h-4" />
//               </span>
//               <span className="font-medium">AccountSetup</span>
//               <span className="flex-1 border-t border-gray-200"></span>
//               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">2</span>
//               <span className="font-medium">Forcespace</span>
//             </div>
//             <h1 className="text-2xl font-semibold text-gray-900">Set up your Forcespace</h1>
//             <p className="text-gray-600">Create your password and workspace to get started.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Create password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="8+ characters"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Confirm password"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700 mb-1">
//                 Workspace name
//               </label>
//               <input
//                 type="text"
//                 id="workspaceName"
//                 name="workspaceName"
//                 value={formData.workspaceName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Your company name"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="workspaceUrl" className="block text-sm font-medium text-gray-700 mb-1">
//                 Workspace URL
//               </label>
//               <div className="flex items-center">
//                 <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
//                   supportforce.com/
//                 </span>
//                 <input
//                   type="text"
//                   id="workspaceUrl"
//                   name="workspaceUrl"
//                   value={formData.workspaceUrl}
//                   onChange={handleChange}
//                   className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="your-company"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
//             >
//               Create Workspace
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Check } from "lucide-react";

const API_URL = "http://localhost:5000/api/users/register"; // Adjust as per backend

export const ForcespaceSetup: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    workspaceName: "",
    workspaceUrl: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    workspaceUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password must be at least 8 characters
  const validatePassword = (password: string) => password.length >= 8;

  // Workspace URL can only have letters, numbers, and hyphens
  const validateWorkspaceUrl = (url: string) => /^[a-zA-Z0-9-]+$/.test(url);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           password: formData.password,
//           workspaceName: formData.workspaceName,
//           workspaceUrl: formData.workspaceUrl,
//         }),
//       });
  
//       // Handle non-JSON responses gracefully
//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         throw new Error("Invalid JSON response from server: " + text);
//       }
  
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to register");
//       }
  
//       alert(data.message || "Workspace created successfully!");
//       navigate("/dashboard");
//     } catch (error: any) {
//       console.error("Error:", error);
//       alert(error.message || "Error connecting to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = {
      password: "",
      confirmPassword: "",
      workspaceUrl: "",
    };

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!validateWorkspaceUrl(formData.workspaceUrl)) {
      newErrors.workspaceUrl = "Workspace URL can only contain letters, numbers, and hyphens.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from server: " + text);
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      alert(data.message || "Workspace created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                <Check className="w-4 h-4" />
              </span>
              <span className="font-medium">Account Setup</span>
              <span className="flex-1 border-t border-gray-200"></span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                2
              </span>
              <span className="font-medium">Forcespace</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Set up your Forcespace
            </h1>
            <p className="text-gray-600">
              Create your password and workspace to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Create password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="8+ characters"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Confirm password"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label
                htmlFor="workspaceName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Workspace name
              </label>
              <input
                type="text"
                id="workspaceName"
                name="workspaceName"
                value={formData.workspaceName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Your company name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="workspaceUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Workspace URL
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                  supportforce.com/
                </span>
                <input
                  type="text"
                  id="workspaceUrl"
                  name="workspaceUrl"
                  value={formData.workspaceUrl}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg"
                  placeholder="your-company"
                  required
                />
              </div>
              {errors.workspaceUrl && <p className="text-red-500 text-sm">{errors.workspaceUrl}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Workspace"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};






