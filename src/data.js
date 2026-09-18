export const links = [
  {
    label: "Programa de mano",
    url: "/programa/",
    icon: "program",
    external: false,
  },
  {
    label: "Escríbenos por WhatsApp",
    url: "https://wa.me/5214443486857",
    icon: "whatsapp",
    external: true,
  },
  {
    label: "Síguenos en Facebook",
    url: "https://www.facebook.com/elmusicaldelamancha",
    icon: "facebook",
    external: true,
  },
  {
    label: "Síguenos en Instagram",
    url: "",
    icon: "instagram",
    external: true,
  },
];

const portrait = (name, image, position = "50% 35%") => ({ name, image, position });

export const cast = [
  { role: "Don Quijote", performers: [portrait("Alejandro Galindo Medina", "alejandro-galindo.webp", "50% 30%")] },
  { role: "Sancho", performers: [portrait("Diego Hinojosa", "diego-hinojosa.webp", "50% 31%")] },
  { role: "Capitán de la Inquisición", performers: [portrait("Oscar David López", "oscar-david-lopez.webp", "50% 31%")] },
  {
    role: "Aldonza",
    performers: [
      portrait("Tania Fernanda Arriaga", "tania-fernanda-arriaga.webp", "50% 32%"),
      portrait("Daniela Pérez Meza", "daniela-perez-meza.webp", "50% 27%"),
    ],
  },
  { role: "El Ventero", performers: [portrait("Enrique Galindo Vega", "enrique-galindo-vega.webp", "50% 25%")] },
  {
    role: "Doctor Carrasco",
    performers: [
      portrait("Andy Gutiérrez", "andy-gutierrez.webp", "50% 28%"),
      portrait("Mau Cortés Charo", "mau-cortes-charo.webp", "50% 30%"),
    ],
  },
  {
    role: "Padre",
    performers: [
      portrait("Juan Carlos Puente Orozco", "juan-carlos-puente-orozco.webp", "50% 25%"),
      portrait("Carlos Andrés Batres", "carlos-andres-batres.webp", "50% 21%"),
    ],
  },
  {
    role: "Antonia (sobrina)",
    performers: [
      portrait("Andrea Velásquez", "andrea-velasquez.webp", "50% 27%"),
      portrait("Alejandra Meza Cornejo", "alejandra-meza-cornejo.webp", "50% 25%"),
    ],
  },
  {
    role: "El Ama",
    performers: [
      portrait("Melissa Rocío González", "melissa-rocio-gonzalez.webp", "50% 27%"),
      portrait("Carolina Zacarías Martínez", "carolina-zacarias-martinez.webp", "50% 28%"),
    ],
  },
  { role: "Barbero", performers: [portrait("Juan Fernando Cárdenas", "juan-fernando-cardenas.webp", "50% 29%")] },
  { role: "Pedro (jefe de arrieros)", performers: [portrait("Ricardo Grimaldo", "ricardo-grimaldo.webp", "50% 25%")] },
  { role: "María (esposa del Ventero)", performers: [portrait("Lilia Mercedes Monsiváis", "lilia-mercedes-monsivais.webp", "50% 25%")] },
  {
    role: "Arrieros",
    performers: [
      portrait("Hernán Andrés Orozco", "hernan-andres-orozco.webp", "50% 25%"),
      portrait("Carlos Enrique Moha", "carlos-enrique-moha.webp", "50% 22%"),
      portrait("Juan Carlos Octavio Mendoza", "juan-carlos-octavio-mendoza.webp", "50% 24%"),
    ],
  },
  {
    role: "Coro",
    performers: [
      portrait("Cinthia Jiménez Aguilar", "cinthia-jimenez-aguilar.webp", "50% 22%"),
      portrait("Griselda Marina de la Cruz", "griselda-marina-de-la-cruz.webp", "50% 35%"),
    ],
  },
  {
    role: "Coro / Bailarinas",
    performers: [
      portrait("María del Rocío Ovalle", "maria-del-rocio-ovalle.webp", "50% 24%"),
      portrait("Carla Íngrid del Olmo", "carla-ingrid-del-olmo.webp", "50% 25%"),
      portrait("Jacqueline Ramos Gutiérrez", "jacqueline-ramos-gutierrez.webp", "50% 27%"),
      portrait("Ana Siller Alderete", "ana-siller-alderete.webp", "50% 25%"),
    ],
  },
];

export const director = {
  name: "José Arturo Castillo",
  image: "jose-arturo-castillo.webp",
  position: "50% 24%",
};

export const creativeTeam = [
  {
    role: "Diseño de vestuario",
    name: "Ana Siller Alderete",
    image: "ana-siller-alderete.webp",
    position: "50% 25%",
  },
  {
    role: "Escenografía",
    name: "Mario Castillo",
    image: "mario-castillo.webp",
    position: "50% 22%",
  },
  {
    role: "Diseño y elaboración de escenografía",
    name: "Raymundo Bear",
    image: "raymundo-bear.webp",
    position: "44% 50%",
  },
];
