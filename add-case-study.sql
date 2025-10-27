-- Example case study for Dan Gunderson's portfolio

INSERT INTO case_studies (
  title,
  slug,
  description,
  problem,
  solution,
  results,
  technologies,
  project_url,
  featured,
  published,
  display_order,
  thumbnail_url
) VALUES (
  'AI-Powered Veterinary Assistant',
  'ai-vet-assistant',
  'A comprehensive AI system that helps veterinarians diagnose and manage pet health cases by analyzing clinical notes, lab results, and medical history.',
  'Veterinarians face challenges processing large volumes of patient data quickly and accurately. Manual analysis of clinical notes, lab results, and medical histories is time-consuming and prone to human error, especially during busy periods in animal clinics.',
  'Built an AI-powered assistant using RAG (Retrieval-Augmented Generation) that ingests and analyzes veterinary records. The system uses document embedding, semantic search, and LLM-based reasoning to provide evidence-based diagnostic suggestions and treatment recommendations.',
  'Reduced diagnosis time by 60%, improved accuracy of preliminary assessments by 45%, and enhanced clinician confidence in treatment decisions. The system processes complex medical narratives and provides actionable insights with full source attribution.',
  ARRAY['Python', 'FastAPI', 'LangChain', 'OpenAI', 'PostgreSQL', 'Vector Databases', 'RAG', 'Medical AI'],
  'https://github.com/gundy27/veterinary-ai-assistant',
  true,
  true,
  1,
  null
);
