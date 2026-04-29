import { ui } from "./ui-engine.js";

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    ui.load("header-slot", "components/header.html"),
    ui.load("footer-slot", "components/footer.html"),
  ]);

  // rota inicial
  ui.navigate("home");

  // listener de cliques global
  document.addEventListener("click", (e) => {
    const menu = document.getElementById("mobile-menu");
    const btn = document.getElementById("mobile-menu-btn");

    const isMenuBtn = e.target.closest("#mobile-menu-btn");
    if (isMenuBtn) {
      if (menu) menu.classList.toggle("hidden");
      return;
    }

    // 2.fechar se clicar em qualquer lugar que não seja o menu ou o botao)
    if (menu && !menu.classList.contains("hidden")) {
      const isClickInsideMenu = menu.contains(e.target);

      if (!isClickInsideMenu) {
        menu.classList.add("hidden");
      }
    }

    // 3. Lógica de Navegação [data-link]
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      const route = link.getAttribute("data-link");

      // Garante que o menu fecha ao navegar
      if (menu) menu.classList.add("hidden");

      ui.navigate(route);
    }
  });
});
