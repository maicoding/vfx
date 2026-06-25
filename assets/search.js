(() => {
  const input = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  const cards = [...document.querySelectorAll("[data-note-card]")];
  if (!input || !window.VAULT_SEARCH_INDEX) return;

  function renderResults(query) {
    const normalized = query.trim().toLowerCase();
    cards.forEach((card) => {
      if (!normalized) {
        card.hidden = false;
        return;
      }
      const haystack = [card.dataset.title || "", card.dataset.section || "", card.textContent || ""].join(" ").toLowerCase();
      card.hidden = !haystack.includes(normalized);
    });
    if (!results) return;
    if (normalized.length < 2) {
      results.innerHTML = "";
      return;
    }
    const matches = window.VAULT_SEARCH_INDEX
      .map((item) => ({
        item,
        haystack: [item.title, item.section, item.summary, item.rel, item.headings, item.searchText]
          .join(" ")
          .toLowerCase()
      }))
      .filter(({ haystack }) => haystack.includes(normalized))
      .slice(0, 8);
    const inNoteFolder = location.pathname.includes("/pages/");
    results.innerHTML = matches
      .map(({ item }) => {
        const href = inNoteFolder && item.href.startsWith("pages/") ? "../" + item.href : item.href;
        return '<a href="' + href + '"><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.section + ' · ' + item.rel) + '</small></a>';
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  input.addEventListener("input", () => renderResults(input.value));
})();