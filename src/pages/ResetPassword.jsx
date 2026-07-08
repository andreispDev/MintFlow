import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function sendReset(e) {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password reset link sent. Check your email.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-sm shadow-teal-300/40 border border-teal-100 p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-1 text-gray-900">
          Forgot Password
        </h1>

        <p className="text-[13.5px] text-gray-500 mb-5">
          Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <p className="text-[13px] text-teal-700 bg-teal-50 border border-teal-100 rounded-lg px-3 py-2 mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={sendReset}>
          <input
            required
            className="border border-gray-200 p-3 w-full rounded-lg mb-4 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="bg-teal-600 text-white w-full p-3 rounded-lg font-medium text-[13.5px] hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={saving}
          >
            {saving ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
