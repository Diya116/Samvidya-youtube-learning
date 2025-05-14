import express,{Request,Response}from 'express';
const router=express.Router();
router.get("/auth",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"auth route"
    });
});
export default router;