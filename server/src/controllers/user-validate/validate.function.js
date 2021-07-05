module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      const test = await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.isJoi == true) {
        res.status(422).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  };
};
