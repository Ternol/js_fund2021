export const getPageCount = (totalPages, limit) => {
    return Math.ceil(totalPages/limit);
}

export const getTotalPages = (totalCount) => {
    const result = [];
    for (let i=1; i<totalCount+1; i++) {
        result.push(i)
    }
    return result;
}