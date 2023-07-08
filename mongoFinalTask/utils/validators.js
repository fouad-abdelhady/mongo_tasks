 const validateBody = (bodySchema) => (req, res, next)=>{
    let body = req.body;
    let error = bodySchema.validate(body).error;
    
    if(error){
        res.status(400).send({message: getMessage(error)});
        return;
    }
    next();
}

function getMessage(error){
    const problem = error.details[0].context.key;
    switch(problem){
        case "userName": return "Invalid Email";
        case "password": return "Invalid Password, password: must be 8 characters with at least 1 capital and 1 small and 1 special character";
        default: return "Invalid Credentials";
    }
}
export default validateBody;