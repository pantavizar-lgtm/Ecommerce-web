interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="input-group">
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>

      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {searchTerm && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onSearchChange('')}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
