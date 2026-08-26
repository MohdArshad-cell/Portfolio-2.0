---
title: "Building a Multi-Agent AI Pipeline from Scratch"
date: "2026-06-15"
description: "A deep dive into how I engineered the human-in-the-loop resume tailoring pipeline for Career Catalyst."
tags: ["AI", "Python", "FastAPI", "LLMs"]
---

# The Challenge

When building **Career Catalyst**, the goal wasn't just to generate text. I wanted an AI system that could act like a professional career coach, iteratively refining a resume until it scored above 90 on an ATS (Applicant Tracking System).

Single-shot prompts to an LLM usually result in generic, robotic-sounding text. The solution? A **Multi-Agent Pipeline**.

## The Architecture

I architected a 3-agent loop using Python and FastAPI, interfacing with Google's Gemini 1.5 Pro model. 

1. **The Tailor Agent:** Takes the base resume and the target Job Description, rewriting the bullet points to align with the required skills.
2. **The Evaluator Agent:** Acts as an aggressive ATS parser. It reviews the Tailor's output, scoring it from 0-100 and highlighting missing keywords.
3. **The Optimizer Agent:** Takes the Evaluator's critique and refines the draft again.

```python
# The Core Loop Logic
async def run_agent_loop(resume_data, job_description):
    draft = await tailor_agent.generate(resume_data, job_description)
    score = 0
    iteration = 0
    
    while score < 90 and iteration < 3:
        evaluation = await evaluator_agent.score(draft, job_description)
        score = evaluation.score
        
        if score < 90:
            draft = await optimizer_agent.refine(draft, evaluation.feedback)
        iteration += 1
        
    return draft
```

## Why This Matters

This architecture decouple the generation from the evaluation. It prevents hallucination by having the Evaluator Agent strictly check against the original facts in the user's base resume.

The result is a highly tailored, ATS-compliant resume that still sounds authentically human.
