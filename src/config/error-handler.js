function errorHandler(err, req, res, next) {
  console.log('Entramos en el control de errores');
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
}

module.exports = errorHandler;
