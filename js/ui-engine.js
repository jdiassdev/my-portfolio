export const ui = {
  async load(elementId, path) {
    try {
      const response = await fetch(path);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      const element = document.getElementById(elementId);

      element.innerHTML = html;

      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error(`Erro ao carregar componente ${path}:`, err);
      const slot = document.getElementById(elementId);
      if (slot) {
        slot.innerHTML = `<div class="p-8 border-4 border-black bg-red-100 font-bold uppercase italic">/ Erro 404: Componente não encontrado_</div>`;
      }
    }
  },

  async navigate(path) {
    const slot = document.getElementById("view-slot");
    slot.classList.remove("fade-in");
    await this.load("view-slot", `components/${path}.html`);
    void slot.offsetWidth;
    slot.classList.add("fade-in");
  },
};
