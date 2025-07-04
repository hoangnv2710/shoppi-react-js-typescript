import { useState } from "react";
import './searchbar.scss'
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
    const [keyword, setKeyword] = useState<string>("");

    const handleSearch = () => {
        alert(keyword);
    }

    return (
        <div className="searchbar-container">
            <input
                type="text"
                placeholder="Type to search"
                onChange={e => setKeyword(e.target.value)}
            />
            <button type="submit" onClick={handleSearch}>
                <FaSearch className="search-btn" />
            </button>
        </div>
    )
}

export default SearchBar;