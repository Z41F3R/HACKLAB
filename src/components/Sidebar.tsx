import { useEffect, useState } from "react"
import type { MarkdownFile } from "../content"

interface SidebarProps {
  selectedPath?: string
  onSelectFile: (path: string) => void
  files: MarkdownFile[]
  isOpen: boolean
  onClose: () => void
  onSearch: (value: string) => void
}

interface FolderNode {
  name: string
  path: string
  folders: FolderNode[]
  files: MarkdownFile[]
}

function buildFolderTree(files: MarkdownFile[]): FolderNode[] {

  const root: FolderNode[] = []

  files.forEach((file) => {

    let currentLevel = root
    let currentPath = ""

    file.folders.forEach((folder) => {

      currentPath = currentPath
        ? `${currentPath}/${folder}`
        : folder

      let node = currentLevel.find(
        (item) => item.name === folder
      )

      if (!node) {

        node = {
          name: folder,
          path: currentPath,
          folders: [],
          files: [],
        }

        currentLevel.push(node)
      }

      currentLevel = node.folders
    })

    const parentPath = file.folders.join("/")

    let parent = root

    if (parentPath) {

      const folderParts = file.folders

      for (const folder of folderParts) {

        const node = parent.find(
          (item) => item.name === folder
        )

        if (!node) {
          return
        }

        parent = node.folders
      }
    }

    const targetFolder = parentPath
      ? findFolder(root, parentPath)
      : undefined

    if (targetFolder) {
      targetFolder.files.push(file)
    }

  })

  return root
}

function findFolder(
  folders: FolderNode[],
  path: string
): FolderNode | undefined {

  const parts = path.split("/")

  let current: FolderNode | undefined

  let level = folders

  for (const part of parts) {

    current = level.find(
      (folder) => folder.name === part
    )

    if (!current) {
      return undefined
    }

    level = current.folders
  }

  return current
}

function FolderTree({
  folders,
  selectedPath,
  onSelectFile,
  onClose,
  openFolders,
  toggleFolder,
  level = 0,
}: {
  folders: FolderNode[]
  selectedPath?: string
  onSelectFile: (path: string) => void
  onClose: () => void
  openFolders: string[]
  toggleFolder: (path: string) => void
  level?: number
}) {

  return (
    <>
      {folders.map((folder) => {

        const isOpen = openFolders.includes(
          folder.path
        )

        return (
          <div
            className="folder-group"
            key={folder.path}
          >

            <button
              className="folder"
              type="button"
              onClick={() =>
                toggleFolder(folder.path)
              }
              style={{
                paddingLeft: `${5 + level * 16}px`,
              }}
            >

              <span className="folder-arrow">
                {isOpen ? "▼" : "▶"}
              </span>

              <span>
                {folder.name}
              </span>

            </button>

            {isOpen && (

              <>

                <div className="folder-files">

                  {folder.files.map((file) => (

                    <button
                      className={`file ${
                        selectedPath === file.path
                          ? "file-active"
                          : ""
                      }`}
                      type="button"
                      key={file.path}
                      onClick={() => {
                        onSelectFile(file.path)
                        onClose()
                      }}
                      style={{
                        paddingLeft: `${9 + level * 16}px`,
                      }}
                    >
                      {file.name}
                    </button>

                  ))}

                </div>

                <FolderTree
                  folders={folder.folders}
                  selectedPath={selectedPath}
                  onSelectFile={onSelectFile}
                  onClose={onClose}
                  openFolders={openFolders}
                  toggleFolder={toggleFolder}
                  level={level + 1}
                />

              </>

            )}

          </div>
        )
      })}
    </>
  )
}

function Sidebar({
  selectedPath,
  onSelectFile,
  files,
  isOpen,
  onClose,
  onSearch,
}: SidebarProps) {

  const [openFolders, setOpenFolders] = useState<string[]>([
    "Web",
  ])

  const folderTree = buildFolderTree(files)

  useEffect(() => {

    if (files.length === 0) {
      return
    }

    const allFolders = new Set<string>()

    files.forEach((file) => {

      file.folders.forEach((_, index) => {

        const path = file.folders
          .slice(0, index + 1)
          .join("/")

        allFolders.add(path)

      })

    })

    setOpenFolders((current) => {

      const newFolders = Array.from(allFolders)
        .filter(
          (folder) => !current.includes(folder)
        )

      if (newFolders.length === 0) {
        return current
      }

      return [...current, ...newFolders]
    })

  }, [files])

  const toggleFolder = (path: string) => {

    setOpenFolders((current) => {

      if (current.includes(path)) {

        return current.filter(
          (item) => item !== path
        )

      }

      return [...current, path]
    })
  }

  return (
    <aside
      className={`sidebar ${
        isOpen ? "sidebar-open" : ""
      }`}
    >

      <div className="sidebar-header">

        <div className="sidebar-title">
          CONTENT
        </div>

        <button
          className="sidebar-close"
          type="button"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>

      </div>

      <div className="mobile-search">

        <div className="mobile-search-icon">
          /
        </div>

        <input
          type="text"
          placeholder="Search notes..."
          onChange={(event) => {
            onSearch(event.target.value)
          }}
        />

      </div>

      <nav className="sidebar-content">

        <FolderTree
          folders={folderTree}
          selectedPath={selectedPath}
          onSelectFile={onSelectFile}
          onClose={onClose}
          openFolders={openFolders}
          toggleFolder={toggleFolder}
        />

        {files.length === 0 && (
          <div className="no-results">
            No results found.
          </div>
        )}

      </nav>

    </aside>
  )
}

export default Sidebar


