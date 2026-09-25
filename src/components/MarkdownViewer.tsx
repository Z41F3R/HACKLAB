import { useEffect, useRef } from "react"
import { marked } from "marked"
import hljs from "highlight.js"

import "highlight.js/styles/github-dark.css"

interface MarkdownViewerProps {
  content: string
}

function MarkdownViewer({
  content,
}: MarkdownViewerProps) {

  const articleRef = useRef<HTMLElement>(null)

  const html = marked.parse(content)

  useEffect(() => {

    if (!articleRef.current) {
      return
    }

    const codeBlocks =
      articleRef.current.querySelectorAll(
        "pre code"
      )

    codeBlocks.forEach((block) => {

      hljs.highlightElement(
        block as HTMLElement
      )

    })

  }, [content])

  return (
    <main className="content">

      <article
        ref={articleRef}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />

    </main>
  )
}

export default MarkdownViewer
