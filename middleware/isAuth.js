function isAuth(req,res,next) {
    console.log('Authorized')
    const { user } = req;
    if (!user) {
        return res.status(401).redirect('/authentication/login');
    };
    next();
};

function loginAuth(req,res,next) {
    const { user } = req;
    if (user) {
        return res.status(200).redirect('/todo')
    };
    next()
  
};

function logoutAuth(req,res,next) {
    const { user } = req;
    if (!user) {
        
    };
    next()
  
};







module.exports = { isAuth, loginAuth, logoutAuth };