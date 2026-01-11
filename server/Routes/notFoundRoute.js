export const notFoundRoute = (req, res) => {
    res.status(404).json({
        error: "API Route not found"
    });
};
