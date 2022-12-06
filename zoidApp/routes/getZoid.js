const { json } = require("express");
var express=require("express");
var router=express.Router();

var zoidList=[
    {id:1,name:"liger zero", color:"white", hp:50, atk:30, def:25,evaCheck:50},
    {id:2,name:"blade liger",color:"blue", hp:35, atk:40, def:20,evaCheck:75},
    {id:3,name:"mursame liger",color:"blue and black" ,hp:45 ,atk:35, def:30, evaCheck:65}]

function fight(attacker, defender){
    let attackRole=Math.floor(Math.random()*100)
    console.log(`${attacker.name} attack role is ${attackRole}`)
    if(attackRole>defender.evaCheck){
        let damage=attacker.atk-defender.def
        console.log(`the damage is ${damage}`)
        defender.hp=defender.hp-damage
    }
}

router.get("/",function(req,res,next){
    res.json(zoidList)
});

router.get("/:id",(req,res,next)=>{
    let id=parseInt(req.params.id);
    let getZoid=zoidList.find((zoid)=>{
        return zoid.id=id;
    })
    res.json(getZoid);
})

router.post("/",function(req,res,next){
     console.log(`the request body for a post is ${JSON.stringify(req.body)}`)
    let newZoid={name:"", color:""};
   
    newZoid.name=req.body.name;
    newZoid.color=req.body.color;
    newZoid.id=parseInt(req.body.id);
    newZoid.hp=parseInt(req.body.hp);
    newZoid.atk=parseInt(req.body.atk);
    newZoid.def=parseInt(req.body.def);
    newZoid.evaCheck=parseInt(req.body.evaCheck);
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
    zoidList[index].atk=parseInt(req.body.atk);
    zoidList[index].def=parseInt(req.body.def);
    zoidList[index].hp=parseInt(req.body.hp);
    zoidList[index].evaCheck=parseInt(req.body.evaCheck);
    
    res.send("updated "+JSON.stringify(zoidList[index]));
})

router.get("/fight/:id1/:id2", (req, res,next)=>{
    let id1=parseInt(req.params.id1)
    let id2=parseInt(req.params.id2)
    let index1=zoidList.findIndex((zoid)=>{
        return zoid.id==id1
    })
    let index2=zoidList.findIndex((zoid)=>{
        return zoid.id==id2
    })
    let combant1=zoidList[index1]
    let combant2=zoidList[index2]

    let attacker=true
    while(combant1.hp>0 && combant2.hp>0){
        if(attacker){
            console.log("in if statement")
            fight(combant1,combant2)
            attacker=false
            
        }else{
            console.log("in else statement")
            fight(combant2,combant1)
            attacker=true
        }
        console.log(JSON.stringify(zoidList[index1])+" "+JSON.stringify(zoidList[index2]))
        console.log()

    }
    let winner=null;
    if(combant1.hp>0){
        winner=combant1
    }else{
        winner=combant2
    }
    
    
    
    res.json(winner)



})

module.exports=router;