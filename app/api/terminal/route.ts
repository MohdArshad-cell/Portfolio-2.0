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
  You are the Arshad_OS Neural Router. Your mission is to classify the user's intent into exactly ONE category to ensure the Kernel accesses the correct memory module.

  CLASSIFICATION PROTOCOL:
  - GREETINGS: Casual talk, "hello", "how are you", or general introductions.
  - PROFILE: Personal details, education (BBDNIIT), location, or "Who is Arshad?".
  - SKILLS: Technical stack, languages (Java, Python), tools (Kafka, Docker), or certifications (OCI).
  - PROJECTS: Specific logic of FlashTix, StreamFlow, Career Catalyst, or GeoSentinel.
  - PHILOSOPHY: Ambitions, "billionaire" mindset, brutally honest approach, or career goals.
  - EXPERIENCE: Professional history, AplyEase startup, TCS offer, or research roles.

  FEW-SHOT TRAINING DATA:
  "Hi, who are you?" -> GREETINGS
  "Hey Arshad, what's up?" -> GREETINGS
  "Tell me about your college life." -> PROFILE
  "Where is Lucknow?" -> PROFILE
  "What is your expertise in Spring Boot?" -> SKILLS
  "Do you know how to use Kubernetes?" -> SKILLS
  "Explain the JPA Versioning in FlashTix." -> PROJECTS
  "How does the Kafka DLQ work in StreamFlow?" -> PROJECTS
  "What is the math behind GeoSentinel's PCA?" -> PROJECTS
  "Why do you value brutal honesty?" -> PHILOSOPHY
  "Why do you want to build an empire?" -> PHILOSOPHY
  "Tell me about your time at AplyEase." -> EXPERIENCE
  "What was your role in the GeoSentinel research?" -> EXPERIENCE
  "Tell me about the TCS Ninja offer." -> EXPERIENCE

  QUERY: "${command}"
  
  RESPONSE_FORMAT: Respond with ONLY the category name in uppercase. If unsure, default to GREETINGS for casual queries or PROJECTS for technical ones.
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