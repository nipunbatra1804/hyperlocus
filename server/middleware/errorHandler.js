const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    res.status(500).json("Something went wrong in the server. Check logs");
  }
};

module.exports = errorHandler;
