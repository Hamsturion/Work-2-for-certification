/////////////////////////////////////////////////////////////////////////////////
const dropdown = document.getElementById("dropdown");
//rucni zadani polozek do menu
const formular = document.querySelector("form");
const countMain = document.querySelector(".countMain");
const countLevelsInMain = document.querySelector(".countLevelsInMain");
const countDeepsLevelsInMain = document.querySelector(
  ".countDeepsLevelsInMain"
);

formular.addEventListener("submit", (e) => {
  let countFromUser = countMain.value;
  e.preventDefault();
  dropdown.replaceChildren();
  ReloadAll(countFromUser, dropdown);
});

const ReloadAll = (a, b) => {
  GenMainPosition(a, b);
  AddColapse(b);
  AddForAllASpansAndArrowsInMenu(b);
  AddMAINsForFirstLiInMenu(b);
  AddTagsForAllUl(b);
  AddMenusForAllLiInMenu(b);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Generace menu s naslednym nahodnym vlozenim do sebe
const Level = () => {
  let newFrag = document.createDocumentFragment();
  const a = document.createElement("a");
  const li = document.createElement("li");
  const ul = document.createElement("ul");

  let c1 = Math.ceil(Math.random() * 2); //2 opakovani, jestli bude 3 a vic nasobne se zvetsuji sansi opakovani (20k iteraci a vic)
  for (let i = 0; i <= c1; i++) {
    let c2 = Math.ceil(Math.random() * 4); //if c2 = 3 or 4 MAIN without levels

    if (c2 == 1) {
      //vlozeni samo do sebe
      const a = document.createElement("a");
      const li = document.createElement("li");
      li.appendChild(a);
      newFrag.appendChild(li);
      newFrag.appendChild(Level());
      ul.appendChild(newFrag);
    } else if (c2 == 2) {
      //bez vlozeni
      const a = document.createElement("a");
      const li = document.createElement("li");
      li.appendChild(a);
      newFrag.appendChild(li);
      ul.appendChild(newFrag);
    }
  }

  li.appendChild(a);

  if (ul.hasChildNodes()) {
    li.appendChild(ul);
  }

  newFrag.appendChild(li);
  return newFrag;
};

//Vytvoreni nahodnych poctu prazdnych MAIN a vlozenych Menu s vlozenim
const GenMainPosition = (countFromUser, mainMenuParentElement) => {
  let count;
  if (!countFromUser) {
    count = Math.ceil(Math.random() * 4 + 5);
  } else {
    count = countFromUser;
  }

  for (let i = 1; i <= count; i++) {
    mainMenuParentElement.appendChild(Level());
  }
};
GenMainPosition(0, dropdown);

//klasovani pro animace hamburgr menu
MenuIconListenClic = (e) => {
  document.querySelector(".menu-icon").addEventListener("click", e);
};
const MenuAnimace = () => {
  const dropdown = document.getElementById("dropdown");
  const menuIcon = document.querySelector(".menu-icon");
  const svg = menuIcon.querySelector("svg");
  svg.classList.toggle("active");
  dropdown.classList.toggle("off");
};
MenuIconListenClic(MenuAnimace);

const MainSectionListenClic = (e) => {
  document.querySelector("main").addEventListener("click", e);
};
const MenuHideOnClic = () => {
  const dropdown = document.getElementById("dropdown");
  const svg = document.querySelector("svg");
  if (dropdown.classList.contains("off")) {
    svg.classList.remove("active");
    dropdown.classList.remove("off");
  }
};
MainSectionListenClic(MenuHideOnClic);

//pridavani classu elementum UL jestli ne prazdny
const AddColapse = (mainMenuParentElement) => {
  const allUl = mainMenuParentElement.querySelectorAll("ul");
  let i = 0;
  allUl.forEach((findCountOfElements) => {
    let ul = allUl[i];
    let allLi = findCountOfElements.querySelectorAll("li");
    if (allLi.length >= 0) {
      ul.classList.add("colapse");
      ///////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////
      // ul.setAttribute("id", i);
      ul.classList.add("hiden");
      ///////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////
    }
    i++;
  });
};
AddColapse(dropdown);

//pridavani tagu
const AddForAllASpansAndArrowsInMenu = (mainMenuParentElement) => {
  //pridavani span do vnitr kazdeho tagu a
  const allAFromDropdown = mainMenuParentElement.querySelectorAll("a");
  allAFromDropdown.forEach((addAInSpan) => {
    const newspan = document.createElement("span");
    addAInSpan.appendChild(newspan);
  });
};
AddForAllASpansAndArrowsInMenu(dropdown);

const AddMAINsForFirstLiInMenu = (mainMenuParentElement) => {
  //dodavani nazv pro prvni elementy MAIN
  const firstLevelAInLiElement = mainMenuParentElement.querySelectorAll(
    ":scope > li > a > span"
  );

  let x = 1;
  firstLevelAInLiElement.forEach((addMAINToA) => {
    addMAINToA.textContent = "MAIN " + x++;
  });
};
AddMAINsForFirstLiInMenu(dropdown);

const AddTagsForAllUl = (mainMenuParentElement) => {
  //pridavani tagu a klasu do vnitr vsech ul jestli maji potomky
  const allUlFromMenu = mainMenuParentElement.querySelectorAll("ul");
  allUlFromMenu.forEach((forAnyUlInMenu) => {
    if (forAnyUlInMenu.hasChildNodes()) {
      const ns = "http://www.w3.org/2000/svg";
      const newspan = document.createElement("span");
      const svg = document.createElementNS(ns, "svg");
      const path = document.createElementNS(ns, "path");
      newspan.classList.add("btnarrow");
      newspan.classList.add("downarrow");
      newspan.appendChild(svg);
      svg.appendChild(path);
      svg.setAttribute("viewBox", "0 0 10 10");
      forAnyUlInMenu.parentNode.classList.add("togglelist");
      forAnyUlInMenu.parentNode.insertBefore(newspan, forAnyUlInMenu);
    }
  });
};
AddTagsForAllUl(dropdown);

const AddMenusForAllLiInMenu = (mainMenuParentElement) => {
  //dodavani nazv pro vlozene elementy Menu
  const allUlFromMenu = mainMenuParentElement.querySelectorAll("ul");
  allUlFromMenu.forEach((forAnyLiInMenu) => {
    const allLiInUl = forAnyLiInMenu.querySelectorAll(":scope>li");
    let y = 0;
    allLiInUl.forEach((getUl) => {
      const span = getUl.querySelector(":scope>a>span");
      y++;
      span.textContent = "Menu " + y;
    });
  });
};
AddMenusForAllLiInMenu(dropdown);

//odeber z css var vysky jednotlive polozky menu
const ElemInCss = (cssElement) => {
  const factHeightSorce = getComputedStyle(document.documentElement)
    .getPropertyValue(cssElement)
    .replace("px", "");
  const factHeight = parseInt(factHeightSorce);
  return factHeight;
};

const BtnArrowsListenClic = (e) => {
  addEventListener("click", e);
};

const Plus = (ul, eh, eu) => {
  //ul - element "UL"
  //eh - element height from css
  //eu - element height unit

  const upUl = ul.closest("ul");
  const lic = ul.querySelectorAll(":scope > li").length;
  if (upUl.id) {
    let h_Eu = ul.style.maxHeight;
    //kontrola estli tento UL nema zadanou zadanou vysku anebo zadano 0:
    if (h_Eu != null && h_Eu <= 0) {
      //pridavame vysku skutecnou
      let h_NoEu = 0;
      ul.style.maxHeight = lic * ElemInCss(eh) + h_NoEu + eu;
    }
  } else {
    //jinak jestli neco v levelu je a vic nez 0:
    let eUl = ul;
    while (!eUl.id) {
      eUl = eUl.parentNode.closest("ul");
      //opakovat az nedojdou levely
      let h_Eu = ul.style.maxHeight;
      if (!h_Eu) {
        //estli taked level neni cisty
        let h_Eu = eUl.style.maxHeight;
        let h_NoEu = h_Eu.replace(eu, "");

        ul.style.maxHeight = lic * ElemInCss(eh) + eu;
        eUl.style.maxHeight = parseInt(h_NoEu) + lic * ElemInCss(eh) + eu + " ";
      } else {
        //estli taked level cisty
        let h_EuC = ul.style.maxHeight;
        let h_NoEuC = h_EuC.replace(eu, "");
        let h_Eu = eUl.style.maxHeight;
        let h_NoEu = h_Eu.replace(eu, "");

        eUl.style.maxHeight = parseInt(h_NoEuC) + parseInt(h_NoEu) + eu + " ";
        //zase
      }
    }
  }
};

const Minus = (ul, eu) => {
  //ul - element "UL"
  //eu - element height unit
  const upUl = ul.closest("ul");
  //kontrola estli tento level je 0
  if (!upUl.id) {
    //jinak jestli neco v levelu je:
    let eUl = ul;
    while (!eUl.id) {
      eUl = eUl.parentNode.closest("ul");
      //opakovat levely vyse az nedojdou levely
      if (eUl != ul) {
        //bereme level ktery neni tento a je vyse mu odebirame od jeho vysky tuto
        let h_Eu = eUl.style.maxHeight; //element height
        let h_EuC = ul.style.maxHeight; //curent element height
        let h_NoEu = h_Eu.replace(eu, "");
        let h_NoEuC = h_EuC.replace(eu, "");
        eUl.style.maxHeight = parseInt(h_NoEu) - parseInt(h_NoEuC) + eu + " ";
      }
      //opakovat
    }
  }
};

const PlusMinusElements = (e) => {
  btnNameClass = "btnarrow";
  minusIcoClass = "uparrow";
  plusIcoClass = "downarrow";
  hideClass = "hiden";
  elementHeight = "--menu-element-height";
  elementHeightUnit = "px";

  if (e.target.classList.contains(btnNameClass)) {
    //"t_" - targetet
    const t_btnArrow = e.target.parentNode.querySelector("." + btnNameClass);
    const t_Ul = e.target.parentNode.querySelector("ul");

    if (t_btnArrow.classList.contains(plusIcoClass)) {
      Plus(t_Ul, elementHeight, elementHeightUnit);
    } else {
      Minus(t_Ul, elementHeightUnit);
    }
    t_btnArrow.classList.toggle(minusIcoClass);
    t_btnArrow.classList.toggle(plusIcoClass);
    t_Ul.classList.toggle(hideClass);
  }
};
BtnArrowsListenClic(PlusMinusElements);
