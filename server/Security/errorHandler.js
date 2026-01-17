export const errorHandler = (err, req, res, next) => {
    console.log(err.message);

    res.status(err.status || 500).json({
        error: "Internet Server Error"
    });
};
