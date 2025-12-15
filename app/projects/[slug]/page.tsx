import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Label } from '@/components/ui/Label'
import { getProject, getProjectContent, getProfile } from '@/lib/content/loader.server'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  const content = project ? getProjectContent(slug) : null
  const profile = getProfile()
  
  if (!project) {
    notFound()
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="text-block space-before-h2">
            <div className="mb-4">
              <Label>{project.tags[0]}</Label>
            </div>
            
            <h1>{project.title}</h1>
            
            <div className="relative aspect-video mb-8 overflow-hidden bg-gray-100 rounded-lg">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="space-y-4 mb-8 text-secondary">
              {project.company && <p><strong>Company:</strong> {project.company}</p>}
              <p><strong>Time:</strong> {project.year}</p>
              <div>
                <strong>Labels:</strong>{' '}
                {project.tags.map((tag, i) => (
                  <span key={tag}>
                    {tag}{i < project.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
            
            {content && (
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-p:text-body prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:my-8 prose-strong:text-primary">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ node, ...props }: any) => {
                      const src = typeof props.src === 'string' ? props.src : ''
                      const alt = typeof props.alt === 'string' ? props.alt : ''
                      return (
                        <div className="my-8">
                          <Image
                            src={src}
                            alt={alt}
                            width={1200}
                            height={800}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      )
                    },
                    h1: ({ node, ...props }: any) => (
                      <h1 className="font-heading text-4xl font-semibold text-primary mt-12 mb-6 space-before-h1">{props.children}</h1>
                    ),
                    h2: ({ node, ...props }: any) => (
                      <h2 className="font-heading text-3xl font-semibold text-primary mt-10 mb-5 space-before-h2">{props.children}</h2>
                    ),
                    h3: ({ node, ...props }: any) => (
                      <h3 className="font-heading text-2xl font-medium text-primary mt-8 mb-4 space-before-h3">{props.children}</h3>
                    ),
                    h4: ({ node, ...props }: any) => (
                      <h4 className="font-heading text-xl font-medium text-primary mt-6 mb-3 space-before-h4">{props.children}</h4>
                    ),
                    p: ({ node, ...props }: any) => (
                      <p className="text-body leading-relaxed mb-4">{props.children}</p>
                    ),
                    ul: ({ node, ...props }: any) => (
                      <ul className="list-disc list-outside mb-4 ml-6 space-y-2 text-body">{props.children}</ul>
                    ),
                    ol: ({ node, ...props }: any) => (
                      <ol className="list-decimal list-outside mb-4 ml-6 space-y-2 text-body">{props.children}</ol>
                    ),
                    li: ({ node, ...props }: any) => (
                      <li className="text-body">{props.children}</li>
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary" {...props} />
                      ) : (
                        <pre className="bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4"><code {...props} /></pre>
                      ),
                    blockquote: ({ node, ...props }: any) => (
                      <blockquote className="border-l-4 border-accent pl-4 italic text-secondary my-4">{props.children}</blockquote>
                    ),
                    a: ({ node, ...props }: any) => (
                      <a className="text-accent hover:underline" {...props} />
                    ),
                    strong: ({ node, ...props }: any) => (
                      <strong className="font-semibold text-primary">{props.children}</strong>
                    ),
                    em: ({ node, ...props }: any) => (
                      <em className="italic">{props.children}</em>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
            
            {project.url && (
              <div className="mt-8">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Visit Project →
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer profile={profile} />
    </div>
  )
}

