
export const validateBargain = (req, res, next) => {
    const { productId, productName, originalPrice, proposedPrice } = req.body;
    
    if (!productId || !productName || !originalPrice || !proposedPrice) {
        return res.status(400).json({ 
            error: 'Missing required fields: productId, productName, originalPrice, proposedPrice' 
        });
    }
    
    if (parseFloat(proposedPrice) <= 0) {
        return res.status(400).json({ 
            error: 'Proposed price must be greater than 0' 
        });
    }
    
    next();
};

export const validateOrder = (req, res, next) => {
    const { items, totalAmount } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ 
            error: 'Order must contain at least one item' 
        });
    }
    
    if (!totalAmount || parseFloat(totalAmount) <= 0) {
        return res.status(400).json({ 
            error: 'Invalid total amount' 
        });
    }
    
    next();
};