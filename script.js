/* Interações do site — protótipo acadêmico. Configure os dados reais antes da publicação. */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");
  const modal = document.querySelector("#modal-aluno");
  const openModalButton = document.querySelector("#btn-aluno");
  const closeModalButton = document.querySelector("#fechar-modal");
  const loginForm = document.querySelector("#login-form");
  const loginFeedback = document.querySelector("#login-feedback");
  const contactForm = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-feedback");
  const whatsappLink = document.querySelector("#whatsapp-link");
  const toast = document.querySelector("#toast");
  let previousFocus = null;
  let toastTimer;

  // Atualiza o ano automaticamente.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu móvel acessível.
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.querySelector(".sr-only").textContent = isOpen ? "Fechar menu" : "Abrir menu";
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector(".sr-only").textContent = "Abrir menu";
      });
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
  }

  // Modal: abre, fecha com botão, clique fora ou tecla Escape.
  function openModal() {
    if (!modal) return;
    previousFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    loginFeedback.textContent = "";
    window.setTimeout(() => document.querySelector("#usuario")?.focus(), 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    previousFocus?.focus();
  }

  openModalButton?.addEventListener("click", openModal);
  closeModalButton?.addEventListener("click", closeModal);
  modal?.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
  });

  // Login intencionalmente demonstrativo: não há autenticação real no front-end.
  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    loginFeedback.textContent = "Desculpe estamos fazendo ajustes em nosso site, volte em algumas horas";
    loginForm.reset();
  });

  // Formulário demonstrativo: não transmite nem armazena dados pessoais.
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = contactForm.elements.nome.value.trim();
    const interest = contactForm.elements.interesse.value;
    formFeedback.textContent = `Obrigado, ${name}! Sua solicitação foi enviada (${interest}). Aguarde o nosso retorno em breve.`;
    contactForm.reset();
  });

  // Configure com o DDI + DDD + número, apenas dígitos, ex.: 5511999999999.
  // Deixe vazio até confirmar o número oficial da escola.
  const WHATSAPP_NUMBER = "";
  if (whatsappLink) {
    if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      const message = encodeURIComponent("Olá! Gostaria de obter informações sobre a escola.");
      whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      whatsappLink.target = "_blank";
      whatsappLink.rel = "noopener noreferrer";
      whatsappLink.title = "Conversar com a escola pelo WhatsApp";
    } else {
      whatsappLink.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Para ativar o WhatsApp, configure o número oficial em script.js.");
      });
    }
  }

  // Lightbox para galeria de imagens
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxDescription = document.querySelector("#lightbox-description");
  const lightboxBackdrop = document.querySelector("#lightbox-backdrop");
  const lightboxClose = document.querySelector("#lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(src, caption, description) {
    if (!lightbox) return;
    lightboxImage.src = src;
    lightboxTitle.textContent = caption;
    lightboxDescription.textContent = description;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lightboxImage.src = "";
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.src;
      const caption = item.dataset.caption || "";
      const description = item.dataset.description || "";
      openLightbox(src, caption, description);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxBackdrop?.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("is-open")) closeLightbox();
  });
});