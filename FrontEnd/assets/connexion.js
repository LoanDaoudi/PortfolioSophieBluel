let administrateur = {'userId' : '', 'token' : ''};
let utilisateur = {'email' : '', 'password' : ''};
let connecte=false;
sessionStorage.clear();
localStorage.clear();

document.querySelector('#form.formLogin').addEventListener("submit",function(e){ 
  e.preventDefault()

  
    utilisateur.email = document.querySelector('input[name="email"]').value;
    utilisateur.password = document.querySelector('input[name="password"]').value;
    if ((utilisateur.email == undefined) || utilisateur.password == undefined ) {

    }
    
    fetch('http://localhost:5678/api/users/login',{
              method: 'post',
              headers:{'Content-Type':'application/json;charset=utf-8'},
              body:JSON.stringify(utilisateur)
      }) 
      .then(response=>response.json())
      .then(retour=>{
      
      if( retour.message == "user not found" ) {
          alert("Utilisateur non trouvé");
      }else if(( retour.error != undefined)){
          alert("Non autorisé")
      }else  {

        administrateur.userId = retour.userId;
        administrateur.token = retour.token;

        // stock des variables pour pouvoir administrer les travaux
        localStorage.setItem("administrateur", JSON.stringify(administrateur));
        localStorage.setItem("utilisateur",JSON.stringify(utilisateur) );
        localStorage.setItem("connecte",true);
   
        // retour à la page d'accueil
        location.href = "./index.html";

      }
  })
  .catch(error => { console.error(error)  });
  
});