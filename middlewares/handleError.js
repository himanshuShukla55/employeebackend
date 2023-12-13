const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({ success: false, msg: err.message });
};

module.exports = { handleError };
