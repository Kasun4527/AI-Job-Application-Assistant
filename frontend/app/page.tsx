"use client";

import { useState } from "react";
import { tailorResume } from "@/lib/api";
import ResultPanel from "./components/ResultPanel";

export default function Home() {
  const [jobUrl, setJobUrl] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    job_requirements: string;
    analysis: string;
    tailored_resume: string;
  }>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jobUrl || !resumeText) {
      setError("Job URL සහ Resume text දෙකම දාන්න!");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await tailorResume(jobUrl, resumeText);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Backend running ද check කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700">
            AI Job Application Assistant
          </h1>
          <p className="text-gray-500 mt-2">
            Paste your resume + job URL → Get a tailored resume instantly
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow p-8 space-y-6">

          {/* Job URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Job Posting URL
            </label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://www.linkedin.com/jobs/..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Resume (paste as text)
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume here..."
              rows={12}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Analyzing... Please wait ⏳" : "Tailor My Resume 🚀"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <ResultPanel
            jobRequirements={result.job_requirements}
            analysis={result.analysis}
            tailoredResume={result.tailored_resume}
          />
        )}

      </div>
    </main>
  );
}