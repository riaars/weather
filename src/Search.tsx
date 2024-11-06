import React from "react";

interface SearchProps {
  onChange: (e: any) => void;
  value: string;
  onClick: () => void;
}
function Search(props: SearchProps) {
  return (
    <div>
      <div className="search-menu">
        <input
          className="input-search"
          onChange={props.onChange}
          placeholder="Enter a city..."
          value={props.value}
        />
        <button className="btn-primary" onClick={props.onClick}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
