from langchain_core.messages import HumanMessage
from services.llm import llm

def resume_agent(state: dict) -> dict:
    resume = state["resume_text"]
    requirements = state["job_requirements"]
    analysis = state["analysis"]

    prompt = f"""
You are an expert resume writer. Rewrite and improve this resume to better match the job requirements.

Original Resume:
{resume}

Job Requirements:
{requirements}

Analysis of gaps:
{analysis}

Instructions:
- Keep all factual information accurate (do not invent experience)
- Reword bullet points to use keywords from the job posting
- Highlight relevant skills more prominently
- Suggest a strong professional summary tailored to this job
- Return the full improved resume text
"""
    response = llm.invoke([HumanMessage(content=prompt)])
    return {**state, "tailored_resume": response.content}