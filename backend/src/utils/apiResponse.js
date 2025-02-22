const apiResponse = (res, statusCode, message, data = null) => {
    const response = {
        timestamp: new Date().toISOString(),
        message,
    };
    if (data) response.data = data;
    return res.status(statusCode).json(response);
};
export default apiResponse;
