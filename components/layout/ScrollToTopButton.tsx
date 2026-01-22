'use client'

// Scroll to Top Icon
function ScrollToTopIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Scroll to top"
    >
      <title>Scroll to top</title>
      <path
        d="M10 15V5M10 5L5 10M10 5L15 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
      aria-label="Scroll to top"
    >
      <ScrollToTopIcon />
    </button>
  )
}
