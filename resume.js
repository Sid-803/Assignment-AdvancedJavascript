let id = 0;
let nextId;
let previousId;
let size=0;
const initArr1=[];
const initArr2=[];
const initArr3=[];
let flag = false;
let filterInt=0;
let val=""



function fetchLocalData(id)
{   
    
    fetch("./LocalData.json")
    .then(response => {
       return response.json();
    })
    .then(data => displayResults(data,id));
    
}






function displayResults(jsonData,id)
{   
    let initArr = jsonData.resume
    
    //let val = document.getElementById("search-box").value

    initArr.forEach(element =>{
        if(element.basics.AppliedFor === "Manager"){
            initArr1.push(element.id-1)
        }
        if(element.basics.AppliedFor === "Software Engineer"){
            initArr2.push(element.id-1)
        }
        if(element.basics.AppliedFor === "HR"){
            initArr3.push(element.id-1)
        }
    })
    
    
    
    let name = document.getElementById("name");
    name.innerText = jsonData.resume[id].basics.name;

    let designation = document.getElementById("designation");
    designation.innerText=`Applied For : ${jsonData.resume[id].basics.AppliedFor}`

    let phoneNumber = document.getElementById("phoneNumber");
    phoneNumber.innerText = jsonData.resume[id].basics.phone;

    let email = document.getElementById("email");
    email.innerText = jsonData.resume[id].basics.email;

    let LinkedIn = document.getElementById("LinkedIn");
    LinkedIn.innerText = jsonData.resume[id].basics.profiles.url;

    let skills = document.getElementById("Skills")
    let skillArr = jsonData.resume[id].skills.keywords;
    let skillHeader = document.createElement("h3")
    skillHeader.setAttribute("class","header-sidebar")
    skillHeader.innerHTML=`<b>Technical Skills</b>`
    skills.append(skillHeader)
    skillArr.forEach(element => {
        let skillName = document.createElement("p");
        skillName.setAttribute("class","content-sidebar")
        skillName.innerText=element;
        skills.append(skillName)
    });

    let hobbies = document.getElementById("hobbies")
    let hobbiesArr = jsonData.resume[id].interests.hobbies
    let hobbiesHeader = document.createElement("h3")
    hobbiesHeader.setAttribute("class","header-sidebar")
    hobbiesHeader.innerHTML=`<b>Hobbies</b>`
    hobbies.append(hobbiesHeader)
    hobbiesArr.forEach(element => {
        let hobbName = document.createElement("p");
        hobbName.setAttribute("class","content-sidebar")
        hobbName.innerText=element;
        hobbies.append(hobbName)

    });

    let WorkEx = document.getElementById("WorkEx")
    let WorkExArr = jsonData.resume[id].work
    let WorkExHeader = document.createElement("h3")
    WorkExHeader.setAttribute("class","heading1")
    WorkExHeader.innerHTML=`<b>Work Experience in Previous Company</b>`
    WorkEx.append(WorkExHeader)
    Object.keys(WorkExArr).forEach(function(key,index){
        let WorkExName = document.createElement("p");
        WorkExName.setAttribute("class","paras")
        WorkExName.innerHTML= `<b> ${key} </b>: ${WorkExArr[key]}`;
        WorkEx.append(WorkExName)

    });

    let pjt = document.getElementById("Project")
    let pjtObj = jsonData.resume[id].projects
    let pjtHeader = document.createElement("h3")
    pjtHeader.setAttribute("class","heading1")
    pjtHeader.innerHTML=`<b>Projects</b>`
    pjt.append(pjtHeader)   
    let pjtName = document.createElement("p");
    pjtName.setAttribute("class","paras")
    pjtName.innerHTML =`<b>${pjtObj["name"]}</b>:${pjtObj["description"]}`
    pjt.append(pjtName)

    let edu = document.getElementById("Education")
    let eduObj = jsonData.resume[id].education
    let eduHeader = document.createElement("h3")
    eduHeader.setAttribute("class","heading1")
    eduHeader.innerHTML=`<b>Education</b>`
    edu.append(eduHeader)  
    let objName = document.createElement("p");
    objName.setAttribute("class","paras1")
    objName.innerHTML =`<ul>
                        <li><b>UG:</b> ${eduObj.UG["institute"]}, ${eduObj.UG["course"]}, ${eduObj.UG["Start Date"]}, ${eduObj.UG["End Date"]}, ${eduObj.UG["cgpa"]}</li>
                        <li><b>PU:</b> ${eduObj["Senior Secondary"]["institute"]}, ${eduObj["Senior Secondary"]["cgpa"]} </li>
                        <li><b>High School:</b> ${eduObj["High School"]["institute"]},${eduObj["High School"]["cgpa"]}</li>
                        </ul>`
    edu.append(objName)

    let intern = document.getElementById("Internship")
    let internObj=jsonData.resume[id].Internship
    let internHeader = document.createElement("h3")
    internHeader.setAttribute("class","heading1")
    internHeader.innerHTML=`<b>Internship</b>`
    intern.append(internHeader) 
    let internName = document.createElement("p")
    internName.setAttribute("class","paras1")
    internName.innerHTML=`<ul>
                            <li><b>Company Name:</b> ${internObj["Company Name"]}</li>
                            <li><b>Position:</b> ${internObj["Position"]}</li>
                            <li><b>Start Date:</b> ${internObj["Start Date"]}</li>
                            <li><b>End Date:</b> ${internObj["End Date"]}</li>
                            <li><b>Summary:</b> ${internObj.Summary}</li>
                            </ul>`
    intern.append(internName);
    
    let achievement = document.getElementById("Achievements")
    let achievementArray=jsonData.resume[id].achievements.Summary
    let achievementHeader = document.createElement("h3")
    achievementHeader.setAttribute("class","heading1")
    achievementHeader.innerHTML=`<b>Achievements</b>`
    achievement.append(achievementHeader) 
    achievementArray.forEach(element =>{
        let achievementName = document.createElement("p")
    achievementName.setAttribute("class","paras1")
    achievementName.innerHTML=`<ul>
                                <li>${element}</li>
                                </ul>`
    achievement.append(achievementName)
    })
    
    nextId=id+1; 
    previousId=id-1; 
    id=nextId 
    
    size=initArr.length
    //console.log(initArr1)
}

