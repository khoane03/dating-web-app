const apiResponse = (res, statusCode, message, data = null, totalRecords) => {
    const response = {
        timestamp: new Date().toISOString(),
        message,
        code: statusCode,
        totalPages: data ? data.length : 0,
        totalRecords: totalRecords ? totalRecords : 0,
    };
    if (data) response.data = data;
    return res.status(statusCode).json(response);
};
export default apiResponse;
