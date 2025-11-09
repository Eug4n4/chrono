import jwt from "jsonwebtoken";
function tokenMustBeValid(paramName) {
    return (req, res, next) => {
        if (paramName) {
            try {
                const payload = jwt.verify(
                    req.params[paramName],
                    process.env.JWT_SECRET,
                );
                req.tokenPayload = payload;
                next();
            } catch (e) {
                return res.status(400).json({ message: "Token is invalid" });
            }
        }
    };
}

export { tokenMustBeValid };
