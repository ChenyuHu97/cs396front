

async function createGame(){
    let myList = ['nothing','FPS','RTS','MOBA','RPG','Other'];
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
        fetch("http://localhost:8083/game/create",{
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
            let jsonObject= JSON.parse(res);
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


