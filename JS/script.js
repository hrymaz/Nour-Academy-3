
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
        moyenne = (somme / notes.length).toFixed(0).replace(".", ",") + " / 20";
    }

    li.className = "rounded-2xl border border-line bg-card p-3";  
    if (absences >= 3) {
    li.classList.add("border-red-500", "bg-red-50");
    } else {
    li.classList.add("border-line", "bg-card");
    }
    li.dataset.id = eleve.id;
    
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
    btnAbsent.className = "btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper";
    btnAbsent.textContent = "Absent";

    labelInput.className = "flex-1";

    srOnly.textContent = "Note sur 20";
    srOnly.className = "sr-only";

    inputNote.className = "h-11 w-full rounded-full border border-line bg-paper px-4 text-sm lg:w-24";
    inputNote.type = "number";
    inputNote.min = "0";
    inputNote.max = "20";
    inputNote.step = "0.5";
    inputNote.placeholder = "Note";

    labelInput.append(srOnly, inputNote);

    btnNote.type = "button";
    btnNote.className = "btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand";
    btnNote.textContent = "Ajouter la note";

    msgP.className = "message mt-2 text-xs text-alert";
    msgP.textContent = "La note doit être un nombre entre 0 et 20.";
    msgP.hidden = true;

    divActions.append(btnAbsent, labelInput, btnNote);

    div.append(btn, divActions);
    li.append(div, msgP);

    return li;
}

const lignes = eleves.map(creerLigne);

listeEleves.append(...lignes);

compteur.textContent = eleves.length + " élèves";


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
            (groupeChoisi === "" || eleves.groupeId === Number(groupeChoisi)) &&
            (nom.includes(texteRecherche) || prenom.includes(texteRecherche))
        );
    });
    runderData(elevesFiltres)
}

filtreGroupe.addEventListener("change" , afficherEleves)
recherche.addEventListener("input" , afficherEleves)

runderData(); 

