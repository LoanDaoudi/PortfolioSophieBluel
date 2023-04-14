//déclaration des variables 
const gallerie = new Set();
const categories = new Set();
const objetSet = new Set();
const appartSet = new Set();
const hotelSet = new Set();
const imageAsupprimer = new Set();
let fichierImage=false;



//déclaration de la fonction asynchrone permettant de récuperer le tableau des projets sur l'API
async function lectureBase () {
  try{
   const response = await fetch ('http://localhost:5678/api/works');
   if (response.ok) {
    const data = await response.json();
    return data;
   }
  }
    catch (error){
        alert (error);
  }
}

//CallBack de la function lectureBase(), et remplissage des set
lectureBase().then(retour => {
    for (const image of retour ){
        gallerie.add(image);
      if (image.categoryId==1){
        objetSet.add(image);
      }else if  (image.categoryId==2 ) {
        appartSet.add(image);
      } else if (image.categoryId == 3) {
        hotelSet.add(image);
      }
    }
     afficheGallerie(gallerie); //Permet d'appeller la fonction afficheGallerie()
})   

//déclaration de la fonction asynchrone permettant de récuperer les catégories des projets sur l'API
async function lectureCat () {
  try{
    const response = await fetch ("http://localhost:5678/api/categories");
    if (response.ok) {
     const data = await response.json();
     return data;
    }
  }
  catch (error){
    alert(error);
  }
}

//CallBack de la function lectureBase(), et remplissage des set
lectureCat().then(retour => {
  let categorie = {id: "0", name: "Tous"};
  categories.add(categorie);
  retour.forEach(categorie => {
    categories.add(categorie);
  });
  if (sessionStorage.getItem('administrateur')== undefined){
     afficheFiltre(categories);
     evenement(categories);
     let bouton = document.getElementById("cat_0");      
     bouton.classList.add("filtreActif");
  } else { 
    // affichage Admin et modales
     afficheModale();
     afficheModalGallery(gallerie)
     
     document.getElementById("add_img").addEventListener("click", function() {
      document.querySelector(".modal-div").style.display = "none";
      afficheModalpage2();
      document.getElementById("arrow11").addEventListener("click", function() {
        document.querySelector(".modal2").style.display = "none";
        document.querySelector(".modal-div").style.display = "flex";
        
      });
    });
     var modal1 = document.getElementById("a-modal1");
     var modal2 = document.getElementById("a-modal2");
     var modal3 = document.getElementById("a-modal3");
     var modal = document.getElementById("modal-gallery");
  
     modal1.addEventListener("click", function() {
       modal.style.display = "block";
     });
     modal2.addEventListener("click", function() {
      modal.style.display = "block";
     });
     modal3.addEventListener("click", function() {
      modal.style.display = "block";
     });    
  }
})

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupérés sur l'API
function afficheGallerie(magallerie) {
  const gallery = document.querySelector('.gallery');
  for (const image of magallerie){
  const figure = document.createElement('figure');
  figure.innerHTML = 
        `<img src=${image.imageUrl} alt=${image.title}><figcaption>${image.title}</figacption>`;
     gallery.appendChild(figure);
  }
}

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API
function afficheFiltre(tableau) { 
  const h2 = document.querySelector("#portfolio h2");
  const div = document.createElement("div");
  div.classList.add("filtre");

  tableau.forEach((categorie) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.id = "cat_" + categorie.id;
    button.textContent = categorie.name;
    div.appendChild(button);
  });

  h2.appendChild(div);
}

//Fonction qui va permettre aux boutons créés ci dessus de comorendre quoi afficher, on leur mets des condtitions 
function evenement(tableau) {
  for (let categorie of tableau) {
    let bouton = document.getElementById("cat_" + categorie.id);
    bouton.addEventListener('click', () => {
      let gallery = document.querySelector('.gallery');
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      let buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.classList.remove('filtreActif'));
      if (bouton.id == "cat_0") {
        afficheGallerie(gallerie);
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_1") {
        afficheGallerie(objetSet);
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_2") {
        afficheGallerie(appartSet);
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_3") {
        afficheGallerie(hotelSet);
        bouton.classList.add("filtreActif");
      }
    });
  }
}


   function afficheModale(){

    let chemin = document.createElement('div');
chemin.className = 'pre_header';

let aModal = document.createElement('a');
aModal.href = '#';
aModal.id = 'a-modal1';

let iModal = document.createElement('i');
iModal.className = 'fa-regular fa-pen-to-square';

let pModal = document.createElement('p');
pModal.textContent = 'Mode Edition';

iModal.appendChild(pModal);
aModal.appendChild(iModal);
chemin.appendChild(aModal);

let btnHeader = document.createElement('button');
btnHeader.className = 'btn_header';
let aBtnHeader = document.createElement('a');
aBtnHeader.href = '#';
aBtnHeader.textContent = ' Publier les changements';
btnHeader.appendChild(aBtnHeader);
chemin.appendChild(btnHeader);

document.querySelector('header').appendChild(chemin);

//
let aModal2 = document.createElement('a');
aModal2.href = '#';
aModal2.id = 'a-modal2';

let iModal2 = document.createElement('i');
iModal2.className = 'fa-regular fa-pen-to-square';

let pModal2 = document.createElement('p');
pModal2.textContent = 'Modifier';

iModal2.appendChild(pModal2);
aModal2.appendChild(iModal2);

document.querySelector('#introduction figure').appendChild(aModal2);
  
//
let aModal3 = document.createElement('a');
aModal3.href = '#';
aModal3.id = 'a-modal3';

let iModal3 = document.createElement('i');
iModal3.className = 'fa-regular fa-pen-to-square';

let pModal3 = document.createElement('p');
pModal3.textContent = 'Modifier';

iModal3.appendChild(pModal3);
aModal3.appendChild(iModal3);

document.querySelector('#portfolio h2').appendChild(aModal3);

let loginElem = document.querySelector('header #login');
loginElem.innerHTML = '';

let liElem = document.createElement('li');
let aElem = document.createElement('a');
aElem.href = 'connect.html';
aElem.textContent = 'logout';

liElem.appendChild(aElem);

document.querySelector('header nav #login').appendChild(liElem);

    
    
   }

