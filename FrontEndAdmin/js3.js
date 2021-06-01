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
            result += `
            <tr>
							<td>${myList[i].category}</td>
							<td>${myList[i].gameName}</td>
							<td>${myList[i].ratings}</td>
							<td>${myList[i].companyName}</td>
							<td>${myList[i].comments}</td>
							<td>
								<a class="oplink" href="#">Image</a>
								<a class="oplink" href="#">update</a>
								<a class="oplink" href="#">delete</a>
							</td>
			</tr>
            `
        }
    result += `
    </table>`;
    myArea.innerHTML =  result;
    })

}

getVideoGames();