const baseurl="http://localhost:3000/zoid"
const header ={ 'Content-Type': 'application/json'}

function getInfo(){
    let inId=parseInt(document.getElementById("zoidIdInput").value)
    let inName =document.getElementById("zoidNameInput").value
    let inColor =document.getElementById("zoidColorInput").value
    let inHp =parseInt(document.getElementById("zoidHpInput").value)
    let inAtk =parseInt(document.getElementById("zoidAtkInput").value)
    let inDef =parseInt(document.getElementById("zoidDefInput").value)
    let inEva =parseInt(document.getElementById("zoidEvaInput").value)

    let zoidObj={
        id:inId,
        name:inName,
        color:inColor,
        hp:inHp,
        atk:inAtk,
        def:inDef,
        evaCheck:inEva   
    }

    console.log(zoidObj)
    return zoidObj
    
}

async function saveNew(){
    newObj=getInfo();
    let zoidBody=JSON.stringify(newObj)
    console.log(`the body is ${zoidBody}`)
    let res= await fetch(`${baseurl}`,{method:"post", 
    body:zoidBody ,
    mode:"cors",
    headers:{
        'Content-Type':'application/json'
    } 
})


    if(res.status==200){
        window.alert("zoid added")
    }

}

async function updateNew(){
    let newObj=getInfo()
    let Jbody=JSON.stringify(newObj)
    let res=await fetch(`${baseurl}/${newObj.id}`,{method:"PATCH", body: Jbody, headers:{'Content-Type':'application/json'}})
    if(res.status==200){
        window.alert(`updated zoid with id ${newObj.id}`)
    }


}