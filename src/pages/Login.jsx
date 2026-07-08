// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, Cpu } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-teal-50 flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[380px]"
      >
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center mb-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-3 shadow-teal-200"
          >
            <Cpu className="w-5 h-5 text-white" />
          </motion.div>
          <p className="text-xl font-semibold text-teal-900 tracking-wide">
            WorkForce
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white border border-teal-100 rounded-xl p-6 shadow-sm shadow-teal-100/90"
        >
          <div className="mb-5">
            <h1 className="text-[20px] font-semibold text-gray-900">Sign in</h1>
            <p className="text-[13px] text-gray-500 mt-1">Login to continue</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="bg-red-50 text-red-600 text-[12.5px] p-3 rounded-lg border border-red-100 overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-[12px] text-gray-500 block mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full text-[13px] text-gray-900 bg-teal-50/50 border border-teal-100 rounded-lg py-2.5 pl-8 pr-3 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition-shadow"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] text-gray-500">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-[12px] text-teal-500 hover:text-teal-600 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full text-[13px] text-gray-900 bg-teal-50/50 border border-teal-100 rounded-lg py-2.5 pl-8 pr-9 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-300 hover:text-teal-500"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-[12.5px] text-gray-500 select-none">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded accent-teal-500"
              />
              Remember me
            </label>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 disabled:opacity-70 text-white text-[13px] font-medium rounded-lg py-2.5 transition-all shadow-teal-200 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="text-[13px] text-gray-500 text-center mt-5"
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-teal-500 hover:text-teal-600 font-medium"
          >
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
