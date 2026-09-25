import { useEffect, useState } from "react"

import type { MarkdownFile } from "../content"

interface HomeProps {
  files: MarkdownFile[]
  onSelectFile: (path: string) => void
}

function getRandomFiles(
  files: MarkdownFile[],
  amount: number
): MarkdownFile[] {

  const shuffled = [...files]

  for (let i = shuffled.length - 1; i > 0; i--) {

    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    )

    ;[shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ]

  }

  return shuffled.slice(0, amount)
}

function Home({
  files,
  onSelectFile,
}: HomeProps) {

  const [recommendedFiles, setRecommendedFiles] =
    useState<MarkdownFile[]>(() =>
      getRandomFiles(files, 3)
    )

  useEffect(() => {

    const interval = window.setInterval(() => {

      setRecommendedFiles(
        getRandomFiles(files, 3)
      )

    }, 60000)

    return () => {
      window.clearInterval(interval)
    }

  }, [files])

  const folderNames = new Set(
    files.flatMap((file) => file.folders)
  )

  const areaNames = new Set(
    files
      .map((file) => file.folders[0])
      .filter(Boolean)
  )

  const notesCount = files.length
  const foldersCount = folderNames.size
  const areasCount = areaNames.size

  return (
    <main className="content home-content">

      <article className="home">

        <section className="home-intro">

          <div className="home-label">
            // HACKLAB
          </div>

          <h1>
            Z41F3R HACKLAB
          </h1>

          <p>
            Una base de conocimiento personal enfocada
            en ciberseguridad, programación, investigación
            y experimentación práctica.
          </p>

          <a
            className="home-github"
            href="https://github.com/Z41F3R/HACKLAB"
            target="_blank"
            rel="noopener noreferrer"
          >
            → Ver en GitHub
          </a>

        </section>

        <section className="home-stats">

          <div className="home-stat">

            <span className="home-stat-number">
              {notesCount}
            </span>

            <span className="home-stat-label">
              NOTES
            </span>

          </div>

          <div className="home-stat">

            <span className="home-stat-number">
              {foldersCount}
            </span>

            <span className="home-stat-label">
              FOLDERS
            </span>

          </div>

          <div className="home-stat">

            <span className="home-stat-number">
              {areasCount}
            </span>

            <span className="home-stat-label">
              AREAS
            </span>

          </div>

        </section>

        <section className="home-explore">

          <div className="home-section-title">
            &gt; EXPLORAR NOTAS
          </div>

          <p className="home-section-description">
            ¿No sabes por dónde empezar? Explora alguna
            de las notas disponibles.
          </p>

          <div className="home-notes">

            {recommendedFiles.map((file) => (

              <button
                className="home-note"
                type="button"
                key={file.path}
                onClick={() => onSelectFile(file.path)}
              >

                <span className="home-note-name">
                  {file.name}
                </span>

                <span className="home-note-folder">
                  {file.folders.join(" / ")}
                </span>

                <span className="home-note-arrow">
                  →
                </span>

              </button>

            ))}

          </div>

        </section>

      </article>

    </main>
  )
}

export default Home
