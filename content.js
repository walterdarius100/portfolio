/* Modifiez les contenus ici. Ne renseignez que des informations vérifiées.
   Les URL doivent être HTTPS (ou HTTP pour une démonstration locale).
   photo : chemin local ou URL ; photoAlt : description de votre portrait.
   Les projets sans contenu restent des emplacements explicitement identifiés. */
window.portfolioContent = {
  name: "Votre nom",
  title: "Titre professionnel à compléter",
  intro:
    "Cet espace présentera ce que je fais, mon approche et la valeur que j’apporte à vos projets.",
  about:
    "Mon parcours, mes motivations et ma façon de travailler seront présentés ici.",
  outlook:
    "À compléter : les projets que je souhaite développer, mes objectifs et les collaborations que je recherche.",
  projectCount: null,
  productCount: null,
  photo: null,
  photoAlt: "",
  email: null,
  professionalLinks: [], // { label: 'GitHub', url: 'https://github.com/…' }
  services: [
    {
      icon: "mobile",
      title: "Applications mobiles",
      description:
        "Des usages quotidiens aux besoins métier : préciser ici les applications que je peux concevoir et les plateformes concernées.",
      confirmed: false,
    },
    {
      icon: "web",
      title: "Plateformes web",
      description:
        "Des interfaces pensées pour leurs utilisateurs : détailler ici mes services web et les besoins auxquels ils répondent.",
      confirmed: false,
    },
    {
      icon: "ai",
      title: "Intelligence artificielle",
      description:
        "Automatisation, assistance ou traitement de contenu : présenter ici uniquement les usages que j’ai déjà expérimentés.",
      confirmed: false,
    },
    {
      icon: "data",
      title: "Analyse de données",
      description:
        "Transformer des données en informations utiles : préciser ici mes méthodes, mes outils et mes cas d’usage réels.",
      confirmed: false,
    },
  ],
  projects: [
    {
      name: "Votre premier projet",
      image: null,
      imageAlt: "",
      problem: "",
      role: "",
      solution: "",
      technologies: [],
      status: null,
      demoUrl: null,
      sourceUrl: null,
    },
    {
      name: "Votre prochain produit",
      image: null,
      imageAlt: "",
      problem: "",
      role: "",
      solution: "",
      technologies: [],
      status: null,
      demoUrl: null,
      sourceUrl: null,
    },
  ],
  technologies: [
    { name: "PHP", icon: "php", confirmed: false },
    { name: "HTML", icon: "html", confirmed: false },
    { name: "CSS", icon: "css", confirmed: false },
  ],
  // Conservez cet ordre : expérience la plus récente en premier.
  experiences: [
    {
      role: "Poste ou rôle à compléter",
      organization: "Organisation à compléter",
      period: "Période à renseigner",
      missions: ["Décrivez vos principales missions et responsabilités."],
      achievements: [],
    },
  ],
};
