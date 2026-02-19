import React, { useState, useEffect } from "react";
import {
  PlayCircle,
  Lock,
  Globe,
  Newspaper,
  Award,
  X,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchaseCard = ({ course }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false); // ✅ New State

  // --- 1. CHECK ENROLLMENT STATUS ON MOUNT ---
  useEffect(() => {
    const checkEnrollment = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/dashboard/check/${course.id}`,
          {
            method: "GET",
            headers: { "x-auth-token": token },
          },
        );

        const data = await res.json();
        if (data.enrolled) {
          setIsEnrolled(true);
        }
      } catch (err) {
        console.error("Failed to check status", err);
      }
    };

    checkEnrollment();
  }, [course.id]);

  // --- 2. HANDLE ENROLL CLICK ---
  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/enroll/${course.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        },
      );

      // Handle non-JSON responses gracefully
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(await res.text());
      }

      if (res.ok) {
        // ✅ ONLY update state if backend says OK (200)
        setIsEnrolled(true);
        alert("🎉 Enrollment Successful!");
        navigate("/dashboard"); // Optional: Redirect immediately
      } else {
        // ❌ If backend fails, show error and do NOT update button
        setIsEnrolled(false);
        alert(data.msg || "Enrollment failed. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment Error:", err);
      alert("Something went wrong. Check your connection.");
      setIsEnrolled(false);
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden relative z-10">
        <div className="relative aspect-video bg-gray-100 cursor-pointer group">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          />
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {/* ✅ CONDITIONAL BUTTON RENDERING */}
            {isEnrolled ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-700 transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Go to Dashboard
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {enrolling ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Enroll Now"
                )}
              </button>
            )}
          </div>

          <div className="space-y-3 text-sm text-gray-600 pt-5">
            <h4 className="font-bold text-gray-900">This course includes:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <PlayCircle className="w-4 h-4 text-gray-400" />{" "}
                {course.duration} on-demand video
              </li>
              <li className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-gray-400" /> Full lifetime access
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" /> Access on mobile and
                TV
              </li>
              <li className="flex items-center gap-3">
                <Newspaper className="w-4 h-4 text-gray-400" /> Mock Tests
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-4 h-4 text-gray-400" /> Certificate of
                completion
              </li>
            </ul>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <button className="text-gray-600 font-bold text-sm underline">
              Share
            </button>
            <button className="text-gray-600 font-bold text-sm underline">
              Gift this course
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          ></div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10 text-center">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              You need to be logged in to enroll in this course.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseCard;
