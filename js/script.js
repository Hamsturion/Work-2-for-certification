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
  RELOAD_ALL(countFromUser, dropdown);
});

const RELOAD_ALL = (a, b) => {
  genMainPosition(a, b);
  addColapse(b);
  AddForAllASpansAndArrowsInMenu(b);
  addMAINsForFirstLiInMenu(b);
  addTagsForAllUl(b);
  addMenusForAllLiInMenu(b);
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
const genMainPosition = (countFromUser, mainMenuParentElement) => {
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
genMainPosition(0, dropdown);

//klasovani pro animace hamburgr menu
MenuIconListenClic = (e) => {
  document.querySelector(".menu-icon").addEventListener("click", e);
};
const menuAnimace = () => {
  const dropdown = document.getElementById("dropdown");
  const menuIcon = document.querySelector(".menu-icon");
  const svg = menuIcon.querySelector("svg");
  svg.classList.toggle("active");
  dropdown.classList.toggle("off");
};
MenuIconListenClic(menuAnimace);

const MainSectionListenClic = (e) => {
  document.querySelector("main").addEventListener("click", e);
};
const menuHideOnClic = () => {
  const dropdown = document.getElementById("dropdown");
  const svg = document.querySelector("svg");
  if (dropdown.classList.contains("off")) {
    svg.classList.remove("active");
    dropdown.classList.remove("off");
  }
};
MainSectionListenClic(menuHideOnClic);

//pridavani classu elementum UL jestli ne prazdny
const addColapse = (mainMenuParentElement) => {
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
addColapse(dropdown);

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

const addMAINsForFirstLiInMenu = (mainMenuParentElement) => {
  //dodavani nazv pro prvni elementy MAIN
  const firstLevelAInLiElement = mainMenuParentElement.querySelectorAll(
    ":scope > li > a > span"
  );

  let x = 1;
  firstLevelAInLiElement.forEach((addMAINToA) => {
    addMAINToA.textContent = "MAIN " + x++;
  });
};
addMAINsForFirstLiInMenu(dropdown);

const addTagsForAllUl = (mainMenuParentElement) => {
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
addTagsForAllUl(dropdown);

const addMenusForAllLiInMenu = (mainMenuParentElement) => {
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
addMenusForAllLiInMenu(dropdown);

//odeber z css var vysky jednotlive polozky menu
const getElementFromCss = (cssElement) => {
  const factHeightSorce = getComputedStyle(document.documentElement)
    .getPropertyValue(cssElement)
    .replace("px", "");
  const factHeight = parseInt(factHeightSorce);
  return factHeight;
};

const BtnArrowsListenClic = (e) => {
  addEventListener("click", e);
};

btnNameClass = "btnarrow";
minusIcoClass = "uparrow";
plusIcoClass = "downarrow";
hideClass = "hiden";
elementHeight = "--menu-element-height";
elementHeightUnit = "px";

const plusElements = (e) => {
  if (e.target.classList.contains(btnNameClass)) {
    //"t_" - targetet
    const t_btnArrow = e.target.parentNode.querySelector("." + btnNameClass);
    const t_Ul = e.target.parentNode.querySelector("ul");
    const t_AllLiInCurrentUl = t_Ul.querySelectorAll(":scope > li").length;
    const t_upLevelUl = e.target.closest("ul");

    t_btnArrow.classList.toggle(minusIcoClass);
    t_btnArrow.classList.toggle(plusIcoClass);

    const plus = () => {
      if (t_upLevelUl.id) {
        let heightPx = t_Ul.style.maxHeight;
        //kontrola estli tento UL nema zadanou zadanou vysku anebo zadano 0:
        if (heightPx != null && heightPx <= 0) {
          let heightLessPX = 0;
          t_Ul.style.maxHeight =
            t_AllLiInCurrentUl * getElementFromCss(elementHeight) +
            heightLessPX +
            elementHeightUnit;
          //pridavame vysku skutecnou
        }
      } else {
        //jinak jestli neco v levelu je a vic nez 0:
        let elementUl = t_Ul;
        while (!elementUl.id) {
          elementUl = elementUl.parentNode.closest("ul");
          //opakovat az nedojdou levely
          let heightPx = t_Ul.style.maxHeight;
          if (!heightPx) {
            //estli taked level neni cisty
            t_Ul.style.maxHeight =
              t_AllLiInCurrentUl * getElementFromCss(elementHeight) +
              elementHeightUnit;
            let heightPx = elementUl.style.maxHeight;
            let heightLessPX = heightPx.replace(elementHeightUnit, "");
            elementUl.style.maxHeight =
              parseInt(heightLessPX) +
              t_AllLiInCurrentUl * getElementFromCss(elementHeight) +
              elementHeightUnit +
              " ";
          } else {
            //estli taked level cisty

            let heightPxCurent = t_Ul.style.maxHeight;
            let heightLessPXCurent = heightPxCurent.replace(
              elementHeightUnit,
              ""
            );
            let heightPx = elementUl.style.maxHeight;
            let heightLessPX = heightPx.replace(elementHeightUnit, "");

            elementUl.style.maxHeight =
              parseInt(heightLessPXCurent) +
              parseInt(heightLessPX) +
              elementHeightUnit +
              " ";
            //zase
          }
        }
      }
    };

    const minus = () => {
      //kontrola estli tento level je 0
      if (!t_upLevelUl.id) {
        //jinak jestli neco v levelu je:
        let elementUl = t_Ul;
        while (!elementUl.id) {
          elementUl = elementUl.parentNode.closest("ul");
          //opakovat levely vyse az nedojdou levely
          if (elementUl != t_Ul) {
            //bereme level ktery neni tento a je vyse mu odebirame od jeho vysky tuto
            let heightPx = elementUl.style.maxHeight;
            let heightPxCurent = t_Ul.style.maxHeight;
            let heightLessPX = heightPx.replace(elementHeightUnit, "");
            let heightLessPXCurent = heightPxCurent.replace(
              elementHeightUnit,
              ""
            );
            elementUl.style.maxHeight =
              parseInt(heightLessPX) -
              parseInt(heightLessPXCurent) +
              elementHeightUnit +
              " ";
          }
          //opakovat
        }
      }
    };

    if (t_Ul.classList.contains(hideClass)) {
      plus();
    } else {
      minus();
    }
    t_Ul.classList.toggle(hideClass);
  }
};
BtnArrowsListenClic(plusElements);
