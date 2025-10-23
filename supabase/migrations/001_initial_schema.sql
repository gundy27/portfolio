-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE media_type AS ENUM ('image', 'video', 'gif', 'audio', 'document');
CREATE TYPE resource_type AS ENUM ('template', 'document', 'code', 'video', 'other');
CREATE TYPE event_type AS ENUM ('work', 'education', 'achievement', 'project');

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  profile_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Case studies table
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  pricing_info JSONB,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Case study media table
CREATE TABLE case_study_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_study_id UUID NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  media_type media_type NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Resources table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type resource_type NOT NULL,
  file_url TEXT,
  external_link TEXT,
  thumbnail_url TEXT,
  download_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_url CHECK (file_url IS NOT NULL OR external_link IS NOT NULL)
);

-- Timeline events table
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT,
  description TEXT NOT NULL,
  event_type event_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Chatbot logs table
CREATE TABLE chatbot_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  sources_cited JSONB,
  user_metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Page anchors table (for RAG citations)
CREATE TABLE page_anchors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  anchor_id TEXT NOT NULL,
  section_title TEXT NOT NULL,
  content_summary TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(page_path, anchor_id)
);

-- Media assets table
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  media_type media_type NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_published ON case_studies(published);
CREATE INDEX idx_case_studies_featured ON case_studies(featured);
CREATE INDEX idx_case_study_media_case_study_id ON case_study_media(case_study_id);
CREATE INDEX idx_resources_published ON resources(published);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_timeline_events_date ON timeline_events(start_date DESC);
CREATE INDEX idx_timeline_events_type ON timeline_events(event_type);
CREATE INDEX idx_chatbot_logs_session ON chatbot_logs(session_id);
CREATE INDEX idx_chatbot_logs_created ON chatbot_logs(created_at DESC);
CREATE INDEX idx_page_anchors_path ON page_anchors(page_path);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON timeline_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_anchors_updated_at BEFORE UPDATE ON page_anchors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_anchors ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published case studies"
  ON case_studies FOR SELECT
  USING (published = TRUE);

CREATE POLICY "Public can read case study media"
  ON case_study_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM case_studies
      WHERE case_studies.id = case_study_media.case_study_id
      AND case_studies.published = TRUE
    )
  );

CREATE POLICY "Public can read published resources"
  ON resources FOR SELECT
  USING (published = TRUE);

CREATE POLICY "Public can read timeline events"
  ON timeline_events FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read page anchors"
  ON page_anchors FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read profiles"
  ON profiles FOR SELECT
  USING (TRUE);

-- Chatbot logs are insertable by anyone but readable only by authenticated users
CREATE POLICY "Anyone can insert chatbot logs"
  ON chatbot_logs FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can read chatbot logs"
  ON chatbot_logs FOR SELECT
  TO authenticated
  USING (TRUE);

-- Admin policies (for authenticated users with service role)
CREATE POLICY "Service role can do everything on profiles"
  ON profiles FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Service role can do everything on case_studies"
  ON case_studies FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Service role can do everything on case_study_media"
  ON case_study_media FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Service role can do everything on resources"
  ON resources FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Service role can do everything on timeline_events"
  ON timeline_events FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Service role can do everything on page_anchors"
  ON page_anchors FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Service role can do everything on media_assets"
  ON media_assets FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- Authenticated user policies for CMS dashboard
CREATE POLICY "Authenticated users can manage case studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can manage case study media"
  ON case_study_media FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can manage resources"
  ON resources FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can manage timeline events"
  ON timeline_events FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can manage profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can manage page anchors"
  ON page_anchors FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can manage media assets"
  ON media_assets FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- Insert default profile (update with your information)
INSERT INTO profiles (name, headline, bio, email) VALUES (
  'Dan Gunderson',
  'Product Manager & Full-Stack Developer',
  'Building innovative solutions at the intersection of product management and technology. Passionate about creating user-centric experiences and leveraging AI to solve complex problems.',
  'dan@gundy.io'
);

-- Create storage buckets (Note: This needs to be run via Supabase dashboard or CLI)
-- Storage buckets to create:
-- - case-studies (public)
-- - resources (public)
-- - media (public)
-- - profile-images (public)

