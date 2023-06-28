type IPagination = {
    page: number;
    loading: boolean;
    next: boolean;
    pages: number;
    updatePage: (page: number) => void
}
function Pagination({page, loading, pages, next, updatePage}: IPagination) {
    const buttonClasses = "border-biege border-2 rounded-md text-biege pr-2 pl-2 disabled:cursor-not-allowed disabled:text-biege/50 disabled:border-biege/50"

    return  <div className='flex gap-2 items-center justify-center mt-4'>
        <button className={buttonClasses} disabled={page === 1 || loading} onClick={() => updatePage(page - 1)}>Prev</button>
        <div className="text-biege"> Page {page} of {pages} </div>
        <button className={buttonClasses} disabled={!next || loading} onClick={() => updatePage(page + 1)}>Next</button>
    </div>
    
}

export default Pagination