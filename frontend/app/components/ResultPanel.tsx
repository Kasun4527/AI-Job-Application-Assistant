type ResultProps = {
  jobRequirements: string;
  analysis: string;
  tailoredResume: string;
};

export default function ResultPanel({
  jobRequirements,
  analysis,
  tailoredResume,
}: ResultProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="mt-10 space-y-8">
      {/* Job Requirements */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          📋 Job Requirements
        </h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-600">
          {jobRequirements}
        </pre>
      </div>

      {/* Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          🔍 Resume Analysis
        </h2>
        <pre className="whitespace-pre-wrap text-sm text-gray-600">
          {analysis}
        </pre>
      </div>

      {/* Tailored Resume */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800">
            ✅ Tailored Resume
          </h2>
          <button
            onClick={() => copyToClipboard(tailoredResume)}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-gray-600">
          {tailoredResume}
        </pre>
      </div>
    </div>
  );
}