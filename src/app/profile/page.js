"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth.js";

const ProfilePage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  // New: track newly selected files for docs that don't exist yet
  const [docFiles, setDocFiles] = useState({
    nagarita_front: null,
    nagarita_back: null,
    certificate: null,
  });
  const [dragOverKey, setDragOverKey] = useState(null);
  const [savingDocs, setSavingDocs] = useState(false);
  const fileInputRefs = useRef({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/userprofile/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    router.push("/login");
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    setResendSuccess("");

    try {
      const response = await fetch("http://localhost:8000/otp/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp_value: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        setOtpValue("");
        setUserData((prev) => ({ ...prev, is_verified: true }));
        toast.success("Email verified successfully!");
      } else {
        const errorMsg =
          data.detail || data.message || "Invalid OTP. Please try again.";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setOtpError("Network error. Please try again later.");
      toast.error("Network error. Please try again later.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setOtpError("");
    setResendSuccess("");

    try {
      const response = await fetch("http://localhost:8000/otp/resend/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setResendSuccess("A new OTP has been sent to your email.");
        toast.success("A new OTP has been sent to your email.");
      } else {
        const errorMsg =
          data.detail ||
          data.message ||
          "Failed to resend OTP. Please try again.";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      setOtpError("Network error. Please try again later.");
      toast.error("Network error. Please try again later.");
    } finally {
      setResendLoading(false);
    }
  };

  const getRoleName = (roleCode) =>
    roleCode === "t" ? "Technician" : "Customer";

  const getInitials = () => {
    if (!userData) return "U";
    return (
      `${userData.first_name?.charAt(0) || ""}${userData.last_name?.charAt(0) || ""}`.toUpperCase() ||
      "U"
    );
  };

  // ---- Document upload handlers ----
  const handleFileSelect = (key, file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    setDocFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleDrop = (key, e) => {
    e.preventDefault();
    setDragOverKey(null);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(key, file);
  };

  const handleRemoveSelectedFile = (key) => {
    setDocFiles((prev) => ({ ...prev, [key]: null }));
    if (fileInputRefs.current[key]) {
      fileInputRefs.current[key].value = "";
    }
  };

  const hasPendingDocs = Object.values(docFiles).some((f) => f !== null);

  const handleSaveDocuments = async () => {
    if (!hasPendingDocs) return;

    setSavingDocs(true);
    try {
      const formData = new FormData();
      Object.entries(docFiles).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const response = await fetch("http://localhost:8000/profile/update/", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.detail || data.message || `Error: ${response.status}`,
        );
      }

      const updated = await response.json();

      setUserData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...(updated.profile || updated),
        },
      }));
      setDocFiles({
        nagarita_front: null,
        nagarita_back: null,
        certificate: null,
      });
      toast.success("Documents uploaded successfully!");
    } catch (err) {
      console.error("Failed to update documents:", err);
      toast.error(err.message || "Failed to upload documents.");
    } finally {
      setSavingDocs(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#063B00] rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-md text-center">
          <span className="text-5xl mb-4 block">⚠️</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#063B00] hover:bg-[#052f00] text-white font-bold py-2.5 px-6 rounded-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const documentFields = [
    { key: "nagarita_front", label: "Nagarita (Front)", icon: "📄" },
    { key: "nagarita_back", label: "Nagarita (Back)", icon: "📄" },
    { key: "certificate", label: "Certificate", icon: "🏆" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <Toaster position="top-center" reverseOrder={false} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setOtpError("");
                setOtpValue("");
                setResendSuccess("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter the 6-digit code sent to <strong>{userData.email}</strong>
            </p>

            {otpError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
                {otpError}
              </div>
            )}

            {resendSuccess && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-4 border border-green-100">
                {resendSuccess}
              </div>
            )}

            <input
              type="text"
              maxLength={6}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              placeholder="e.g. rnlhh6"
              className="w-full px-4 py-3 text-center text-lg tracking-widest text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] mb-4 uppercase"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={otpLoading || otpValue.length < 6}
              className="w-full bg-[#063B00] hover:bg-[#052f00] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center">
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-sm font-semibold text-[#063B00] hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <img
              src={previewUrl}
              alt="Document preview"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="h-32 bg-[#063B00] relative rounded-t-2xl"></div>

        <div className="px-6 md:px-10 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 mb-8 gap-4">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="w-28 h-28 bg-white rounded-full p-1 shadow-lg z-10">
                <div className="w-full h-full bg-green-100 text-[#063B00] rounded-full flex items-center justify-center text-4xl font-bold">
                  {getInitials()}
                </div>
              </div>
              <div className="text-center md:text-left mt-2 md:mt-0 z-10">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-white-800">
                    {userData.first_name} {userData.last_name}
                  </h1>
                  {userData.is_verified && (
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="px-3 py-1 bg-green-50 text-[#063B00] text-xs font-bold rounded-full border border-green-200">
                    {getRoleName(userData.role)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 z-10">
              {!userData.is_verified && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors shadow-sm"
                >
                  Verify Email
                </button>
              )}
              <button
                onClick={handleLogout}
                className="
                  bg-red-50 
                  hover:bg-red-100
                  text-red-600
                  text-sm
                  font-semibold
                  py-2
                  px-5
                  rounded-lg
                  transition-colors
                "
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-gray-800 font-medium break-all">
                {userData.email}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                Phone Number
              </p>
              <p className="text-gray-800 font-medium">
                {userData.phone_number ||
                  userData.profile?.phone_number ||
                  "Not provided"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                Address
              </p>
              <p className="text-gray-800 font-medium">
                {userData.address ||
                  userData.profile?.address ||
                  "Not provided"}
              </p>
            </div>
          </div>

          {userData.role === "t" && userData.profile && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Technician Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Rating
                    </p>
                    <p className="text-gray-800 font-medium text-xl">
                      {userData.profile.rating} / 5.0
                    </p>
                  </div>
                  <span className="text-3xl">⭐</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-1">
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    Services Offered
                  </p>
                  {userData.profile.services &&
                  userData.profile.services.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {userData.profile.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-full"
                        >
                          {service.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No services added yet.
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="">
                      <p className="text-md text-gray-500 mb-0 uppercase tracking-wider font-extrabold">
                        Verification Documents
                      </p>
                    </div>
                  
                    <div className="">
                      {userData.profile.is_kyc_verified ?
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    :<p className="text-black ">pending</p>}

                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {documentFields.map(({ key, label, icon }) => {
                      const url = userData.profile[key];
                      const selectedFile = docFiles[key];

                      // Case 1: document already exists on server -> show thumbnail
                      if (url) {
                        return (
                          <div
                            key={key}
                            className="flex flex-col items-center gap-1"
                          >
                            <div
                              onClick={() => setPreviewUrl(url)}
                              className="w-40 h-40 rounded flex items-center justify-center text-xl overflow-hidden bg-green-100 text-green-600 cursor-pointer transition-transform duration-200 hover:scale-113 hover:shadow-md"
                            >
                              <img
                                src={url}
                                alt={label}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[10px] font-medium text-gray-600">
                              {label}
                            </span>
                          </div>
                        );
                      }

                      // Case 2: no document -> drag & drop / click to upload
                      return (
                        <div
                          key={key}
                          className="flex flex-col items-center gap-1"
                        >
                          <label
                            htmlFor={`upload-${key}`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOverKey(key);
                            }}
                            onDragLeave={() => setDragOverKey(null)}
                            onDrop={(e) => handleDrop(key, e)}
                            className={`relative w-32 h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center px-2 cursor-pointer transition-colors ${
                              dragOverKey === key
                                ? "border-[#063B00] bg-green-50"
                                : selectedFile
                                  ? "border-green-400 bg-green-50"
                                  : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              id={`upload-${key}`}
                              ref={(el) => (fileInputRefs.current[key] = el)}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileSelect(key, e.target.files?.[0])
                              }
                            />
                            {selectedFile ? (
                              <>
                                <img
                                  src={URL.createObjectURL(selectedFile)}
                                  alt={label}
                                  className="w-full h-full object-cover rounded-md absolute inset-0"
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRemoveSelectedFile(key);
                                  }}
                                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow-md hover:bg-red-600 z-10"
                                >
                                  ✕
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="text-lg mb-1">📤</span>
                                <span className="text-[10px] font-medium text-gray-500 leading-tight">
                                  Drag & drop or click
                                </span>
                              </>
                            )}
                          </label>
                          <span className="text-[10px] font-medium text-gray-600">
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {hasPendingDocs && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleSaveDocuments}
                        disabled={savingDocs}
                        className="bg-[#063B00] hover:bg-[#052f00] text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {savingDocs ? "Uploading..." : "Save Documents"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
