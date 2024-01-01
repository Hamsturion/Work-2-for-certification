//Animace hamburgr menu

const MenuIconListenClic = (e) => {
  document.querySelector(".menu-icon").addEventListener("click", e);
};

const MainSectionListenClic = (e) => {
  document.querySelector("main").addEventListener("click", e);
};

const MenuAnimace = () => {
  const dropdown = document.getElementById("dropdown");
  const menuIcon = document.querySelector(".menu-icon");
  const svg = menuIcon.querySelector("svg");
  svg.classList.toggle("active");
  dropdown.classList.toggle("off");
};

const MenuHideOnClic = () => {
  const dropdown = document.getElementById("dropdown");
  const menuIcon = document.querySelector(".menu-icon");
  const svg = menuIcon.querySelector("svg");
  if (dropdown.classList.contains("off")) {
    svg.classList.remove("active");
    dropdown.classList.remove("off");
  }
};

MenuIconListenClic(MenuAnimace);
MainSectionListenClic(MenuHideOnClic);
