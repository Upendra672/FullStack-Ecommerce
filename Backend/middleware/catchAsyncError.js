//here we are using higher order function 
//higher-order function that takes theFunc as a parameter.

module.exports = (theFunc) => (req,res, next) =>{

    Promise.resolve(theFunc(req,res,next)).catch(next);

};