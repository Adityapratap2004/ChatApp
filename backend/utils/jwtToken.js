const jwt=require('jsonwebtoken');

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });

    const options={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV!=='development'
    }

    res.cookie('token',token,options);
}

module.exports=generateTokenAndSetCookie