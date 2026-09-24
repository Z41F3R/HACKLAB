interface HeaderProps {
  onSearch: (value: string) => void
  onToggleSidebar: () => void
}

function Header({
  onSearch,
  onToggleSidebar,
}: HeaderProps) {

  return (
    <header className="header">

      <div className="logo">
        Z41F3R NOTES
      </div>

      <div className="search">

        <span className="search-icon">
          /
        </span>

        <input
          type="text"
          placeholder="Search notes..."
          onChange={(event) => onSearch(event.target.value)}
        />

      </div>

      <button
        className="menu-button"
        type="button"
        onClick={onToggleSidebar}
        aria-label="Open menu"
      >
        ☰
      </button>

    </header>
  )
}

export default Header
