let Item = [];


function displayImage(pictureId){
    console.log(pictureId);
    let myImage = "<img src="+pictureId+" style=width:400px;height:360px>";
    console.log(myImage);
    Swal.fire({
        title:"Game Image",
        html: myImage,
        showCloseButton:true,
        showConfirmButton:false
    }
      )
}


async function finishUploading(){
    let myList = ['nothing','FPS','RTS','MOBA','RPG','Other'];
    let gameId = document.getElementById("Id").value;
    let gameName = document.getElementById("pname").value;
    let gameRating = document.getElementById("Rating").value;
    let gameCompany = document.getElementById("Company").value;
    let imageURL = document.getElementById("URL").value;
    let comments = document.getElementById("Comments").value;
    let gameCategory = document.getElementById("category").value;
    let rating = document.getElementById("Rating").value;
    let releaseTime = document.getElementById("Release").value;
    if(gameName.length == 0 && gameName.length ==0 && gameCompany.length == 0
        && imageURL.length == 0 && comments.length == 0 && rating.length == 0 && releaseTime.length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: "The input cannot be empty"
            })
    }

    else if(gameCategory == -1){
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "You need select the game category!"
        })
    }

    else{
        document.getElementById("errorMessage").innerHTML = "";
        let data = {};
        data["gameName"] = gameName;
        data["releaseTime"] = releaseTime;
        data["companyName"] = gameCompany;
        data["category"] = myList[gameCategory];
        data["comments"] = comments;
        data["ratings"] =  rating;
        data["imageUrl"] = imageURL;
        data["id"] = gameId;
        fetch("http://localhost:8083/game/update",{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            return res.text();
        }).then(result=>{
            console.log(result);
            let jsonObject= JSON.parse(result);
            if(jsonObject.message == "SUCCESS"){
                Swal.fire(
                    'Good job!',
                    'Create a new game rating Successfully',
                    'success'
                  )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: jsonObject.message
                })
            }
        })
    }



    console.log(gameName);
    console.log(gameRating);
    console.log(gameCompany);
    console.log(imageURL);
    console.log(comments);
    console.log(gameCategory);



}


function displayUpdate(num){
    console.log(Item)
    let MyItem;
    let myArea = document.getElementById("thePage");
    for(let i = 0; i<Item.length;i++){
        if(Item[i].id == num){
            MyItem = Item[i];
        }
    }
    console.log(MyItem);
    console.log(MyItem.releaseTime)
    myArea.innerHTML = `
    <div class="container">
		<fieldset>
			<legend>update game rating</legend>
			<form method="POST" action="#">
				<div id="errorMessage"></div>
				<ul class="ulform">
                    <li>
						<span>Game Id</span>
						<span id="errPname"></span>
						<input id="Id" name="Id" readonly="readonly"/>
					</li>
					<li>
						<span>Game name</span>
						<span id="errPname"></span>
						<input id="pname" name="pname"/>
					</li>
					<li>
						<span>Game category</span>
						<span id="errCategory"></span>
						<select id="category" name="category">
							<option value="-1">Select Category</option>
							<option value="1">FPS</option>
							<option value="2">RTS</option>
							<option value="3">MOBA</option>
							<option value="4">RPG</option>
							<option value="5">Other</option>
						</select>
					</li>
					<li>
						<span>Game Rating</span>
						<span id="errRating"></span>
						<input id="Rating" name="Rating"/>
					</li>
					<li>
						<span>Game Company</span>
						<span id="errCompany"></span>
						<input id="Company" name="Company"/>
					</li>

					<li>
						<span>Release Time</span>
						<span id="errRelase"></span>
						<input id="Release" name="Relase"/>
					</li>
					<li>
						<span>Image URL</span>
						<span id="errURL"></span>
						<input id="URL" name="URL"/>
					</li>

					<li>
						<span>Comments</span>
						<span id="errComments"></span>
						<textarea
							id="Comments" name="Comments"/></textarea>
					</li>
					<li style="text-align: center;">
						<button type="button" class="btn-button" onclick="finishUploading()">Submit</button>
					</li>
				</ul>
			</form>
		</fieldset>
	</div>
    `
    document.getElementById("Id").value = MyItem.id;
    document.getElementById("pname").value = MyItem.gameName;
    document.getElementById("Rating").value = MyItem.ratings;
    document.getElementById("Company").value = MyItem.companyName;  
    document.getElementById("Release").value = MyItem.releaseTime;
    document.getElementById("URL").value = MyItem.imageUrl;
    document.getElementById("Comments").value = MyItem.comments;
    if(MyItem.category=="FPS"){
        document.getElementById("category").value = 1;
    }else if(MyItem.category=="RTS"){
        document.getElementById("category").value = 2;
    }else if(MyItem.category=="MOBA"){
        document.getElementById("category").value = 3;
    }else if(MyItem.category=="RPG"){
        document.getElementById("category").value = 4;
    }else if(MyItem.category=="Other"){
        document.getElementById("category").value = 5;
    }

    
}
async function deleteGame(num){
    let MyUrl = "http://localhost:8083/game/delete?id="+num;
	fetch(MyUrl, { 
    method: 'POST'
  })
  .then((res)=>{
    return res.text()
  }).then((result)=>{
    let jsonObject= JSON.parse(result);
    if(jsonObject.message =="SUCCESS"){
		Swal.fire(
			'Good job!',
			'Delete Successfully',
			'success'
		  )
	}else{
		Swal.fire({
			icon: 'error',
			title: 'Failed',
			text: 'Delete Failed'
		}
		  )
	}
  })    

}

async function getVideoGames(){
    await fetch("http://localhost:8083/game/list")
    .then(Response=>Response.json()).then(data=>{
        console.log(data.data);
        let myList = data.data;
        let myArea = document.getElementById("videogameList");
        let result ="";
        result +=` <table cellspacing="0px">
        <thead>
            <tr style="width: 150px;">
                <th style="width: 100px">Category</th>
                <th style="width: 150px;">Name</th>
                <th style="width: 50px;">Rating</th>
                <th style="width: 100px">Company</th>
                <th style="width: 200px">Comments</th>
                <th style="width: 100px">action</th>
            </tr>
            </thead>`;
        for(let i =0;i<myList.length;i++){
            Item.push(myList[i]);
            result += `
            <tr>
							<td>${myList[i].category}</td>
							<td>${myList[i].gameName}</td>
							<td>${myList[i].ratings}</td>
							<td>${myList[i].companyName}</td>
							<td>${myList[i].comments}</td>
							<td id="buttonList">
								<button type="button" onclick="displayImage('${myList[i].imageUrl}')">Image</button>
								<button type="button" onclick="displayUpdate('${myList[i].id}')">update</button>
								<button type="button" onclick="deleteGame('${myList[i].id}')">delete</button>
							</td>
			</tr>
            `
        }
    result += `
    </table>`;
    myArea.innerHTML =  result;
    })

}

// await function updateVideoGames(id){

// }

getVideoGames();