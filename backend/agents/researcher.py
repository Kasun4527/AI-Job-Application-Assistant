from langchain_core.messages import HumanMessage
from services.llm import llm
from services.scraper import scrape_job_posting

def researcher_agent(state: dict) -> dict:
    url = state["job_url"]
    raw_text = scrape_job_posting(url)

    prompt = f"""
You are a job analyst. Extract the following from this job posting:
1. Job title
2. Required skills (list)
3. Preferred skills (list)
4. Years of experience required
5. Key responsibilities (list)

Job Posting:
{raw_text}

Return as structured plain text.
"""
    response = llm.invoke([HumanMessage(content=prompt)])
    return {**state, "job_requirements": response.content}