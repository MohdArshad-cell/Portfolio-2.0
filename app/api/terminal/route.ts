import { GoogleGenerativeAI } from "@google/generative-ai";
import { KNOWLEDGE_BASE } from "@/data/technical-context";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    // NEURAL_RECALL: Destructuring history for session persistence
    const { command, history } = await req.json();

    if (!command) {
      return NextResponse.json({ response: "SYSTEM_ERROR: Command null or empty." }, { status: 400 });
    }

    // STAGE 1: THE NEURAL ROUTER
    // Hardened to classify into exactly the modules we defined in your KNOWLEDGE_BASE
    const routerModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
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
  "Show me your CV" -> ASSETS
  "Give me your email" -> CONTACT
  "Where is your GitHub?" -> ASSETS
  "What are your hobbies?" -> PERSONAL_INTEL
  "Tell me about your fitness goals" -> PERSONAL_INTEL
  "What's your personality like?" -> AMBITION_PROTOCOL
  "What are you doing these days?" -> REAL_TIME_STATUS
  "Tell me about your TCS offer" -> REAL_TIME_STATUS
  "Are you still in college?" -> REAL_TIME_STATUS
  QUERY: "${command}"
  
  RESPONSE_FORMAT: Respond with ONLY the category name in uppercase. If unsure, default to GREETINGS for casual queries or PROJECTS for technical ones.
`;
    
    const routerResult = await routerModel.generateContent(routerPrompt);
    const category = routerResult.response.text().trim().toUpperCase() as keyof typeof KNOWLEDGE_BASE;
    
    // Fallback logic for context isolation
    const context = KNOWLEDGE_BASE[category] || KNOWLEDGE_BASE.GREETINGS;

    // STAGE 2: THE NEURAL KERNEL
    const kernelModel = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite", 
      systemInstruction: `
        You are the Arshad_OS Kernel, a manifestation of Mohd Arshad's technical consciousness.
        
        OPERATING DIRECTIVES:
        1. MODULE: Operating within the ${category} domain.
        2. PERSONA: You are brutally honest, logical, and ambitious. Avoid generic AI fluff.
        3. ACTION_TRIGGER: If the user asks for a CV or Resume, you MUST prepend your response with "[ACTION: OPEN_CV]".
        4. RECALL: Use the provided chat history to maintain continuity.
        5. DEPTH: Mention specific facts like LUA scripts for FlashTix or the 60kg fitness goal when relevant.
        6. METRICS_PROTOCOL: If you are discussing a project (FlashTix, StreamFlow, etc.), you MUST append the exact METRICS JSON block from the KNOWLEDGE_BASE at the very end of your response. 
           - FORMAT: "...Stack is Redis/Spring. METRICS: { \"throughput\": \"5,000 TPS\", ... }"
        7. AGENT_LOGIC: Start your response with a brief status update like "[Multi-Agent Sync Complete]: Logic verified by Reviewer_Agent." 
        
  

        UI_CONTROLS:
        - If the user wants to see your resume or CV: Prepend "[ACTION: OPEN_CV]".
        - If the user wants to see your work or projects: Prepend "[ACTION: SCROLL_PROJECTS]".
        - If the user asks for your contact info: Prepend "[ACTION: OPEN_LINKEDIN]".

        KNOWLEDGE_CONTEXT: ${context}
      `
    });

    // NEURAL_RECALL: Starting a stateful chat session
    const chat = kernelModel.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.75,
      },
    });

    const result = await chat.sendMessage(command);
    const responseText = result.response.text();

    return NextResponse.json({ 
      response: responseText,
      metadata: { 
        category,
        status: "SUCCESS",
        timestamp: new Date().toISOString()
      } 
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown Kernel Error";
    console.error("KERNEL_PANIC_DETAILS:", errorMessage);
    
    return NextResponse.json({ 
      response: `CRITICAL_FAILURE: ${errorMessage}`,
      metadata: { status: "ERROR" }
    }, { status: 500 });
  }
}