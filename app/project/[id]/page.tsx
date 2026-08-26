import ProjectClient from "@/components/ProjectClient";

// ✅ UPDATED PRODUCTION PROJECT DATA
const projects = {
  // 1. SENTINELLEDGER (Fintech & Distributed Transactions Anchor)
  sentinelledger: {
    title: "SentinelLedger",
    subtitle: "Distributed Financial Ledger & Payment Engine",
    desc: "Event-driven financial platform handling 10,000+ RPS with append-only double-entry bookkeeping, Saga failure recovery, and <15ms ONNX fraud evaluation.",
    content: "Engineered to solve data integrity and race conditions in mission-critical financial systems. Implements an append-only double-entry ledger in PostgreSQL where raw balance updates are strictly prohibited, ensuring a tamper-proof audit trail. Distributed transactions across microservices are coordinated via the Saga Orchestration Pattern backed by a Transactional Outbox to guarantee at-least-once message delivery and automatic compensating reversals on downstream failure. Account-level race conditions and double-spending are eliminated via Redis Redlock and idempotency keys, while fraud detection is evaluated in under 15ms by embedding an XGBoost model directly in the JVM via ONNX Runtime.",
    tech: ["Java 21", "Spring Boot 3", "Apache Kafka", "PostgreSQL", "Redis (Redlock)", "ONNX Runtime", "Kubernetes", "Docker"],
    stats: { 
      performance: "10k+ RPS", 
      latency: "<15ms Fraud Check", 
      scale: "Double-Entry ACID" 
    },
    github: "https://github.com/MohdArshad-cell/SentinelLedger",
    image: "/asset/sentinelledger_arch.png",
    mermaidCode: `
      graph TD
        Client([Client / API Gateway]) --> Orch[Payment Orchestrator]
        Orch --> RedisLock[(Redis Redlock / Idempotency)]
        Orch --> Fraud[Fraud Detection Service - ONNX JVM]
        Fraud -->|Score Valid| Kafka[Apache Kafka Backbone]
        Fraud -->|High Risk| Compensate[Saga Compensating Rollback]
        Kafka --> Ledger[Ledger Engine - Append-Only Postgres]
        Kafka --> Wallet[Wallet Service - Read Projection]
        Ledger --> Outbox[Transactional Outbox Table]
        style Kafka stroke:#00f3ff,stroke-width:2px
        style RedisLock stroke:#e3342f,stroke-width:2px
        style Ledger stroke:#336791,stroke-width:2px
        style Fraud fill:#0b0d17,stroke:#7000ff
    `
  },

  // 2. FLASHTIX (High-Concurrency Engine)
  flashtix: {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing Engine",
    desc: "Distributed event booking engine handling 5,000+ RPS with zero overselling anomalies.",
    content: "Engineered to eliminate severe race conditions and overselling during flash-sale traffic surges. The fast execution path uses atomic Redis Lua scripts and Redlock distributed locks to handle seat reservation checks and decrements entirely in-memory. As a multi-layered boundary, the persistence layer utilizes PostgreSQL Optimistic Locking (@Version) to prevent dirty writes under database contention. System throughput was optimized via HikariCP connection pool tuning, with live lock contention, error rate, and p99 latency telemetries monitored via Prometheus and Grafana.",
    tech: ["Java 21", "Spring Boot 3", "Redis (Lua/Redlock)", "PostgreSQL", "HikariCP", "Prometheus", "Grafana", "Docker"],
    stats: { 
      performance: "5,000+ RPS", 
      latency: "Sub-50ms p99", 
      scale: "Zero Overselling" 
    },
    github: "https://github.com/MohdArshad-cell/FlashTix",
    image: "/asset/flashtix_arch.png",
    mermaidCode: `
      graph LR
        Client([Client Requests]) --> LB[Load Balancer]
        LB --> API[Spring Boot API]
        API --> Redis[(Redis In-Memory Engine)]
        Redis -- Lua Script + Redlock --> Lock[Atomic Fast-Path Decrement]
        Lock -- Success --> DB[(PostgreSQL)]
        DB -- JPA @Version --> Conflict[Optimistic Locking Barrier]
        API --> Metrics[Prometheus / Grafana Telemetry]
        style Redis stroke:#e3342f,stroke-width:2px
        style DB stroke:#336791,stroke-width:2px
        style API fill:#0b0d17,stroke:#00f3ff
    `
  },

  // 3. STREAMFLOW (Distributed Event Streaming)
  streamflow: {
    title: "StreamFlow",
    subtitle: "High-Throughput Distributed Notification Engine",
    desc: "Fault-tolerant messaging backbone processing 10,000+ events/sec with zero message loss and DLQ isolation.",
    content: "Designed as an asynchronous notification orchestrator decoupling event ingestion from multi-channel delivery (Email, SMS, Push). Uses Apache Kafka with custom partition key hashing and manual offset commits to guarantee strict message ordering and at-least-once delivery semantics. Downstream provider downtime is handled via an automated retry pipeline integrating Dead Letter Queues (DLQ) with exponential backoff and jitter algorithms. High-frequency notification queries are served using a Redis Write-Through caching layer, offloading over 70% of read IOPS from MongoDB.",
    tech: ["Java", "Spring Boot", "Apache Kafka", "Redis (Write-Through)", "MongoDB", "Zipkin", "Docker"],
    stats: { 
      performance: "10,000+ Events/Sec", 
      latency: "Sub-5ms Cache Read", 
      scale: "DLQ Fault-Tolerance" 
    },
    github: "https://github.com/MohdArshad-cell/StreamFlow",
    image: "/asset/streamflow_arch.png",
    mermaidCode: `
      graph TD
        Prod[Upstream Services] --> API[Spring Boot Ingestion]
        API --> Kafka[Apache Kafka Partitioned Topics]
        Kafka --> Worker[Consumer Worker Clusters]
        Worker --> Cache[(Redis Write-Through Cache)]
        Worker --> Mongo[(MongoDB Audit Storage)]
        Worker -- Transient Failure --> DLQ[Dead Letter Queue]
        DLQ --> Retry[Exponential Backoff Processor]
        Retry -.-> Kafka
        style Kafka stroke:#00f3ff,stroke-width:2px
        style DLQ stroke:#ff0000,stroke-width:2px
        style Cache stroke:#e3342f,stroke-width:2px
    `
  },

  // 4. CAREER CATALYST (AI Document Compilation Engine)
  careercatalyst: {
    title: "Career Catalyst",
    subtitle: "AI-Driven Multi-Agent Document Compilation Engine",
    desc: "Autonomous multi-agent pipeline executing asynchronous semantic resume parsing and dynamic LaTeX PDF compilation.",
    content: "Architected an end-to-end document generation engine pairing a Java Spring Boot backend with Python AI worker processes. Leverages Google Gemini models across an iterative agent pipeline (Tailor, Evaluator, Optimizer) to achieve 90%+ ATS compatibility scores. Structured JSON outputs are compiled directly into production LaTeX templates, avoiding parsing artifacts common in HTML-to-PDF tools. Asynchronous background workers and Redis task caching ensure non-blocking client execution flows during heavy LLM generation runs.",
    tech: ["Java Spring Boot", "Python (FastAPI)", "Google Gemini API", "LaTeX Engine", "Redis", "Docker"],
    stats: { 
      performance: "3-Agent Loop", 
      latency: "Non-Blocking Async", 
      scale: "90%+ ATS Score" 
    },
    github: "https://github.com/MohdArshad-cell/Career-Catalyst",
    image: "/asset/careercatalyst_arch.png",
    mermaidCode: `
      graph TD
        User([Client Request]) --> Gateway[API Gateway / Auth]
        Gateway --> Java[Spring Boot Backend]
        Java --> Redis[(Redis Task State Cache)]
        Java --> Python[Python AI Service]
        Python --> Gemini[Google Gemini API Multi-Agent Loop]
        Gemini --> Latex[LaTeX Compiler Engine]
        Latex --> PDF[Optimized Resume Artifact]
        style Python stroke:#7000ff,stroke-width:2px
        style Java fill:#0b0d17,stroke:#00f3ff
        style Redis stroke:#e3342f,stroke-width:2px
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