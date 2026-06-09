from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.supervisor import pipeline

app = FastAPI(title="Job Application Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TailorRequest(BaseModel):
    job_url: str
    resume_text: str

@app.post("/tailor-resume")
async def tailor_resume(request: TailorRequest):
    result = pipeline.invoke({
        "job_url": request.job_url,
        "resume_text": request.resume_text,
        "job_requirements": "",
        "analysis": "",
        "tailored_resume": ""
    })
    return {
        "job_requirements": result["job_requirements"],
        "analysis": result["analysis"],
        "tailored_resume": result["tailored_resume"]
    }

@app.get("/")
def root():
    return {"message": "Job Assistant API running"}