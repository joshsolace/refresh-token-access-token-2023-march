const roleBasedAccess = (roles) => {
  return function (req, res, next) {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(401).json({ message: "Permission Denied - You are not an admin" });
    }
      console.log(req.user);
      console.log(roles);
  };
};

module.exports = roleBasedAccess;
