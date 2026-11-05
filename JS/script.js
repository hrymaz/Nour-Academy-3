const listeEleves = document.querySelector("#liste-eleves");
const compteur = document.querySelector("#compteur");

function creerLigne(eleve) {

    const li = document.createElement("li");
    const div = document.createElement("div");

    const btn = document.createElement("button");
    const spanAvatar = document.createElement("span");
    const infoSpan = document.createElement("span");
    const nomSpan = document.createElement("span");
    const absenceSpan = document.createElement("span");
    const celluleMoyenne = document.createElement("span");

    const divActions = document.createElement("div");
    const btnAbsent = document.createElement("button");
    const labelInput = document.createElement("label");
    const srOnly = document.createElement("span");
    const inputNote = document.createElement("input");
    const btnNote = document.createElement("button");
    const msgP = document.createElement("p");

    const nomComplet = eleve.prenom + " " + eleve.nom;
    const absences = eleve.absences;
    const notes = eleve.notes || [];

    const initiales = eleve.prenom[0] + eleve.nom[0];


    let moyenne = "—";

    if (notes.length > 0) {
        const somme = notes.reduce((total, notes) => total + notes, 0);
        moyenne = (somme / notes.length).toFixed(1).replace(".", ",") + " / 20";
    }

    li.className = "rounded-2xl border border-line bg-card p-3";  
    if (absences >= 3) {
    li.classList.add("border-red-500", "bg-red-50");
    } else {
    li.classList.add("border-line", "bg-card");
    }
    
    
    div.className = "flex flex-col gap-3 lg:flex-row lg:items-center";

    btn.type = "button";
    btn.className = "btn-fiche flex min-h-11 flex-1 items-center gap-3 text-left";

    spanAvatar.className = "grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand";
    spanAvatar.textContent = initiales;

    infoSpan.className = "min-w-0 flex-1";

    nomSpan.className = "block truncate font-medium";
    nomSpan.textContent = nomComplet;

    absenceSpan.className = "block text-sm text-muted";
    absenceSpan.textContent = absences + (absences > 1 ? " absences" : " absence");

    celluleMoyenne.className = "font-serif text-xl";
    celluleMoyenne.textContent = moyenne;

    btn.append(spanAvatar, infoSpan, celluleMoyenne);
    infoSpan.append(nomSpan, absenceSpan);

    divActions.className = "flex gap-2";

    btnAbsent.type = "button";
    btnAbsent.dataset.action = "absent";
    btnAbsent.className = "btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper";
    btnAbsent.textContent = "Absent";

    btnAbsent.dataset.id = eleve.id;

    labelInput.className = "flex-1";

    srOnly.textContent = "Note sur 20";
    srOnly.className = "sr-only";

    inputNote.className = "h-11 w-full rounded-full border border-line bg-paper px-4 text-sm lg:w-24";
    inputNote.id = "inp" 
    inputNote.type = "number";
    inputNote.min = "0";
    inputNote.max = "20";
    inputNote.step = "0.5";
    inputNote.placeholder = "Note";
    inputNote.dataset.id = eleve.id 

    
    labelInput.append(srOnly, inputNote);

    btnNote.type = "button";
    btnNote.dataset.action = "note";
    btnNote.className = "btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand";
    btnNote.textContent = "Ajouter la note";
    
    btnNote.dataset.id = eleve.id 

    msgP.className = "message mt-2 text-xs text-alert";
    msgP.textContent = "La note doit être un nombre entre 0 et 20.";
    msgP.hidden = true;

    divActions.append(btnAbsent, labelInput, btnNote);

    div.append(btn, divActions);
    li.append(div, msgP);

    return li;
}

function runderData(filteData = eleves) { 
    listeEleves.replaceChildren();

    const lignes = filteData.map(creerLigne);

    listeEleves.append(...lignes);

    compteur.textContent = filteData.length + " élèves";
}

const filtreGroupe = document.querySelector("#filtre-groupe");
const recherche = document.querySelector("#recherche"); 


groupes.forEach(groupe => {
    const option = document.createElement("option")

    option.value = groupe.id
    option.textContent = groupe.nom

    filtreGroupe.append(option)
});
function afficherEleves(){
        const groupeChoisi = filtreGroupe.value;
        const texteRecherche = recherche.value.toLowerCase().trim();

        const elevesFiltres = eleves.filter((eleves) => {
              const nom = eleves.nom.toLowerCase(); 
              const prenom = eleves.prenom.toLowerCase(); 
            
        return (
            (groupeChoisi === ""  || eleves.groupeId === Number(groupeChoisi )) &&
            (nom.includes(texteRecherche) || prenom.includes(texteRecherche))
        );
    });
    runderData(elevesFiltres)
}

function absences(event) {
    const button = event.target.closest(".btn-absent");
    if (!button) return;
    const id = Number(button.dataset.id);
    
    const eleve = eleves.find(eleve => eleve.id === id )

    if(!eleve) return ; 
     
    eleve.absences++
  
    runderData();
}

function note(event) {
    const button = event.target.closest(".btn-note");
    if (!button) return;

    let  vl  =button.parentElement.querySelector("#inp")
    if(!vl) return
    vl = vl.value

    if(vl == "") return
        console.log(vl)
    const id = Number(button.dataset.id);

    const eleve = eleves.find(eleve => eleve.id === id);
    if (!eleve) return;


    if (vl < 0 || vl > 20) return ; 
    console.log(vl);
    
    eleve.notes.push(Number(vl));
     
    runderData(); 
}

const eleve = document.querySelector('#form-eleve')

const prenom = document.querySelector('#prenom');
const nom = document.querySelector('#nom');
const groupe = document.querySelector('#groupe');
const email = document.querySelector('#email');
const telephone = document.querySelector('#telephone')
const code = document.querySelector('#code')

const regexPrenom = /^[A-Za-zÀ-ÿ -]{2,}$/;

const regexNom = /^[A-Za-zÀ-ÿ -]{7,}$/;

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const regexTelephone = /^(06|07)[0-9]{8}$|^\+212[67][0-9]{8}$/;

const regexCode = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;



prenom.addEventListener("input", () => {
    if (regexPrenom.test(prenom.value)) {
        console.log("Prénom valide");
    } else {
        console.log("Prénom invalide");
    }
});

nom.addEventListener("input", () => {
    if (regexNom.test(nom.value)) {
        console.log("nom valide");
    } else {
        console.log("nom invalide");
    }
});

email.addEventListener("input", () => {
   if (regexEmail.test(email.value)) {
    console.log("email valide");
   } else {
    console.log("emali invalide");
   }
}); 

telephone.addEventListener("input", () => {
     if (regexTelephone.test(telephone.value)) {
       console.log("telephone valide")
     } else {
       console.log("telephone invalied")
     }
}); 

code.addEventListener("input" , () => {
   if (regexCode.test(code.value)) {
      console.log("code valide")
   } else {
     console.log("code valide")
   }
})
eleve.addEventListener("click" , (e) => {
   e.preventDefault()
   const button = e.target.closest("button")
   if(!button) return
   const fiche = {
         id: eleves.length++,
         prenom: prenom.value,
         nom: nom.value,
         groupeId: groupe.value, 
         telephoneParent: telephone.value, 
         absences: 0, 
         notes: []}
 eleves.push(fiche)
 
runderData();
} )

listeEleves.addEventListener("click" , note)
listeEleves.addEventListener("click" , absences)
filtreGroupe.addEventListener("change" , afficherEleves)
recherche.addEventListener("input" , afficherEleves)

runderData(); 

