/////////////////////////////////////////////////////////////////////////////////

// const { unlinkSync } = require("fs");

//rucni zadani polozek do menu
const formular = document.querySelector("form");
const countMain = document.querySelector(".countMain");
// const countLevelsInMain = document.querySelector(".countLevelsInMain");
// const countDeepsLevelsInMain = document.querySelector(
//   ".countDeepsLevelsInMain"
// );

formular.addEventListener("submit", (e) => {
  let xxx = countMain.value;
  e.preventDefault();
  console.log(xxx);
  const element_Dropdown_menuZ = document.getElementById("dropdown");
  element_Dropdown_menuZ.replaceChildren();
  // function RELOAD_ALL();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Generace menu s naslednym nahodnym vlozenim do sebe
const Level = function genLevel() {
  let newFrag = document.createDocumentFragment();
  const a = document.createElement("a");
  const li = document.createElement("li");
  const ul = document.createElement("ul");

  let c1 = Math.ceil(Math.random() * 2); //2 opakovani, jestli bude 3 a vic nasobne se zvetsuji sansi opakovani (20k iteraci a vic)
  for (let i = 0; i <= c1; i++) {
    let c2 = Math.ceil(Math.random() * 3);

    if (c2 == 1) {
      //vlozeni samo do sebe
      const a = document.createElement("a");
      const li = document.createElement("li");
      li.appendChild(a);
      newFrag.appendChild(li);
      newFrag.appendChild(Level());
    } else if (c2 == 2) {
      //bez vlozeni
      const a = document.createElement("a");
      const li = document.createElement("li");
      li.appendChild(a);
      newFrag.appendChild(li);
    } else if (c2 == 3) {
      //prazdna polozka
      null;
    }
  }

  ul.appendChild(newFrag);
  li.appendChild(a);
  li.appendChild(ul);
  newFrag.appendChild(li);
  return newFrag;
};

//Vytvoreni prazdne polozky menu MAIN
function genMain() {
  const element_Dropdown_menuX = document.getElementById("dropdown");
  const li = document.createElement("li");
  const a = document.createElement("a");
  li.appendChild(a);
  element_Dropdown_menuX.appendChild(li);
}

//Vytvoreni nahodnych poctu prazdnych MAIN a vlozenych Menu s vlozenim
function genMainPosition() {
  let countMainFromUser = Math.ceil(Math.random() * 5 + 4);
  for (let i = 1; i <= countMainFromUser; i++) {
    const element_Dropdown_menuX = document.getElementById("dropdown");
    let c = Math.ceil(Math.random() * 2);
    if (c == 1) {
      genMain();
    } else if (c == 2) {
      element_Dropdown_menuX.appendChild(Level());
    }
  }
}
genMainPosition();

//klasovani pro animace hamburgr menu
function MenuIconListenClic(e) {
  document.querySelector(".menu-icon").addEventListener("click", e);
}

function menuAnimace() {
  const dropdown = document.getElementById("dropdown");
  const menuIcon = document.querySelector(".menu-icon");
  const svg = menuIcon.querySelector("svg");
  svg.classList.toggle("active");
  dropdown.classList.toggle("off");
}
MenuIconListenClic(menuAnimace);

function MainSectionListenClic(e) {
  document.querySelector("main").addEventListener("click", e);
}
function menuHideOnClic() {
  const dropdown = document.getElementById("dropdown");
  const svg = document.querySelector("svg");
  if (dropdown.classList.contains("off")) {
    svg.classList.remove("active");
    dropdown.classList.remove("off");
  }
}
MainSectionListenClic(menuHideOnClic);

//pridavani classu elementum UL jestli ne prazdny
function addColapse() {
  const allUl = document.getElementById("dropdown").querySelectorAll("ul");
  let i = 0;
  allUl.forEach((findCountOfElements) => {
    let ul = allUl[i];

    let allLi = findCountOfElements.querySelectorAll("li");

    if (allLi.length >= 0) {
      ul.classList.add("colapse");
      ul.classList.add("hiden");
    }
    i++;
  });
}
addColapse();

//pridavani tagu
function AddForAllASpansAndArrowsInMenu() {
  //pridavani span do vnitr kazdeho tagu a
  const allAFromDropdown = document
    .getElementById("dropdown")
    .querySelectorAll("a");

  allAFromDropdown.forEach((addAInSpan) => {
    const newspan = document.createElement("span");
    addAInSpan.appendChild(newspan);
  });
}
AddForAllASpansAndArrowsInMenu();

function addMAINsForFirstLiInMenu() {
  //dodavani nazv pro prvni elementy MAIN
  const element_Dropdown_menu = document.getElementById("dropdown");
  const firstLevelAInLiElement = element_Dropdown_menu.querySelectorAll(
    ":scope > li > a > span"
  );

  let x = 1;
  firstLevelAInLiElement.forEach((addMAINToA) => {
    addMAINToA.textContent = "MAIN " + x++;
  });
}
addMAINsForFirstLiInMenu();

function addTagsForAllUl() {
  //pridavani tagu a klasu do vnitr vsech ul jestli maji potomky
  const allUlFromMenu = document
    .getElementById("dropdown")
    .querySelectorAll("ul");

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
}
addTagsForAllUl();

function addMenusForAllLiInMenu() {
  //dodavani nazv pro prvni elementy MAIN
  const allUlFromMenu = document
    .getElementById("dropdown")
    .querySelectorAll("ul");
  allUlFromMenu.forEach((forAnyLiInMenu) => {
    const allLiInUl = forAnyLiInMenu.querySelectorAll(":scope>li");
    let y = 0;
    allLiInUl.forEach((getUl) => {
      const span = getUl.querySelector(":scope>a>span");
      y++;
      span.textContent = "Menu " + y;
    });
  });
}
addMenusForAllLiInMenu();

//odeber z css var vysky jednotlive polozky menu
function getElementFromCss() {
  const factHeightSorce = getComputedStyle(document.documentElement)
    .getPropertyValue("--menu-element-height")
    .replace("px", "");
  const factHeight = parseInt(factHeightSorce);
  return factHeight;
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//PREPSAT KOD NIZ
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
const dropdown = document.getElementById("dropdown");
dropdown.onclick = function (event) {
  if (event.target.classList.contains("btnarrow")) {
    const targetBtnarrow = event.target.parentNode.querySelector(".btnarrow");
    const targetUlContainer = event.target.parentNode.querySelector("ul");
    //dulezity radek co odebira pocet radku menu pro podalsi vypocet vysky max-height pro animace
    let sum_CountOf_AllLiInCurrentUl =
      targetUlContainer.querySelectorAll(":scope > li").length;
    const upLevelColapse = event.target.closest(".colapse");
    if (!targetUlContainer) return;
    //pro animaci sipky v rozklikavacim menu
    if (targetBtnarrow.classList.contains("downarrow")) {
      targetBtnarrow.classList.remove("downarrow");
      targetBtnarrow.classList.add("uparrow");
    } else {
      targetBtnarrow.classList.remove("uparrow");
      targetBtnarrow.classList.add("downarrow");
    }

    if (targetUlContainer.classList.contains("hiden")) {
      ///////////////////////////////////////////////////////////////
      //-------------------      +++         -----------------------//
      ///////////////////////////////////////////////////////////////

      if (upLevelColapse == null) {
        let heightPx = targetUlContainer.style.maxHeight;
        //kontrola estli tento level neco ma a take 0 se hodi
        if (heightPx != null && heightPx <= 0) {
          let heightLessPX = 0;
          targetUlContainer.style.maxHeight =
            sum_CountOf_AllLiInCurrentUl * getElementFromCss() +
            heightLessPX +
            "px";
          //pridavame vysku skutecnou
        }
      } else {
        //jinak jestli neco v levelu je:
        let element = targetBtnarrow;
        while (element.parentNode != dropdown) {
          element = element.parentNode;
          //opakovat az nedojdou levely
          if (element.classList.contains("colapse")) {
            //estli level ma v sobe collapse

            let heightPx = targetUlContainer.style.maxHeight;
            if (heightPx == "") {
              //estli taked level neni cisty
              targetUlContainer.style.maxHeight =
                sum_CountOf_AllLiInCurrentUl * getElementFromCss() + "px ";
              let heightPx = element.style.maxHeight;
              let heightLessPX = heightPx.replace("px", "");
              element.style.maxHeight =
                parseInt(heightLessPX) +
                sum_CountOf_AllLiInCurrentUl * getElementFromCss() +
                "px ";
            } else if (heightPx != "") {
              //estli taked level cisty

              let heightPxCurent = targetUlContainer.style.maxHeight;
              let heightLessPXCurent = heightPxCurent.replace("px", "");

              let heightPx = element.style.maxHeight;
              let heightLessPX = heightPx.replace("px", "");

              element.style.maxHeight =
                parseInt(heightLessPXCurent) + parseInt(heightLessPX) + "px ";
              //zase
            }
          }
        }
      }
      ///////////////////////////////////////////////////////////////
      //-------------------      ---         -----------------------//
      ///////////////////////////////////////////////////////////////
    } else {
      //kontrola estli tento level je 0
      if (upLevelColapse == null) {
        //tento level je 0, -");
      } else {
        //jinak jestli neco v levelu je:
        let element = targetBtnarrow;
        while (element.parentNode != dropdown) {
          element = element.parentNode;
          //opakovat levely vyse az nedojdou levely
          if (element.classList.contains("colapse")) {
            if (element != targetUlContainer) {
              //bereme level ktery neni tento a je vyse mu odebirame od jeho vysky tuto
              let heightPx = element.style.maxHeight;
              let heightPxCurent = targetUlContainer.style.maxHeight;
              let heightLessPX = heightPx.replace("px", "");
              let heightLessPXCurent = heightPxCurent.replace("px", "");
              element.style.maxHeight =
                parseInt(heightLessPX) - parseInt(heightLessPXCurent) + "px ";
            }
            //opakovat
          }
        }
      }
    }
    //po kliku se pridava nebo odstranuje klas
    if (targetUlContainer.classList.contains("hiden")) {
      targetUlContainer.classList.remove("hiden");
    } else {
      targetUlContainer.classList.add("hiden");
    }
  }
};

// function RELOAD_ALL() {
//   genMainPosition();
// }
