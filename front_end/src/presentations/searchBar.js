const SearchBar = (props)=>{
    return(
        <>
        <input className='search' value={props.searchItem} onChange={props.handleSearchItemChange} type='text' placeholder="Search..." />
            <br />
        <button onClick={props.searchActive}>Search</button>
        </>
    )
}

export default SearchBar;