function filterPrevious()
{       
        if(flag){

        }
        if(previousId >=0 && !flag ){
            let divArr1 = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr1.forEach(element => {
                let div1 = document.getElementById(element);    
                while(div1.firstChild) {
                div1.removeChild(div1.firstChild);
                }
            })
               
            fetchLocalData(previousId)
        }
        if(previousId<0 && !flag){
            id=0
            let divArr = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr.forEach(element => {
                let div = document.getElementById(element);    
                while(div.firstChild) {
                div.removeChild(div.firstChild);
                }
            })
            fetchLocalData(id)
        }
            

}

let searchElm = document.querySelector(".search-box");
searchElm.addEventListener("keypress",setFilter)

function setFilter(e)
{   
    val = document.getElementById("search-box").value
    if(e.keyCode == 13 && val!="Manager" && val!="Software Engineer" && val!="HR" ){
        
        
        let div = document.getElementById("outside");    
        while(div.firstChild) {
        div.removeChild(div.firstChild);
        }
       
        let dom = document.getElementById("outside")
        let img = document.createElement("img")
        img.setAttribute("src","imageNaN.jpg")
        img.setAttribute("class","img2")
        dom.append(img)
        
    }

   
    if(e.keyCode == 13 && val==="Manager"){
        id=initArr1[filterInt]
        let divArr = [
            "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
        ]
        divArr.forEach(element => {
            let div = document.getElementById(element);    
            while(div.firstChild) {
            div.removeChild(div.firstChild);
            }
        })
        fetchLocalData(id)
        flag=true;
        filterInt = filterInt+1
        
    }

    if(e.keyCode == 13 && val==="Software Engineer"){
        id=initArr2[filterInt]
        let divArr = [
            "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
        ]
        divArr.forEach(element => {
            let div = document.getElementById(element);    
            while(div.firstChild) {
            div.removeChild(div.firstChild);
            }
        })
        fetchLocalData(id)
        flag=true;
        filterInt = filterInt+1
        
    }

    if(e.keyCode == 13 && val==="HR"){
        id=initArr3[filterInt]
        let divArr = [
            "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
        ]
        divArr.forEach(element => {
            let div = document.getElementById(element);    
            while(div.firstChild) {
            div.removeChild(div.firstChild);
            }
        })
        fetchLocalData(id)
        flag=true;
        filterInt = filterInt+1
        
    }
    
    
}

function filterNext()
{       

        if(flag && filterInt<initArr1.length && val==="Manager"){
            id=initArr1[filterInt]
            let divArr1 = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr1.forEach(element => {
                let div1 = document.getElementById(element);    
                while(div1.firstChild) {
                div1.removeChild(div1.firstChild);
                }
            })
            //alert("ok")
            console.log(flag)
            fetchLocalData(id)
            filterInt=filterInt+1
        }else if(flag && filterInt<initArr2.length && val==="Software Engineer"){
            id=initArr2[filterInt]
            let divArr1 = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr1.forEach(element => {
                let div1 = document.getElementById(element);    
                while(div1.firstChild) {
                div1.removeChild(div1.firstChild);
                }
            })
            //alert("ok")
            console.log(flag)
            fetchLocalData(id)
            filterInt=filterInt+1
        }else if(flag && filterInt<initArr3.length && val==="HR"){
            id=initArr3[filterInt]
            let divArr1 = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr1.forEach(element => {
                let div1 = document.getElementById(element);    
                while(div1.firstChild) {
                div1.removeChild(div1.firstChild);
                }
            })
            //alert("ok")
            console.log(flag)
            fetchLocalData(id)
            filterInt=filterInt+1
        }else{
            let divArr1 = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr1.forEach(element => {
                let div1 = document.getElementById(element);    
                while(div1.firstChild) {
                div1.removeChild(div1.firstChild);
                }
            })
            flag=false;
        }

        if(nextId<size && !flag){
            let divArr = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr.forEach(element => {
                let div = document.getElementById(element);    
                while(div.firstChild) {
                div.removeChild(div.firstChild);
                }
            })
           
            fetchLocalData(nextId)
        }
        if(nextId===size || nextId>size && !flag){
            id=size-1
            let divArr = [
                "Skills","hobbies","WorkEx","Project","Education","Internship","Achievements"
            ]
            divArr.forEach(element => {
                let div = document.getElementById(element);    
                while(div.firstChild) {
                div.removeChild(div.firstChild);
                }
            })
            fetchLocalData(id)
        }
        

}
fetchLocalData(id);
