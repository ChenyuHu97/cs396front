let flag=false;
let category = -1;
let gameList = [];
function show_menu(){
		var title1=document.getElementById("title");
		if(flag){
			title1.style.display="none";
			flag=false;
		}else{
			title1.style.display="block";
			flag=true;
		}
}
function show_menu1(){
		var title1=document.getElementById("title");
			title1.style.display="none";
			flag=false;
}

function clickMe(cat){
	let result ="";
	for(let i = 0;i<gameList.length;i++){
		if(gameList[i].category == cat){
			result +=`<ul>
			<li>
				<img src="${gameList[i].imageUrl}" class="img-li" id="MyImage">
				<div class="info">
					<h3>${gameList[i].gameName}</h3>
					<h4>Release Time:</h4> <p>${gameList[i].releaseTime}</p>
					<h4>Company:</h4><p> ${gameList[i].companyName}</p>
					<h4>Category</h4> <p>${gameList[i].category}</p>
					<h4>Comments</h4>
					<p>
						${gameList[i].comments}
					</p>
					<div class="img-btn">
						<div class="ratings"><button id="ratings">ratings: ${gameList[i].ratings}</button></div>
					</div>
				</div>
			</li>

		</ul>
			
			`
		}
	}
	document.getElementById("img-content").innerHTML =  result;
}

async function getVideoGames(){
    await fetch("http://localhost:8083/game/list")
    .then(Response=>Response.json()).then(data=>{
        console.log(data.data);
        let myList = data.data;
		gameList = myList;
        let myArea = document.getElementById("img-content");
        let result ="";
        for(let i =0;i<myList.length;i++){
            result += `<ul>
			<li>
				<img src="${myList[i].imageUrl}" class="img-li" id="MyImage">
				<div class="info">
					<h3>${myList[i].gameName}</h3>
					<h4>Release Time:</h4> <p>${myList[i].releaseTime}</p>
					<h4>Company:</h4><p> ${myList[i].companyName}</p>
					<h4>Category</h4> <p>${myList[i].category}</p>
					<h4>Comments</h4>
					<p>
						${myList[i].comments}
					</p>
					<div class="img-btn">
						<div class="ratings"><button id="ratings">ratings: ${myList[i].ratings}</button></div>
					</div>
				</div>
			</li>

		</ul>`
        }
    myArea.innerHTML =  result;
    })

}

getVideoGames();