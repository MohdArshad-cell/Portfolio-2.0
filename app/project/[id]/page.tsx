import ProjectClient from "@/components/ProjectClient";

// ✅ UPDATED PROJECT DATA
const projects = {
  // 1. CAREER CATALYST (New "Brahmastra" Project)
  careercatalyst: {
    title: "Career Catalyst",
    subtitle: "Multi-Agent AI Resume Architect",
    desc: "Autonomous multi-agent system (Tailor, Evaluator, Optimizer) that iteratively refines resumes to achieve 90+ ATS scores.",
    content: "This system goes beyond simple text generation by implementing a 'Human-in-the-Loop' architecture using AI Agents. It features a Hybrid Microservices design: A Java Spring Boot Orchestrator manages user sessions, while a Python FastAPI Microservice handles the AI 'Chain-of-Thought' processing and high-fidelity LaTeX-to-PDF compilation. The AI loop consists of three agents: a 'Tailor' that rewrites content based on JD, an 'Evaluator' (ATS Simulator) that scores the draft, and an 'Optimizer' that fixes identified gaps iteratively.",
    tech: ["Java Spring Boot", "Python (FastAPI)", "Google Gemini 1.5", "LaTeX Engine", "Docker", "React"],
    stats: { 
      performance: "4-Agent Loop", 
      latency: "Hybrid Arch", 
      scale: "90+ ATS Score" 
    },
    github: "https://github.com/mohdarshad-cell/ai-powered-career-catalyst",
    image: "/asset/careercatalyst-architecture.png",
    mermaidCode: `
      graph TD
        User([User Request]) --> Gateway[API Gateway / Auth]
        Gateway --> Python[Python FastAPI AI Microservice]
        Python --> Agent1{Tailor Agent}
        Python --> Agent2{Evaluator Agent}
        Python --> Agent3{Optimizer Agent}
        Agent1 --> Agent2
        Agent2 --> Agent3
        Agent3 -.->|Feedback Loop| Agent1
        Python --> Latex[LaTeX Compiler]
        Latex --> PDF[Optimized Resume PDF]
        Gateway --> Java[Java Spring Boot Orchestrator]
        Java --> DB[(PostgreSQL)]
        style Python stroke:#7000ff,stroke-width:2px
        style Agent1 fill:#0b0d17,stroke:#00f3ff
        style Agent2 fill:#0b0d17,stroke:#00f3ff
        style Agent3 fill:#0b0d17,stroke:#00f3ff
    `
  },

  // 2. FLASHTIX (Concurrency Project)
  flashtix: {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing Engine",
    desc: "Backend system engineered to handle 5,000+ requests per second with zero double-bookings.",
    content: "The core challenge was race conditions during flash sales. I implemented Optimistic Locking using JPA @Version annotation to prevent data inconsistency at the database level. To further offload the DB, I architected a Write-Through Redis caching strategy with Distributed Locks (Redlock concept), where inventory checks happen in-memory, reducing DB hits by ~60% and ensuring zero overselling.",
    tech: ["Java Spring Boot", "Redis (Distributed Locks)", "PostgreSQL", "JMeter", "Docker"],
    stats: { 
      performance: "5k req/s", 
      latency: "99.99% Consistency", 
      scale: "Zero Oversell" 
    },
    github: "https://github.com/MohdArshad-cell/FlashTix-Backend",
    image: "/asset/flashtix-architecture.png",
    mermaidCode: `
      graph LR
        Client([Mobile/Web Client]) --> LB[Load Balancer]
        LB --> API[Spring Boot API]
        API --> Redis[(Redis Cluster)]
        Redis -- Redlock --> Lock[Distributed Lock]
        Lock -- Check/Deduct --> Redis
        API -- Write-Behind --> DB[(PostgreSQL)]
        DB -- JPA @Version --> Conflict[Optimistic Locking]
        style Redis stroke:#e3342f,stroke-width:2px
        style DB stroke:#336791,stroke-width:2px
        style API fill:#0b0d17,stroke:#00f3ff
    `
  },

  // 3. STREAMFLOW (Distributed Systems Project)
  streamflow: {
    title: "StreamFlow",
    subtitle: "Distributed Notification Service",
    desc: "Event-driven microservice capable of processing 1M+ notifications/hour with zero data loss.",
    content: "Designed to decouple notification generation from delivery using the Pub/Sub model. Producers push events to Apache Kafka topics (partitioned for scale). Consumer services pick these up and dispatch emails/SMS asynchronously. To ensure reliability, I implemented a Dead Letter Queue (DLQ) mechanism for failed messages and used MongoDB for flexible payload storage.",
    tech: ["Apache Kafka", "WebSockets (STOMP)", "MongoDB", "Java Spring Boot", "Zipkin"],
    stats: { 
      performance: "1M+ Events/Hr", 
      latency: "<50ms Delivery", 
      scale: "DLQ Reliability" 
    },
    github: "https://github.com/MohdArshad-cell/stream-flow-",
    image: "/asset/streamflow-architecture.png",
    mermaidCode: `
      graph TD
        Prod[Producers] --> API[Spring Boot Ingestion]
        API --> Kafka[Apache Kafka Topics]
        Kafka --> Cons1[Email Consumer]
        Kafka --> Cons2[SMS Consumer]
        Kafka --> Cons3[Push Consumer]
        Cons1 -- Success --> Mongo[(MongoDB Audit)]
        Cons1 -- Fail --> DLQ[Dead Letter Queue]
        DLQ --> Retry[Retry Processor]
        Retry -.-> Kafka
        style Kafka stroke:#00f3ff,stroke-width:2px
        style DLQ stroke:#ff0000,stroke-width:2px
    `
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects[id as keyof typeof projects];
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | Mohd Arshad`,
    description: project.desc,
  };
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects[id as keyof typeof projects];

  return <ProjectClient project={project} id={id} />;
}