export const successJson = (message = null, data = null) => {
    return {
        success: true,
        message: message,
        data: data
    };
};

export const errorJson = (message = null, data = null) => {
    return {
        success: false,
        message: message,
        data: data
    };
};