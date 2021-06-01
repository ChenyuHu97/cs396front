// const cors = require("cors")
// app.use(cors())

let isLogin = false;



async function login(){
	let Myusername = document.getElementById("Username").value;
	let Mypassword = document.getElementById("Password").value;
	let MyUrl = "http://localhost:8083/adminlogin?username="+Myusername+"&password="+Mypassword;
	fetch(MyUrl, { 
    method: 'POST'
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res);
	let jsonObject= JSON.parse(res);
	if(jsonObject.message =="SUCCESS"){
	location.href="management.html";
	}else{
		Swal.fire({
			icon: 'error',
			title: 'Failed',
			text: 'Incorrect username or password'
		}
		  )
	}
  })

}






