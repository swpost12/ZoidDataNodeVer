var express=require("express");
var router=express.Router();

var zoidList=[
    {id:1,name:"liger zero", color:"white"},
    {id:2,name:"blade liger",color:"blue"},
    {id:3,name:"mursame liger",color:"blue and black"}]

router.get("/",function(req,res,next){
    res.json(zoidList)
});

router.post("/",function(req,res,next){
    let newZoid={name:"", color:""};
    newZoid.name=req.body.name;
    newZoid.color=req.body.color;
    newZoid.id=parseInt(req.body.id);
    zoidList.push(newZoid);
    res.send("added new zoid");
})

router.delete("/:id", function(req,res,next){
    let id=parseInt(req.params.id);
    let index=zoidList.findIndex((zoid)=>{
        return zoid.id==id
    })
    res.send("deleted "+JSON.stringify(zoidList.splice(index,1)));

})

router.patch("/:id", function(req,res,next){
    let id=parseInt(req.params.id);

   let index=zoidList.findIndex((zoid)=>{
    return zoid.id==id
   })

    
    zoidList[index].color=req.body.color;
    zoidList[index].name=req.body.name;
    res.send("updated "+JSON.stringify(zoidList[index]));
})

module.exports=router;