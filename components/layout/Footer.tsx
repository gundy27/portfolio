import Link from 'next/link'

const footerLinks = {
  main: [
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Resources', href: '/resources' },
    { name: 'Timeline', href: '/timeline' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/gundy27' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gradient">Dan Gunderson</h3>
            <p className="text-sm text-slate-400">
              Product Manager & Full-Stack Developer
            </p>
            <p className="text-sm text-slate-400">
              Building innovative solutions with AI and modern web technologies.
            </p>
          </div>
          
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold text-slate-200">Navigation</h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerLinks.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold text-slate-200">Connect</h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerLinks.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800/50 pt-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Dan Gunderson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