// Affichage des travaux dans la odale

function afficheModalGallery(magallerie ){
  const modalGallery = document.createElement("aside");
modalGallery.id = "modal-gallery";
modalGallery.className = "modal";
modalGallery.style.display = "none";

const modalDiv = document.createElement("div");
modalDiv.className = "modal-div";

const closeButton = document.createElement("a");
closeButton.href = "#";

const crossIcon = document.createElement("i");
crossIcon.id = "cross";
crossIcon.className = "fa-solid fa-xmark";
closeButton.appendChild(crossIcon);

const heading = document.createElement("h3");
heading.textContent = "Galerie photo";

const gallery = document.createElement("div");
gallery.className = "gallery-modal";

const addButton = document.createElement("button");
addButton.id = "add_img";
addButton.className = "btn filtreActif edition";
addButton.textContent = "Ajouter une photo";

const deleteButton = document.createElement("button");
deleteButton.classList.add("supp-img");


const deleteLink = document.createElement("a");
deleteLink.href = "#";
deleteLink.textContent = "Supprimer la galerie";
deleteButton.appendChild(deleteLink);

// Construction de la hiérarchie des éléments
modalDiv.appendChild(closeButton);
modalDiv.appendChild(heading);
modalDiv.appendChild(gallery);
modalDiv.appendChild(addButton);
modalDiv.appendChild(deleteButton);
modalGallery.appendChild(modalDiv);

// Ajout de l'élément au header de la page
const header = document.querySelector("header");
header.appendChild(modalGallery);
  
  // gestion du bouton de suppression d'images de la galerie
  console.log('fonction suprimeImage')  ;
  let bouton = document.querySelector('.supp-img');
  bouton.addEventListener('click', function(){
    for (const image of imageAsupprimer){
      supprimeImage(image);
    }
  }) 
  
  // Sélection de la galerie modal
const galleryModal = document.querySelector(".gallery-modal");

// Parcours du tableau magallerie et création des éléments HTML
for (const image of magallerie) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = image.imageUrl;
  img.alt = image.title;

  const iFont = document.createElement("div");
  iFont.className = "i-font";

  const multiCross = document.createElement("div");
  multiCross.className = "multi-cross";
  const arrowsIcon = document.createElement("i");
  arrowsIcon.className = "fa-solid fa-arrows-up-down-left-right";
  multiCross.appendChild(arrowsIcon);

  const trash = document.createElement("div");
  trash.className = "trash";
  const trashLink = document.createElement("a");
  trashLink.href = "#";
  const trashIcon = document.createElement("i");
  trashIcon.id = "img_" + image.id;
  trashIcon.className = "fa-solid fa-trash-can";
  trashLink.appendChild(trashIcon);
  trash.appendChild(trashLink);

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = "éditer";

  // Construction de la hiérarchie des éléments
  iFont.appendChild(multiCross);
  iFont.appendChild(trash);
  figure.appendChild(img);
  figure.appendChild(iFont);
  figure.appendChild(figcaption);

  // Ajout de l'élément à la galerie modal
  galleryModal.appendChild(figure);
  
}
  
document.querySelector('#cross').addEventListener('click', function(){
  cacheModale();
});

     
   // gestion des icones Trash 
   // on gere le Set() imagesAsupprimer 
   const trashIcons = document.querySelectorAll('.trash i');

   
   for (const trashIcon of trashIcons) {
   trashIcon.addEventListener('click', function() {
   trashIcon.classList.toggle('selectionne');
   const trash = document.activeElement;
   const numero = trash.firstElementChild.id.substring(4);
   
   
   if (trash.firstElementChild.classList.contains('selectionne')) {
     trashIcon.style.color = 'red'; 
     for (const image of gallerie) {
       if (image.id == numero) {
         imageAsupprimer.add(image);
       }
     }
   } else {
     trashIcon.style.color = 'white';
     for (const image of imageAsupprimer) {
       if (image.id == numero) {
         imageAsupprimer.delete(image);
       }
     }
   }
   });
   }    
}


  
   

