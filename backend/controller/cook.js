const cook = (req, res, next) => {
  try {
    const name = req.user.name;
    return res.send(name);
  } catch (err) {
    next(err);
  }
};

module.exports = cook;
