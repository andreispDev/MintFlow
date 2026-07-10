import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  UserCog,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function SignUp(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      setError("Check your email to confirm your account.");

      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase

      .from("profiles")

      .insert({
        id: user.id,
        full_name: name,
        email: email,
        role: role,
      });

    if (profileError) {
      console.log(profileError);
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
  }

  return (
    <div className="min-h-screen w-full bg-teal-50 flex items-center justify-center p-5">
      <div className="w-full max-w-[380px]">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-3 shadow-teal-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="text-xl font-semibold text-teal-900 tracking-wide">
            MintFlow
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-teal-100 rounded-xl p-6 shadow-sm shadow-teal-100/90">
          <div className="mb-5">
            <h1 className="text-[20px] font-semibold text-gray-900">Sign up</h1>
            <p className="text-[13px] text-gray-500 mt-1">
              Get started with your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 text-[12.5px] p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={SignUp} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-[12px] text-gray-500 block mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full text-[13px] text-gray-900 bg-teal-50/50 border border-teal-100 rounded-lg py-2.5 pl-8 pr-3 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition-shadow"
                />
              </div>
            </div>

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
              <label className="text-[12px] text-gray-500 block mb-1.5">
                Password
              </label>
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

            {/* Role */}
            <div>
              <label className="text-[12px] text-gray-500 block mb-1.5">
                Role
              </label>
              <div className="relative">
                <UserCog className="w-3.5 h-3.5 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-[13px] text-gray-900 bg-teal-50/50 border border-teal-100 rounded-lg py-2.5 pl-8 pr-3 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition-shadow appearance-none"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 disabled:opacity-70 text-white text-[13px] font-medium rounded-lg py-2.5 transition-all shadow-teal-200 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-[13px] text-gray-500 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-500 hover:text-teal-600 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
