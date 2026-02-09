const content = {
  id: {
    subtitle: "Software Engineer | Lulusan SMK | Siap Kerja",
    aboutTitle: "Tentang Saya",
    aboutText:
      "Saya lulusan SMK Rekayasa Perangkat Lunak dengan minat besar di bidang software engineering. Terbiasa membuat aplikasi web dan siap berkembang secara profesional.",
    skillsTitle: "Keahlian",
    projectsTitle: "Proyek",
    project1: "<h3>Aplikasi Kasir</h3><p>Aplikasi web untuk transaksi dan manajemen stok.</p>",
    project2: "<h3>Website Portofolio</h3><p>Website pribadi modern dan responsif.</p>",
    contactTitle: "Kontak"
  },
  en: {
    subtitle: "Software Engineer | Vocational Graduate | Job Ready",
    aboutTitle: "About Me",
    aboutText:
      "I am a vocational high school graduate majoring in software engineering, experienced in building web applications and ready to grow professionally.",
    skillsTitle: "Skills",
    projectsTitle: "Projects",
    project1: "<h3>Cashier App</h3><p>Web application for sales and inventory.</p>",
    project2: "<h3>Portfolio Website</h3><p>Modern and responsive personal website.</p>",
    contactTitle: "Contact"
  },
  jv: {
    subtitle: "Software Engineer | Siyap Nyambut Gawe",
    aboutTitle: "Ngenani Kulo",
    aboutText:
      "Kulo lulusan SMK RPL, remen nggeluti bidang software engineering lan siyap makarya kanthi profesional.",
    skillsTitle: "Kaprigelan",
    projectsTitle: "Proyèk",
    project1: "<h3>Aplikasi Kasir</h3><p>Kangge transaksi lan stok barang.</p>",
    project2: "<h3>Website Portofolio</h3><p>Website pribadi modern.</p>",
    contactTitle: "Kontak"
  }
};

function setLang(lang) {
  const c = content[lang];
  document.getElementById("subtitle").innerText = c.subtitle;
  document.getElementById("about-title").innerText = c.aboutTitle;
  document.getElementById("about-text").innerText = c.aboutText;
  document.getElementById("skills-title").innerText = c.skillsTitle;
  document.getElementById("projects-title").innerText = c.projectsTitle;
  document.getElementById("project-1").innerHTML = c.project1;
  document.getElementById("project-2").innerHTML = c.project2;
  document.getElementById("contact-title").innerText = c.contactTitle;
}

setLang("id");

const form = document.getElementById("contact-form");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. Ambil data
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  // 2. Kirim ke backend
  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    // 3. Tampilkan hasil
    statusText.innerText = result.message;
    statusText.style.color = result.success ? "#4f7cff" : "red";

    if (result.success) form.reset();

  } catch (err) {
    statusText.innerText = "Server error";
    statusText.style.color = "red";
  }
});
