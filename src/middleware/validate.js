// src/middleware/validate.js   zod
// router.post('/example', validate({ body: schema }), handler)
function validate(schemas = {}) {
  return (req, res, next) => {
    try {
      if (schemas.body)  req.body  = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (e) {
      return res.status(400).json({ error: 'validation_error', details: e.errors || String(e) });
    }
  };
}
module.exports = validate;
