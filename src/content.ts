const markdownFiles = import.meta.glob(
  "../content/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
)

export interface MarkdownFile {
  path: string
  name: string
  folder: string
  folders: string[]
  content: string
}

const files: MarkdownFile[] = Object.entries(markdownFiles).map(
  ([path, content]) => {

    const parts = path.split("/")

    const fileName = parts[parts.length - 1]

    const folderParts = parts.slice(
      2,
      parts.length - 1
    )

    return {
      path,
      name: fileName.replace(".md", ""),
      folder: folderParts.join("/"),
      folders: folderParts,
      content: content as string,
    }
  }
)

export default files

