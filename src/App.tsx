import { useEffect, useState } from "react"

import markdownFiles from "./content"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MarkdownViewer from "./components/MarkdownViewer"
import Home from "./components/Home"

function getFileFromHash() {

  const hash = window.location.hash

  if (!hash.startsWith("#/")) {
    return undefined
  }

  const route = decodeURIComponent(
    hash.slice(2)
  )

  return markdownFiles.find(
    (file) => {

      const fileRoute = [
        ...file.folders,
        file.name,
      ].join("/")

      return fileRoute === route
    }
  )
}

function App() {

  const [selectedPath, setSelectedPath] = useState(
    () =>
      getFileFromHash()?.path
  )

  const [search, setSearch] = useState("")

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {

    const handleHashChange = () => {

      const file = getFileFromHash()

      if (file) {
        setSelectedPath(file.path)
      }

    }

    window.addEventListener(
      "hashchange",
      handleHashChange
    )

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      )
    }

  }, [])

  const selectedFile = markdownFiles.find(
    (file) => file.path === selectedPath
  )

  const filteredFiles = markdownFiles.filter((file) => {

    const query = search.toLowerCase().trim()

    if (!query) {
      return true
    }

    return (
      file.name.toLowerCase().includes(query) ||
      file.folders.some(
        (folder) =>
          folder.toLowerCase().includes(query)
      ) ||
      file.content.toLowerCase().includes(query)
    )
  })

  const selectFile = (path: string) => {

    const file = markdownFiles.find(
      (item) => item.path === path
    )

    if (!file) {
      return
    }

    setSelectedPath(path)

    const route = [
      ...file.folders,
      file.name,
    ].join("/")

    const encodedRoute = encodeURIComponent(
      route
    ).replace(/%2F/g, "/")

    const nextHash = `#/${encodedRoute}`

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash
    }

  }

  return (
    <div className="app">

      <Header
        onSearch={setSearch}
        onToggleSidebar={() => {
          setSidebarOpen((current) => !current)
        }}
      />

      <div className="layout">

        <Sidebar
          selectedPath={selectedPath}
          onSelectFile={selectFile}
          files={filteredFiles}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSearch={setSearch}
        />

        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {selectedFile ? (

          <MarkdownViewer
            content={selectedFile.content}
          />

        ) : (

          <Home
            files={markdownFiles}
            onSelectFile={selectFile}
          />

        )}

      </div>

    </div>
  )
}

export default App
