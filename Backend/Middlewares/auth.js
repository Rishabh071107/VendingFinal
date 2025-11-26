import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
  if (req.user.id.role !== "admin")
    return res.status(403).json({ message: "Admins only" });

  next();
  } catch (e) {
             return res.status(403).json({ message: "Invalid or expired token" });
              }

};