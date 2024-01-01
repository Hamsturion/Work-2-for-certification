/////////////////////////////////////////////////////////////////////////////////
const dropdown = document.getElementById("dropdown");
const formular = document.querySelector("form");

formular.addEventListener("submit", (e) => {
  const countMain = document.querySelector(".countMain").value;
  const countElements = document.querySelector(".countElements").value;
  const countDeepsLevels = document.querySelector(".countDeepsLevels").value;
  e.preventDefault();
  dropdown.replaceChildren();
  ReloadAll(countMain, dropdown, countElements, countDeepsLevels);
});

const LoadAll = (a, b) => {
  GenMainPosition(a, b);
  AddColapse(b);
  AddForAllASpansAndArrowsInMenu(b);
  AddMAINsForFirstLiInMenu(b);
  AddTagsForAllUl(b);
  AddMenusForAllLiInMenu(b);
};

const ReloadAll = (a, b, c, d) => {
  GenMainPosition(a, b, c, d);
  AddColapse(b);
  AddForAllASpansAndArrowsInMenu(b);
  AddMAINsForFirstLiInMenu(b);
  AddTagsForAllUl(b);
  AddMenusForAllLiInMenu(b);
};

const Level = (countElements, countDeepsLevels) => {
  //Generace menu s naslednym nahodnym vlozenim do sebe
  let newFrag = document.createDocumentFragment();
  const a = document.createElement("a");
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  let c1;

  if (!countElements) {
    c1 = Math.ceil(Math.random() * 5); //pocet randomnich polozek v jednem Level()
  } else {
    c1 = countElements;
  }

  let c3 = countDeepsLevels;

  for (let i = 0; i < c1; i++) {
    let c2 = Math.ceil(Math.random() * 3); //random (vlozeni, bez vlozeni, prazdno)

    if (c2 == 1 && c3 > 0) {
      //pocet iteraci vlozeni
      c3--;
      const a = document.createElement("a");
      const li = document.createElement("li");
      li.appendChild(a);
      newFrag.appendChild(Level(countElements, c3));
      ul.appendChild(newFrag);
    }
    if (c2 == 2) {
      //nebo nahodnych bez vlozeni
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

  return newFrag.appendChild(li);
};

const GenMainPosition = (countMain, mainParent, countElements, countDeeps) => {
  //Vytvoreni nahodnych poctu prazdnych MAIN a vlozenych Menu s vlozenim
  let count;
  if (!countMain) {
    count = Math.ceil(Math.random() * 4 + 5);
  } else {
    count = countMain;
  }
  let deep;
  if (!countDeeps) {
    deep = 8; //pocet randomnich polozek v jednem Level()
  } else {
    deep = countDeeps;
  }

  for (let i = 1; i <= count; i++) {
    mainParent.appendChild(Level(countElements, deep));
  }
};

const AddColapse = (mainParent) => {
  //pridavani classu elementum UL jestli ne prazdny
  const allUl = mainParent.querySelectorAll("ul");
  let i = 0;
  allUl.forEach((findCountOfElements) => {
    let ul = allUl[i];
    let allLi = findCountOfElements.querySelectorAll("li");
    if (allLi.length >= 0) {
      ul.classList.add("hiden");
    }
    i++;
  });
};

const AddForAllASpansAndArrowsInMenu = (mainParent) => {
  //pridavani span do vnitr kazdeho tagu a
  const allAFromDropdown = mainParent.querySelectorAll("a");
  allAFromDropdown.forEach((addAInSpan) => {
    const newspan = document.createElement("span");
    addAInSpan.appendChild(newspan);
  });
};

const AddMAINsForFirstLiInMenu = (mainParent) => {
  //dodavani nazv pro prvni elementy MAIN
  const firstLevelAInLiElement = mainParent.querySelectorAll(
    ":scope > li > a > span"
  );
  let x = 1;
  firstLevelAInLiElement.forEach((addMAINToA) => {
    addMAINToA.textContent = "MAIN " + x++;
  });
};

const AddTagsForAllUl = (mainParent) => {
  //pridavani tagu a klasu do vnitr vsech ul jestli maji potomky
  const allUlFromMenu = mainParent.querySelectorAll("ul");
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

const AddMenusForAllLiInMenu = (mainParent) => {
  //dodavani nazv pro vlozene elementy Menu
  const allUlFromMenu = mainParent.querySelectorAll("ul");
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

const ElemInCss = (cssElement) => {
  //odeber z css var vysky jednotlive polozky menu
  const factHeightSorce = getComputedStyle(document.documentElement)
    .getPropertyValue(cssElement)
    .replace("px", "");
  const factHeight = parseInt(factHeightSorce);
  return factHeight;
};

const Plus = (ul, eh, eu) => {
  //pridavani vysky elementum

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
  //odebirani vysky elementum

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

const BtnArrowsListenClic = (e) => {
  addEventListener("click", e);
};

const PlusMinusElements = (e) => {
  //spracovani Plus() a Minus() s pridavanim klasu
  const btnNameClass = "btnarrow";
  const minusIcoClass = "uparrow";
  const plusIcoClass = "downarrow";
  const hideClass = "hiden";
  const elementHeight = "--menu-element-height";
  const elementHeightUnit = "px";

  if (e.target.classList.contains(btnNameClass)) {
    //"t_" - targeted
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

LoadAll(0, dropdown);
