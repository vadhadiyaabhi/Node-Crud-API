const AnySchema = require("yup");
const log = require("../logger/index")

const validate = (schema) => async(req, res, next) => {
    try{

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        return next();

    }catch(err){
        log.error(err);
        return res.status(400).send(err.message);
    }
}

module.exports = validate;