//Saving the data in localStorage


function save(){
    //Setting values in local Storage
    let userName = localStorage.setItem("uid","EmployeeSubmit");
    let password = localStorage.setItem("pw",12345);

    //Retrieving data from Login page
    let uid = document.getElementById("userName").value;
    let pw = document.getElementById("password").value;

    //Validation and redirecting
    if(uid === localStorage.getItem("uid") || pw === localStorage.getItem("pw"))
    {
        localStorage.clear();
        window.open("Resume.html",self)
        window.close("index.html",self)
       // window.location.replace="Resume.html";
        

    }else{
        alert("Invalid User");
        localStorage.clear();
    }
    


}