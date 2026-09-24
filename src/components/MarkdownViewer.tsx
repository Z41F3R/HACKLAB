import { marked } from "marked"

interface MarkdownViewerProps {
  content: string
}

function MarkdownViewer({
  content,
}: MarkdownViewerProps) {

  const html = marked.parse(content)

  return (
    <main className="content">

      <article
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />

    </main>
  )
}

export default MarkdownViewer
