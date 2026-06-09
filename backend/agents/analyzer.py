from langchain_core.messages import HumanMessage
from services.llm import llm

def analyzer_agent(state: dict) -> dict:
    resume = state["resume_text"]
    requirements = state["job_requirements"]

    prompt = f"""
Compare this resume against the job requirements.

Resume:
{resume}

Job Requirements:
{requirements}

Identify:
1. Matching skills and experience
2. Missing skills (gaps)
3. Sections that need improvement
4. Overall match percentage (estimate)

Be specific and actionable.
"""
    response = llm.invoke([HumanMessage(content=prompt)])
    return {**state, "analysis": response.content}