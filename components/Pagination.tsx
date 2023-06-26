type IPagination = {
    page: number;
    loading: boolean;
    next: boolean;
    pages: number;
    updatePage: (page: number) => void
}
function Pagination({page, loading, pages, next, updatePage}: IPagination) {

    return (
        <div className='flex gap-2 items-center justify-center'>
        <button disabled={page === 1 || loading} onClick={() => updatePage(page - 1)}>Prev</button>
        <div> Page {page} of {pages} </div>
        <button disabled={!next || loading} onClick={() => updatePage(page + 1)}>Next</button>
    </div>
    )
}

export default Pagination