function afficheModalpage2(){
  const aside = document.querySelector('aside');
  const modalContent = `
    <div class="modal2">
      <button id="arrow11"><a href="#"><i id="arrow" class="fa-solid fa-arrow-left"></i></a></button>
      <a href="#"><i id="cross2" class="fa-solid fa-xmark"></i></a>
      <div class="modal2-content">
        <h3>Ajout photo</h3>
        <form id="add-picture">
          <div class="add-img">
            <div class="placeImage"></div>
            <i class="fa-solid fa-image"></i>
            <label class="btn-modal2">
              <input type="file" name="image" id="image" style="display:none" accept=".png, .jpg">
              + Ajouter photo
            </label>
            <p>jpg, png: 4mo max</p>
          </div>
          <div id="add-project"> 
            <label for="title">Titre</label>
            <input type="text" id="title" name="title"></input>
            <label for="category">Catégorie</label>
            <select name="category" id="category">
              <option value=""></option>
              <option value="1">Objets</option>
              <option value="2">Appartements</option>
              <option value="3">Hôtels & Restaurants</option>
            </select>
          </div>
        </form>
        <button id="validProjet" class="Valid inactif">Valider</button>
      </div>
    </div>
  `;
  aside.insertAdjacentHTML('afterbegin', modalContent);

     var boutonValider = document.getElementById('validProjet');
     boutonValider.addEventListener('click', function() { 
        if ( !boutonValider.disable){
          ajoutImage();
        }
     });
     fichierImage=false;
     const categ = document.getElementById('category');
     const titre = document.getElementById('title');
     categ.addEventListener('input', validationPhoto);
     titre.addEventListener('input', validationPhoto);
 
     document.querySelector('#add-picture input').addEventListener('change', function() {
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var img = document.createElement('img');
          img.setAttribute('id', 'monimage');
          img.setAttribute('src', e.target.result);
          img.style.objectFit = 'cover';
          img.style.height = '230px';
          document.querySelector('.placeImage').innerHTML = '';
          document.querySelector('.placeImage').appendChild(img);
          let fileName = input.files[0].name;
          fichierImage = true;
          let fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
          document.querySelector('#add-project #title').value = fileNameWithoutExtension;
        };
        reader.readAsDataURL(input.files[0]);
        validationPhoto();
      }
    });
    
    document.querySelector('#cross2').addEventListener('click', function(){
      //document.querySelector('#modal-gallery').style.display = 'none';
      cacheModale();
    });
    
}

function cacheModale(){
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.modal2').style.display = 'none';
  document.querySelector('.modal-div').style.display = 'flex';
  document.querySelector('#modal-gallery').style.display = 'none';
}

function validationPhoto() {
  let bouton = document.getElementById('validProjet');
  bouton.classList.add('inactif');
  bouton.classList.remove('filtreActif');
  bouton.disabled = true;
  let valeurs = document.getElementById('add-picture');
  if (valeurs.elements.length == 0) { 
    return false;
  }
  let leTitre = valeurs.elements["title"].value;
  let laCateg = valeurs.elements["category"].value;
  if (fichierImage && leTitre !== '' && laCateg !== '') {
    bouton.disabled = false;
    bouton.classList.remove('inactif');
    bouton.classList.add('filtreActif');
    return true;
  } else {
    return false;
  }
}

function supprimeImage(image){

  console.log('fonction suprimeImage')  ;
  if (imageAsupprimer.has(image)){
      let Texteimage = "Êtes-vous sûr de vouloir supprimer l'image " + image.title + " ?";
       if (confirm(Texteimage)) {
         deleteImage(image);
         //alert(" on supprime " + image.title);
         imageAsupprimer.delete(image);
    }
    else {
    }
  }
}


  // fonction de suppression d'une image
function deleteImage(image) {
  const administrateur = sessionStorage.getItem('administrateur');
  const administrateurObj = JSON.parse(administrateur);
  const token = administrateurObj.token;
  const userId = administrateurObj.userId;
  
  fetch(`http://localhost:5678/api/works/${image.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'userId': userId
    }
  })
  .then(response => {
    alert(response.status);
  })
  .catch((error) => {
    alert(error)
  });
};


function ajoutImage() {
  const administrateur = sessionStorage.getItem('administrateur');
  const administrateurObj = JSON.parse(administrateur);
  const token = administrateurObj.token;
  const userId = administrateurObj.userId;

  let formulaire = document.getElementById("add-picture");
  let body = new FormData(formulaire);
  document.querySelector('#validProjet').style.display="none";
  fetch(`http://localhost:5678/api/works/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'userId': `'${userId}'`,
    },
    body
  })
  .then(response => response.text()
      // on peut gerer le résultat de status    
   )
   .then (alert)
   .catch((error) => {
      alert(error)
    })
    .finally (()=>document.querySelector('#validProjet').style.display="block");
}


document.addEventListener('DOMContentLoaded', function() {
  lectureBase();
  lectureCat();
  });