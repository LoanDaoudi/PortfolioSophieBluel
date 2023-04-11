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
     
      $('#add_img').click(function() {
        $('.modal-div').hide();
        afficheModalpage2();
        $('#arrow11').click(function() {
          $('.modal2').hide();
          $('.modal-div').show();
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
 function afficheGallerie(magallerie ){
    for(const image of magallerie)
    {
        let chemin ="<figure><img src="+ image.imageUrl + " alt="+ image.title +"><figcaption>"+image.title+"</figacption></figure>"
        
        $(".gallery").append(chemin);
    }
  }

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API
  function afficheFiltre(tableau){
      let chemin= "<div class='filtre'>";
      for (const categorie of tableau){
        chemin+="<button class='btn' id='cat_" + categorie.id + "'>" + categorie.name + "</button>";
      //  console.log("Chemin = "+chemin);
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


   function afficheModale(){
    let chemin = "<div class='pre_header'>";
    chemin += "<a href=# id=a-modal1 ><i class='fa-regular fa-pen-to-square'  ><p>Mode Edition</p></i></a>";
    chemin+="<button class=btn_header><a href=#> Publier les changements</a></button>";
    chemin+="</div>";
    $('header').append(chemin);
//
    let chemin2 = "<a href=# id=a-modal2 ><i class='fa-regular fa-pen-to-square' ><p>Modifier</p></i></a>";
    chemin2+= "</div>";
    $('#introduction figure').append(chemin2)
  
//
   let chemin3="<a href=# id=a-modal3 ><i class='fa-regular fa-pen-to-square' ><p>Modifier</p></i></a>";
    $('#portfolio h2').append(chemin3);

    $('header #login').empty();
   let chemin5 ="<li><a href=connect.html>logout</a></li>";
  $('header nav #login').append(chemin5);

  $('header nav #login').css({
    'font-family' : 'Work Sans',
    'font-size' : '14px',
    'font-weight' : '400'
  });
    
  $('#portfolio h2 ').css({
      'display':'flex',
      'justify-content':'center',
      'gap':'18px' 
    })

    $('#portfolio h2  a').css({
      'text-decoration': 'none',
    });

    $('#portfolio h2 i').css({
      'display': 'flex',
      'gap': '7px',
      'font-size': '14px',
      'color': 'black',
      'margin-top': '10px'
    });

    $('#portfolio h2 p').css({
      'font-size': '16px',
      'font-weight': '400',
      'font-family': 'Work Sans',
    })
   
    $('header .pre_header').css({
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'gap': '25px',
      'width': '100%',
      'height': '59px',
      'background-color': 'black',
      'position': 'absolute',
      'top': '0',
      'left': '0'
    });
    
    $('#introduction a').css({
      'text-decoration': 'none',
      
    });

    $('#introduction i').css({
      'display': 'flex',
      'gap': '7px',
      'font-size': '14px',
      'color': 'black',
      'margin-left': '58px',
      'margin-top': '10px'
    });

    $('#introduction figure p').css({
      'font-size': '14px',
      'font-weight': '400',
      'font-family': 'Work Sans',
      
    });

    $('header .pre_header a').css({
      'text-decoration': 'none'
    });

    $('header .pre_header i').css({
      'display': 'flex',
      'gap': '7px',
      'font-size': '16px',
      'color': 'white'
    });

    $('header .pre_header p').css({
      'font-size': '16px',
      'font-weight': '400',
      'font-family': 'Work Sans'
    });

    $('header .btn_header').css({
      'width': '216px',
      'height': '38px',
      'border-radius': '60px',
      'border': 'none',
      'font-size': '15px',
      'font-weight': '500',
      'font-family': 'Work Sans'
    });    
    
   }

// Affichage des travaux dans la modale
   function afficheModalGallery(magallerie ){
    let chemin4="<aside id='modal-gallery' class='modal'  style=display:none >";
    chemin4+="<div class=modal-div><a href=#><i id= cross class='fa-solid fa-xmark'></i></a>";
    chemin4+="<h3>Galerie photo</h3><div class=gallery-modal></div>";
    chemin4+="<button id= add_img class='btn filtreActif edition'>Ajouter une photo</button>";
    chemin4+="<button class=supp-img><a href=#>Supprimer la galerie</a></button></div></aside>";
    
    $('header').append(chemin4);
    
    // gestion du bouton de suppression d'images de la galerie
    let bouton = document.querySelector('.supp-img');
    bouton.addEventListener('click', function(){
      for (const image of imageAsupprimer){
        supprimeImage(image);
      }
    }) 
    
    for(const image of magallerie)
    {
      let chemin ="<figure><img src="+ image.imageUrl + " alt="+ image.title +"> <div class=i-font>";
      chemin+="<div class= multi-cross><i class='fa-solid fa-arrows-up-down-left-right' ></i></div>";
      chemin+=" <div class= trash ><a href=#><i id= img_" + image.id + " class='fa-solid fa-trash-can'>";
      chemin+="</i></a></div></div><figcaption>éditer</figacption></figure>";
      $(".gallery-modal").append(chemin);
    }
    // initialisation du Set() imagesAsupprimer
    imageAsupprimer.clear();
    
    $('#cross').click(function(){
      $('#modal2').hide();
      $('.modal-div').show();
      $('#modal-gallery').hide();
    });

       
     // gestion des icones Trash 
     // on gere le Set() imagesAsupprimer 
     $('.trash i').on('click', function() {
            $(this).toggleClass('selectionne');
            const trash = document.activeElement;
            // récup de l'id de l'image 
            const numero= trash.firstChild.id.substring(4);
            // en fonction de la classe selectionne ou pas
            if (trash.firstChild.classList.contains('selectionne')) {
              $(this).css('color', 'red'); 
              for (var image of gallerie){
                if(image.id==numero){
                   imageAsupprimer.add(image);
                }
              }
            } else {
              $(this).css('color', 'white');
              for (var image of imageAsupprimer){
                if(image.id==numero){
                   imageAsupprimer.delete(image);
                }
              }
            }
          });  
            
  }


  function cacheModale(){
    $('#modal2').hide();
    $(".modal2").hide();
    $('.modal-div').show();
    $('#modal-gallery').hide();
  }
   

function afficheModalpage2(){
    let chemin="<div class=modal2><button id= arrow11><a href=#><i id=arrow class='fa-solid fa-arrow-left'>"
    +"</i></a></button><a href=#><i id=cross2 class='fa-solid fa-xmark'></i></a>"
    +"<div class=modal2-content>"
    +"<h3>Ajout photo</h3>"
    +"<form id=add-picture>"
      +"<div class=add-img>"
        +"<div class=placeImage></div>"
        +" <i class='fa-solid fa-image'></i>"
         +"<label class=btn-modal2><input type='file' name='image' id='image' style=display:none accept= .png, .jpg >"
         +"+ Ajouter photo</label><p>jpg, png: 4mo max</p>"
        +"</div>"
        +"<div id=add-project>" 
    +  "<label for=title>Titre</label><input type=text id='title' name='title'></input>"
    +  "<label for=category>Catégorie</label>"
    +  "<select name=category id=category>"
        +"<option value= ></option><option value=1>Objets</option><option value=2>Appartements"
        +"</option><option value=3>Hôtels & Restaurants</option>"
        +"</select>"
        +"</div>"
   +"</form>"
   + "<button id=validProjet class=Valid inactif>Valider</button</div></div>"; 
  
    
     $('aside').prepend(chemin);

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
 
     $('#add-picture input').on('change', function() {
      var input = $(this)[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var img = $('<img id=monimage>').attr('src', e.target.result);
          img.css({
            'object-fit': 'cover',
            'height': '230px'
          });
          $('.placeImage').html(img);
          let fileName = input.files[0].name;
          fichierImage = true;
          let fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
          $('#add-project #title').val(fileNameWithoutExtension);
        };
        reader.readAsDataURL(input.files[0]);
        validationPhoto();
      }
    });
     $('#cross2').click(function(){
      //$('#modal-gallery').hide();
      cacheModale();
    });
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


$(document).ready(function(){
    lectureBase();
    lectureCat();
})