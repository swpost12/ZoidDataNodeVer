var zoid;
const baseurl="http://localhost:3000/zoid"


async function getSingleZoid(){
    let searchId=document.getElementById("findSingle").value
    let res= await fetch(`${baseurl}/${searchId}`,{method:"get"})
    if(res.status==200){
        zoid=await res.json()
        console.log(`the get res is ${JSON.stringify(zoid)}`)
        document.getElementById("nameDysplay").innerHTML=zoid.name
        document.getElementById("colorDysplay").innerHTML=zoid.color
        document.getElementById("hpDysplay").innerHTML=zoid.hp
        document.getElementById("atkDysplay").innerHTML=zoid.atk
        document.getElementById("defDysplay").innerHTML=zoid.def
        document.getElementById("evaChanceDysplay").innerHTML=zoid.evaCheck

    }

}

async function fightZoid(){
    let id1=document.getElementById("zoid1").value
    let id2=document.getElementById("zoid2").value

    let res=await fetch(`${baseurl}/fight/${id1}/${id2}`,{method:"get"})

    if(res.status== 200){
        let winner= await res.json()
        document.getElementById("winner").innerHTML=JSON.stringify(winner)
    }
}