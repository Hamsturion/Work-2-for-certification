//zadavani nejake +/- globalni promene
/////////////////////////////////////////////////////////////////////////////////
//odeber z scc var vysky jednotlive polozky menu
const factHeightSorce = getComputedStyle(document.documentElement)
  .getPropertyValue("--menu-element-height")
  .replace("px", "");
const factHeight = parseInt(factHeightSorce);
/////////////////////////////////////////////////////////////////////////////////
//pro zadavani v elementy svg
const ns = "http://www.w3.org/2000/svg";
const element_Svg_Of_Hamburger = document.querySelector("svg");
/////////////////////////////////////////////////////////////////////////////////
const element_Dropdown_menu = document.getElementById("dropdown");
const all_Elements_Ul_From_element_Dropdown_menu = document
  .getElementById("dropdown")
  .querySelectorAll("ul");

const all_Elements_A_From_element_Dropdown_menu = document
  .getElementById("dropdown")
  .querySelectorAll("a");
/////////////////////////////////////////////////////////////////////////////////
//klasovani pro animace hamburgr menu
document.querySelector(".menu-icon").addEventListener("click", menuAnimace);
function menuAnimace() {
  element_Svg_Of_Hamburger.classList.toggle("active");
  element_Dropdown_menu.classList.toggle("off");
}

document.querySelector("main").addEventListener("click", menuHideOnClic);
function menuHideOnClic() {
  if (element_Dropdown_menu.classList.contains("off")) {
    element_Svg_Of_Hamburger.classList.remove("active");
    element_Dropdown_menu.classList.remove("off");
  }
}
/////////////////////////////////////////////////////////////////////////////////

const firstLevelLiElement = document
  .getElementById("dropdown")
  .querySelectorAll(":scope >  li");

function addColapse() {
  //oh jo, ten kousek kodu zacal psat do prednasky o forEach:), nevim uz nemam silu hrabat, pak po nalade prepisu
  for (let i = 0; i < all_Elements_Ul_From_element_Dropdown_menu.length; i++) {
    if (
      all_Elements_Ul_From_element_Dropdown_menu[i].querySelectorAll("li")
        .length >= 1
    ) {
      console.log(all_Elements_Ul_From_element_Dropdown_menu[i]);
      // all_Elements_Ul_From_element_Dropdown_menu[i].setAttribute("id", i); //for me, control n consol
      all_Elements_Ul_From_element_Dropdown_menu[i].classList.add("colapse");
      all_Elements_Ul_From_element_Dropdown_menu[i].classList.add("hiden");
    }
  }
}

addColapse();

/////////////////////////////////////////////////////////////////////////////////
//pridavani span do vnitr tagu a
all_Elements_A_From_element_Dropdown_menu.forEach((existA) => {
  const newspan = document.createElement("span");
  existA.appendChild(newspan);
});

/////////////////////////////////////////////////////////////////////////////////

y = 0;
all_Elements_Ul_From_element_Dropdown_menu.forEach((allUlfromMenu) => {
  x = 1;
  y++;

  const firstLevelAInLiElement = element_Dropdown_menu.querySelectorAll(
    ":scope >  li  > a > span"
  );
  //pridavani klasu
  if (allUlfromMenu.hasChildNodes()) {
    const newspan = document.createElement("span");
    const svg = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");
    newspan.classList.add("btnarrow");
    newspan.classList.add("downarrow");
    newspan.appendChild(svg);
    svg.appendChild(path);
    svg.setAttribute("viewBox", "0 0 10 10");
    allUlfromMenu.parentNode.classList.add("togglelist");
    allUlfromMenu.parentNode.insertBefore(newspan, allUlfromMenu);
  }
  //tady zacina hra s dodavanim nazv pro jednotlive menu
  firstLevelAInLiElement.forEach((addMAINToA) => {
    addMAINToA.textContent = "MAIN " + x++;
  });

  const allChildLiWithAFromMenu = allUlfromMenu.querySelectorAll(
    ":scope >  li > a > span"
  );

  z = 1;

  allChildLiWithAFromMenu.forEach((addMenuToA) => {
    addMenuToA.textContent = "Menu " + y + " - " + z++;
  });
});

/////////////////////////////////////////////////////////////////////////////////

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
            sum_CountOf_AllLiInCurrentUl * factHeight + heightLessPX + "px";
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
                sum_CountOf_AllLiInCurrentUl * factHeight + "px ";
              let heightPx = element.style.maxHeight;
              let heightLessPX = heightPx.replace("px", "");
              element.style.maxHeight =
                parseInt(heightLessPX) +
                sum_CountOf_AllLiInCurrentUl * factHeight +
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
/////////////////////////////////////////////////////////////////////////////////