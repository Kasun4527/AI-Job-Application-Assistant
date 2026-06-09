export async function tailorResume(jobUrl: string, resumeText: string) {
  const response = await fetch("http://localhost:8000/tailor-resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_url: jobUrl,
      resume_text: resumeText,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to tailor resume");
  }

  return response.json();
}