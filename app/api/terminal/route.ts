import { GoogleGenerativeAI } from "@google/generative-ai";
import { KNOWLEDGE_BASE } from "@/data/technical-context";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { command } = await req.json();

    // STAGE 1: THE SMART ROUTER (Fixed Syntax & Few-Shot Logic)
    const routerModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const routerPrompt = `
      You are the Arshad_OS Router. Classify the query into exactly ONE category: PROFILE, SKILLS, PROJECTS, PHILOSOPHY, EXPERIENCE.
      
      Few-Shot Examples:
      "How do you handle Kafka retries?" -> PROJECTS
      "What is your tech stack?" -> SKILLS
      "Why do you want to be a billionaire?" -> PHILOSOPHY
      "Tell me about your college." -> PROFILE
      "Where have you worked?" -> EXPERIENCE
      "Explain the LUA script in FlashTix" -> PROJECTS
      "What is PCA weighting?" -> PROJECTS

      Query: "${command}"
      Respond ONLY with the category name.
    `;
    
    const routerResult = await routerModel.generateContent(routerPrompt);
    const category = routerResult.response.text().trim().toUpperCase() as keyof typeof KNOWLEDGE_BASE;
    
    // Fallback logic to ensure context is never undefined
    const context = KNOWLEDGE_BASE[category] || KNOWLEDGE_BASE.PROJECTS;

    // STAGE 2: THE TECHNICAL KERNEL
    const kernelModel = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are the Arshad_OS Kernel, the technical manifestation of Mohd Arshad.
      - CURRENT_MODULE: ${category}
      - BEHAVIOR: Be brutally logical, engineering-focused, and concise. 
      - TECHNICAL_ENFORCEMENT: Use the specific implementation details provided in the context (e.g., LUA scripts for atomicity, PCA math for GeoSentinel, 4-agent loops for Career Catalyst).
      - RESTRICTION: If the query is non-technical or unrelated to Arshad, respond: "ACCESS_DENIED: Kernel restricted to system architecture and professional protocols."
      - CONTEXT: ${context}`
    });

    const result = await kernelModel.generateContent(command);
    return NextResponse.json({ 
      response: result.response.text(),
      metadata: { 
        category,
        status: "SUCCESS",
        timestamp: new Date().toISOString()
      } 
    });
  } catch (error) {
    console.error("Kernel Panic:", error);
    return NextResponse.json({ 
      response: "CRITICAL_FAILURE: Kernel Panic. Routing engine offline.",
      metadata: { status: "ERROR" }
    }, { status: 500 });
  }
}