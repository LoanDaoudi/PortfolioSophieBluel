//déclaration des 
const gallerie = new Set();
const categories = new Set();
const objetSet = new Set();
const appartSet = new Set();
const hotelSet = new Set();



//déclaration de la fonction asynchrone permettant de récuperer le tableau des projets sur l'API
async function lectureBase () {
    try {
    const response = await fetch ("http://localhost:5678/api/works");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
  }
  catch (error){
    {
      alert(error);
   }
    }
}

//CallBack de la function lectureBase(), et remplissage des set

lectureBase().then(retour => {
  
  retour.forEach(image => {
    gallerie.add(image);
    if (image.category.id == 1) {
     objetSet.add(image);
    } else if (image.category.id == 2) {
     appartSet.add(image);
    } else if (image.category.id == 3){
     hotelSet.add(image); 
    } 
  });
     afficheGallerie(gallerie); //Permet d'appeller la fonction afficheGallerie()
}
)

//déclaration de la fonction asynchrone permettant de récuperer les catégories des projets sur l'API

async function lectureCat () {
  try {
  const response = await fetch ("http://localhost:5678/api/categories");
  
  if (response.ok) {
      const data = await response.json();
      console.log(data); 
      return data;
  }
}
catch (error){
  {
    alert("Erreur : " + error);
  }
  }
}

//CallBack de la function lectureBase(), et remplissage des set

lectureCat().then(retour => {
  let categorie = {id: "0", name: "Tous"};
  categories.add(categorie);
  retour.forEach(categorie => {
    categories.add(categorie);
  });
  afficheFiltre(categories);
  evenement(categories);
  let bouton = document.getElementById("cat_0");      
  bouton.classList.add("filtreActif");

}
)

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API

 function afficheGallerie(magallerie ){
    
  for (image of magallerie){
      let chemin= "<figure class=img_" + image.category.id +"><img src='" + image.imageUrl + "' alt='" + image.title + "'>" ;
    chemin+="<figcaption>" +image.title + "</figcaption></figure>";
    $(".gallery").append(chemin); //On fait apparaitre ce chemin dans la class gallery
   }
  }

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API

  function afficheFiltre(tableau){
    let chemin= "<div class='filtre'>";
    for (const categorie of tableau){
      chemin+="<button class='btn' id='cat_"+ categorie.id+ "'>"+categorie.name;
      console.log("Chemin = "+chemin);
     }
    chemin+="</div>"
    $("#portfolio h2").append(chemin);//On fait apparaitre ce chemin dans l'id #portfolio aprés le h2
  }

//Fonction qui va permettre aux boutons créés ci dessus de comorendre quoi afficher, on leur mets des condtitions 

  function evenement(tableau){
  for (let categorie of tableau)
  {
    let bouton = document.getElementById("cat_"+ categorie.id);      
    bouton.addEventListener('click', () => {
      $(".gallery").empty();
      $("button").attr("class","btn");
      if (bouton.id =="cat_0") {
        afficheGallerie(gallerie);//En fonction de l'id du bouton on affiche tel ou tel set 
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_1") {
        afficheGallerie(objetSet);
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_2") {
        bouton.classList.add("filtreActif");
      afficheGallerie(appartSet);
      } else if (bouton.id == "cat_3") {
        bouton.classList.add("filtreActif");
        afficheGallerie(hotelSet);
      }   
    })
  }
  }

    $(document).ready(function(){
      lectureBase();
      lectureCat();
  }
   );
   
