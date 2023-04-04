//déclaration des 
const gallerie = new Set();
const categories = new Set();
const objetSet = new Set();
const appartSet = new Set();
const hotelSet = new Set();



//déclaration de la fonction asynchrone permettant de récuperer le tableau des projets sur l'API
async function lectureBase () {
    try{
   const response = await fetch ('http://localhost:5678/api/works');

   if (response.ok)  {
    const data = await response.json();
    console.log(data);
    return data;
   }
   
}
    catch (error){
        alert (error);
    }
}


//CallBack de la function lectureBase(), et remplissage des set

lectureBase().then(retour => {
  const categorie = {id:"0", name: "Tous"};
  categories.add(categorie);
    for (const image of retour ){
        gallerie.add(image);
        
    if (image.categoryId==1){
        objetSet.add(image);
    }else if  (image.categoryId==2 ) {
        appartSet.add(image);
    } else if (image.categoryId==3) {
        hotelSet.add(image);
    }
    const categorie = image.category;

    if (!categories.has(categorie)){
        categories.add(categorie);
    }
    
    }

    alert(categories.size);
     afficheGallerie(gallerie); //Permet d'appeller la fonction afficheGallerie()
     afficheFiltre(categories);
     

}
)

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API

function afficheGallerie(magallerie) {
    for (const image of magallerie) {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
  
      img.src = image.imageUrl;
      img.alt = image.title;
  
      figcaption.textContent = image.title;
  
      figure.appendChild(img);
      figure.appendChild(figcaption);
  
      document.querySelector('.gallery').appendChild(figure);
    }
  }

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API

function afficheFiltre(tableau) {
    const div = document.createElement('div');
    div.classList.add('filtre');
  
    for (const categorie of tableau) {
      const button = document.createElement('button');
      button.classList.add('btn');
      button.id = 'cat_' + categorie.id;
      button.textContent = categorie.name;
  
      div.appendChild(button);
    }
  
    document.querySelector('#portfolio h2').appendChild(div);
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
   
