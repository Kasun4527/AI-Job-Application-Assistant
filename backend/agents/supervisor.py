from langgraph.graph import StateGraph, END
from typing import TypedDict
from agents.researcher import researcher_agent
from agents.analyzer import analyzer_agent
from agents.resume_agent import resume_agent

class AgentState(TypedDict):
    job_url: str
    resume_text: str
    job_requirements: str
    analysis: str
    tailored_resume: str

def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("researcher", researcher_agent)
    graph.add_node("analyzer", analyzer_agent)
    graph.add_node("resume_writer", resume_agent)

    graph.set_entry_point("researcher")
    graph.add_edge("researcher", "analyzer")
    graph.add_edge("analyzer", "resume_writer")
    graph.add_edge("resume_writer", END)

    return graph.compile()

pipeline = build_graph()