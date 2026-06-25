window.VAULT_DAILY_THESES = [
  {
    "label": "These",
    "text": "Digital Rooms sind weniger ein einzelnes Tool als eine neue Produktionssituation: Bild, Interface, Daten und Handlung fallen im selben Raum zusammen.",
    "source": "15_Promotion/Promotionsformel_Digital_Rooms.md",
    "sourceTitle": "Promotionsformel: Digital Rooms",
    "href": "pages/15-promotion--promotionsformel-digital-rooms.html"
  },
  {
    "label": "These",
    "text": "Public / Built Rooms werden erst als Forschungsfall stark, wenn ein konkretes Artefakt gewählt ist und sich Verantwortung, Zugang und Datenflüsse daran prüfen lassen.",
    "source": "15_Promotion/Public_Built_Room.md",
    "sourceTitle": "Public / Built Room (Fallcluster 3)",
    "href": "pages/15-promotion--public-built-room.html"
  },
  {
    "label": "These",
    "text": "Die zentrale Frage der KI-Postproduktion ist nicht, ob Modelle Arbeit ersetzen, sondern welche Entscheidungen in den Raum vor dem finalen Frame wandern.",
    "source": "02_Postproduktion_Workflows/Bedeutung_für_Postproduktion.md",
    "sourceTitle": "Bedeutung für Postproduktion",
    "href": "pages/02-postproduktion-workflows--bedeutung-fur-postproduktion.html"
  },
  {
    "label": "These",
    "text": "Ein AI-VFX-Workflow wird erst professionell, wenn er wiederholbar, nachweisbar und in bestehende Verantwortlichkeiten übersetzbar ist.",
    "source": "11_Best_Practices/Best_Practice_Workflows.md",
    "sourceTitle": "Best Practice Workflows",
    "href": "pages/11-best-practices--best-practice-workflows.html"
  },
  {
    "label": "These",
    "text": "Provenance ist keine nachträgliche Fußnote, sondern ein Gestaltungsparameter für glaubwürdige generative Bildproduktion.",
    "source": "05_Ethik_Recht_Provenance/Recht_Ethik_Provenance.md",
    "sourceTitle": "Recht, Ethik und Provenance",
    "href": "pages/05-ethik-recht-provenance--recht-ethik-provenance.html"
  },
  {
    "label": "These",
    "text": "Der Digital Image Space verschiebt Bildproduktion vom Bearbeiten einzelner Frames zum Navigieren, Kuratieren und Stabilisieren möglicher Szenen.",
    "source": "16_Digital_Image_Space/Digital_Image_Space_Index.md",
    "sourceTitle": "Digital Image Space und Digital Rooms",
    "href": "pages/16-digital-image-space--digital-image-space-index.html"
  },
  {
    "label": "These",
    "text": "Die Stärke generativer Video-Tools liegt nicht nur im Output, sondern in der neuen Arbeit am Prompt, an Referenzen, Seeds, Loops und Kontrollbildern.",
    "source": "01_Tools_und_Modelle/Tool_Landschaft_2026.md",
    "sourceTitle": "ToolLandschaft 2026",
    "href": "pages/01-tools-und-modelle--tool-landschaft-2026.html"
  },
  {
    "label": "These",
    "text": "Rotoscoping wird durch KI nicht banal, sondern wandert näher an Fragen von Segmentierung, Kontrolle, Qualitätssicherung und Verantwortung.",
    "source": "03_Rotoscoping_AI_VFX/Rotoscoping_und_AI_VFX.md",
    "sourceTitle": "Rotoscoping und AI VFX",
    "href": "pages/03-rotoscoping-ai-vfx--rotoscoping-und-ai-vfx.html"
  },
  {
    "label": "These",
    "text": "Studierende brauchen weniger Tool-Listen als Denkmodelle, mit denen sie neue Werkzeuge schnell einordnen und kritisch einsetzen können.",
    "source": "14_Positionierung_Studium/Strategie_für_Studierende_AI_VFX_Postproduktion.md",
    "sourceTitle": "Strategie für Studierende: Positionierung in AI VFX und Postproduktion",
    "href": "pages/14-positionierung-studium--strategie-fur-studierende-ai-vfx-postproduktion.html"
  },
  {
    "label": "These",
    "text": "Der Markt für AI-Postproduktion wird nicht durch ein Sieger-Tool entschieden, sondern durch anschlussfähige Pipelines zwischen Modellen, Studios und Rechtssystemen.",
    "source": "08_Marktkarte/Marktkarte_AI_Postproduktion.md",
    "sourceTitle": "Marktkarte AI Postproduktion",
    "href": "pages/08-marktkarte--marktkarte-ai-postproduktion.html"
  },
  {
    "label": "These",
    "text": "Forschung durch Gestaltung wird hier zur Methode, weil Digital Rooms erst sichtbar werden, wenn man sie baut, benutzt und scheitern lässt.",
    "source": "15_Promotion/Methodik_Research_through_Design.md",
    "sourceTitle": "Methodik: Research through Design",
    "href": "pages/15-promotion--methodik-research-through-design.html"
  },
  {
    "label": "These",
    "text": "Backlinks im Vault sind keine reine Navigation; sie zeigen, welche Begriffe argumentativ tragen und welche noch Evidenz brauchen.",
    "source": "review/Claim_Evidence_Matrix.md",
    "sourceTitle": "Claim Evidence Matrix",
    "href": "pages/review--claim-evidence-matrix.html"
  },
  {
    "label": "These",
    "text": "Vom Frame zur Szene heisst: Das Bild wird nicht mehr nur gerendert, sondern als verhandelbarer Raum aus Zeit, Perspektive, Prompt und Modellzustand organisiert.",
    "source": "16_Digital_Image_Space/Vom_Frame_zur_Szene.md",
    "sourceTitle": "Vom Frame zur Szene",
    "href": "pages/16-digital-image-space--vom-frame-zur-szene.html"
  }
];

(() => {
  const targets = [...document.querySelectorAll("[data-daily-thesis]")];
  const theses = window.VAULT_DAILY_THESES || [];
  if (!targets.length || !theses.length) return;

  const now = new Date();
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const thesis = theses[day % theses.length];
  const inNoteFolder = location.pathname.includes("/pages/");
  const href = thesis.href && inNoteFolder && thesis.href.startsWith("pages/") ? "../" + thesis.href : thesis.href;
  const source = href
    ? '<a href="' + href + '">' + escapeHtml(thesis.sourceTitle) + '</a>'
    : '<span>' + escapeHtml(thesis.sourceTitle || thesis.source) + '</span>';

  targets.forEach((target) => {
    target.innerHTML =
      '<p class="thesis-kicker">' + escapeHtml(thesis.label || "These") + '</p>' +
      '<blockquote>' + escapeHtml(thesis.text) + '</blockquote>' +
      '<p class="thesis-source">Quelle: ' + source + '</p>';
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }
})();