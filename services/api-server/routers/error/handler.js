module.exports = (error, req, res, next) => {
  if (!error.status) {
    console.log('============  Internal Server Error  ==============');
    console.error(error);
  }

  res.status(error.status || 500);

  const response = {
    status: error.status || 500,
    message: error.message
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  res.json(response);
};
