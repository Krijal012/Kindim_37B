export const authenticate = (req, res, next) => {
    // Simple authentication middleware
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // In production, verify JWT token here
    // For now, we'll just extract userId from token (simplified)
    try {
        // Simulated token verification
        req.userId = 1; // In production, decode from JWT
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};