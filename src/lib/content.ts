import type { Locale } from "@/lib/i18n";

export type Photo = {
  /** Path under /public, e.g. "/photos/concerts/01.jpg". Omit to render a placeholder frame. */
  src?: string;
  width: number;
  height: number;
  alt: string;
  /** Text shown beside the photo in a "running" section. */
  caption?: string;
  /**
   * Serve the file exactly as it is instead of through Next's image optimizer, which
   * re-encodes it (or fails) — for deliberately corrupted JPEGs, where the bytes are the work.
   */
  unoptimized?: boolean;
};

export type Video = {
  /** Path under /public. H.264 MP4 with the index at the front (ffmpeg -movflags +faststart). */
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Accessible name. */
  title: string;
  /** Has a soundtrack: shown with controls and never autoplays. Silent clips loop on their own. */
  sound?: boolean;
};

export type ProjectSection = {
  /** Section heading, e.g. "Installation". Omit for the main body of work. */
  title?: string;
  /**
   * "grid" (default): the masonry grid. "running": the photos play in place as a looping
   * sequence, each caption beside its photo.
   */
  layout?: "grid" | "running";
  /** For "running": milliseconds per frame, and a description of the whole sequence. */
  interval?: number;
  label?: string;
  photos: Photo[];
  videos?: Video[];
};

export type ArtProject = {
  slug: string;
  title: string;
  /** Hebrew versions of the texts (the /he site). */
  he?: { title: string; description?: string; meta?: string };
  year?: string;
  meta?: string;
  description?: string;
  sections: ProjectSection[];
};

// Placeholder frames so the layout is visible before real images are added.
// Replace each with { src: "/photos/...", width, height, alt }.
const placeholders = (ratios: [number, number][], label: string): Photo[] =>
  ratios.map(([width, height], i) => ({ width, height, alt: `${label} ${i + 1}` }));

const mediumFormat: [number, number][] = [
  [6, 7], [1, 1], [6, 7], [7, 6], [1, 1], [6, 7], [1, 1], [7, 6],
];

// Pixel sizes of the web copies in public/photos/<folder>/01.jpg, 02.jpg, …
// (sRGB, max 2560px long edge). Full-resolution masters live in images/.
const photoSizes: Record<string, [number, number][]> = {
  "art/anti-potential/works": [
    [2560, 2048], [2048, 1638], [2048, 1638], [2048, 1638], [2048, 1638], [2560, 2047],
    [2048, 1365], [2560, 2047], [2048, 1638], [2560, 2047], [2560, 2047],
  ],
  "art/anti-potential/installation": Array(8).fill([2048, 1367]),
  "art/anti-potential/book": Array(7).fill([2048, 1365]),
  "art/sde-dov": [
    [2500, 2000], [2500, 2000], [2500, 2000], [2500, 2000], [2048, 2560],
    [2048, 2560], [2500, 2000], [2500, 2030], [2500, 2028], [2500, 2023],
  ],
  concerts: Array(18).fill([2048, 1367]),
  "art/foreign/sequence1": Array(3).fill([2560, 1644]),
  "art/foreign/sequence2/bridge": Array(30).fill([2048, 1367]),
  "art/foreign/sequence2/glacier": Array(30).fill([2048, 1367]),
  "art/foreign/images": [
    [2048, 1367], [2560, 1703], [2560, 1512], [2560, 1711], [2560, 1709], [2560, 1538],
  ],
  "art/city-of-the-dead": [
    [2500, 2052], [2500, 2022], [2500, 2089], [2500, 2062], [2500, 2018],
    [2500, 2015], [2085, 2560], [2043, 2560], [2500, 2045], [2186, 2560],
    [2500, 2052], [2500, 2006], [2500, 2000], [2500, 2034], [2097, 2560],
  ],
};

const photoSet = (folder: string, alts: string[]): Photo[] =>
  alts.map((alt, i) => {
    const [width, height] = photoSizes[folder][i];
    const n = String(i + 1).padStart(2, "0");
    return { src: `/photos/${folder}/${n}.jpg`, width, height, alt };
  });

export const artProjects: ArtProject[] = [
  {
    slug: "anti-potential",
    title: "Anti-Potential",
    he: {
      title: "אנטי־פוטנציאל",
      // From the book's colophon.
      description:
        "העבודות בספר זה צולמו במהלך 2025—2026 בין הוספיס בתל השומר, סביבת בית החולים שיבא, רמת גן, גבעתיים ואילת, בתי עלמין ושיטוט בסביבת הבית והשכונה. חיים, מחשבה והתבוננות בצל מחלה כרונית. תיעוד של מקומות המתעקשים לשמר יופי וחסד, והנכחה גופנית אישית בתוכם.",
      meta: "פרויקט גמר, המחלקה לצילום, בצלאל אקדמיה לאמנות ועיצוב, ירושלים. בהנחיית שרון יערי.",
    },
    year: "2026",
    meta: "Final project, Department of Photography, Bezalel Academy of Arts and Design. Supervised by Sharon Yaari.",
    description:
      "Photographed in 2025–2026 between the hospice at Tel HaShomer, the grounds of Sheba Medical Center, Ramat Gan, Givatayim and Eilat, cemeteries, and wanderings around home and the neighbourhood. Living, thinking and looking in the shadow of chronic illness — a record of places that insist on preserving beauty and grace, and of a personal, bodily presence within them.",
    sections: [
      {
        photos: photoSet("art/anti-potential/works", [
          "A man in a white shirt at a wooden lectern on artificial turf, in front of a stone memorial wall with flame reliefs",
          "A man lying face down across the top of a trimmed hedge in a dry garden",
          "A gathering beneath a flower-covered canopy in a garden, a patient in a hospital bed at its centre",
          "A man in white crouching among rows of golden barrel cacti",
          "A curved colonnade of pale stone with a row of taps along its base",
          "A man holding a wreath of pink flowers in front of a long wall of burial niches",
          "Women in head coverings and white coats seen from behind, looking through trees toward the water",
          "A shaded garden with potted plants, red geraniums and flowering bushes",
          "A woman in navy medical scrubs standing beside a flowering bush in a garden",
          "A photographic backdrop of palm trees set up on a lawn at dusk, a cat walking in front of it",
          "A man reclining in a white armchair among stacked stone slabs and greenery",
        ]),
      },
      {
        title: "Installation",
        photos: photoSet("art/anti-potential/installation", [
          "Gallery view: framed prints on a white wall, a large print beside a wall of artificial turf, and a park bench",
          "A park bench in front of a large print of the man at the lectern",
          "Gallery view: framed prints on white and artificial-turf walls, with a park bench",
          "Two framed prints, the colonnade and the wall of niches, hung on artificial turf",
          "Two framed garden photographs on a white wall",
          "The hedge photograph printed large behind glass",
          "Gallery view: a large cactus print and smaller framed prints",
          "View through glass toward a park bench and a print of the lectern",
        ]),
      },
      {
        title: "Book",
        photos: photoSet("art/anti-potential/book", [
          "Cover of the Anti-Potential book: grey cloth with a cut-out window showing a garden photograph",
          "The closed book, front cover",
          "Open spread: a car under a white cover and the same car uncovered",
          "Open spread: the colonnade printed across both pages",
          "Open spread: the palm-tree backdrop and a man standing among palm trees",
          "Open spread: the man with the wreath on the left page, a blank right page",
          "Open spread: a hedge seen through a translucent page",
        ]),
      },
    ],
  },
  {
    slug: "sde-dov",
    title: "Sde Dov",
    he: { title: "שדה דב" },
    sections: [
      {
        photos: photoSet("art/sde-dov", [
          "A figure holding a string toward the camera on a hazy mound of earth, a chimney behind",
          "Workers crossing a churned dirt field beside a long white tunnel structure, the sea beyond",
          "A damaged car with its hood raised and front wheel removed",
          "A palm tree with drooping dead fronds in front of a graffitied wall topped with razor wire",
          "The corner of a stacked concrete-block wall casting a hard shadow on gravel",
          "Close-up of a rough earth face against deep black shadow",
          "A tall mound of earth behind a white corrugated construction fence",
          "A fenced excavation pit holding water, a chimney in the haze",
          "Bent wire fencing and barbed wire around a striped concrete barrier in scrubland",
          "A leaning metal pole over a boulder and rubble in a weedy lot",
        ]),
      },
    ],
  },
  {
    slug: "city-of-the-dead",
    title: "City of the Dead",
    he: { title: "עיר המתים" },
    sections: [
      {
        photos: photoSet("art/city-of-the-dead", [
          "An ornate wrought-iron gate casting patterned shadows on a white cloth, forested hills beyond",
          "A long pale hall lined with columns and a red geometric lamp, rows of tombs at its end",
          "A white concrete pavilion with a bookshelf, beside a tall cypress against blue sky",
          "A hillside densely packed with pale stone tombs, seen from above",
          "Terraced stone tombs curving along a road, a wooded ridge and town behind",
          "A small white guard hut with a green tiled roof among stone tombs",
          "A heap of crushed silver memorial-candle cups",
          "A dim tunnel lit by a single fluorescent tube, a small sign on the dirt floor",
          "A tower crane over a construction site set into a pine forest",
          "Close-up of layered, cut stone with a dark vertical seam",
          "A white tent and makeshift structures with a satellite dish at the edge of a slope",
          "A steel memorial-candle box with a perforated Star of David on a stone wall",
          "A vast field of pale tombs with cypresses and a city on the hills behind",
          "A covered car parked behind a forked tree trunk on a sunlit street",
          "A single cypress tree against a blue sky with clouds",
        ]),
      },
    ],
  },
  {
    slug: "foreign",
    title: "Foreign",
    he: {
      title: "זר",
      description:
        "יובל החל לחקור את פורמט ה־JPEG ולשבש אותו באמצעות הקלדת טקסט לתוך קובצי התמונה בעורך הקסדצימלי.\n\nמאחר שפורמט התמונה בנוי מבלוקים, שיבוש התמונה בנקודה מסוימת גורם לעיתים קרובות לשורה שלמה להיעלם, לשנות צבע או לזוז ממקומה.\n\nבניסוי הראשון הזה, התמונות שובשו באמצעות הכנסת טקסט אקראי מהודעות דוא״ל לתוך הקבצים; הטקסטים מופיעים לצד התמונות שלהלן.",
    },
    description:
      "Yuval began exploring the JPEG format and corrupting it by typing text into his image files using a hex editor.\n\nSince the image format is structured in blocks, corrupting the image at a specific point often causes an entire row to disappear, change color, or shift position.\n\nFor this initial experiment, the images were corrupted by inserting random text from email messages into the files; these texts are included alongside the images below.",
    sections: [
      {
        // The first experiment. Each caption is the text actually typed into that file,
        // read back out of its bytes.
        layout: "running",
        interval: 1200,
        label: "A photograph of a room of slot machines, corrupted three ways: in salmon and dark red blocks, in teal and green bands, and in magenta outlines",
        photos: photoSet("art/foreign/sequence1", ["", "", ""]).map((photo, i) => ({
          ...photo,
          caption: [
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaand his soldiers, working their artillery, are transformed into 'black' men by their work. But do not focus on the literary techniques to distraction or you will miss the real art of the story, which first emerges with a soldier's hesitation. Featured in Civil War Stories",
            "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTThis is a story that is rife with deeper symbolism as a white officer and his soldiers, working their artillery, are transformed into 'black' men by their work. But do not focus on the literary techniques to distraction or you will miss the real art of the story, which first emerges with a soldier's hesitation. Featured in Civil War Stories",
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwith deeper symbolism as a white officer and his soldiers, working their artillery, are transformed into 'black' men by their work. But do not focus on the literary techniques to distraction or you will miss the real art of the story, which first emerges with a soldier's hesitation. Featured in Civil War Stories",
          ][i],
        })),
      },
      // Every 10th frame of two corruption runs (video7), each played as a short loop. The frames
      // are the corrupted files themselves, so they're served as they are.
      {
        layout: "running",
        interval: 200,
        label: "A photograph of a woman walking on a red bridge, breaking down frame by frame into pale pink",
        photos: photoSet("art/foreign/sequence2/bridge", Array(30).fill("")).map((photo) => ({
          ...photo,
          unoptimized: true,
        })),
      },
      {
        layout: "running",
        interval: 200,
        label: "A photograph of a figure on a beach of glacier ice, breaking down frame by frame into darkness and then icy blue",
        photos: photoSet("art/foreign/sequence2/glacier", Array(30).fill("")).map((photo) => ({
          ...photo,
          unoptimized: true,
        })),
      },
      {
        photos: photoSet("art/foreign/images", [
          "Two palm trees against blue sky above a building corrupted into dark red and cream blocks",
          "Palm trees and a blue building with a red car, colours partly inverted",
          "Golfers walking toward the sea past a windswept tree, the image subtly broken into blocks",
          "A glacier and icy lagoon with rows of shifted, smeared pixels",
          "Glass towers seen through a grid of windows, edges broken into jagged blocks",
          "Palm trees outlined in blue against a pale pink sky, as if traced",
        ]).map((photo, i) => (i === 0 ? { ...photo, unoptimized: true } : photo)),
      },
      {
        title: "Video",
        photos: [],
        videos: [
          {
            src: "/photos/art/foreign/video/move.mp4",
            poster: "/photos/art/foreign/video/move-poster.jpg",
            width: 1146,
            height: 1050,
            title: "Screen recording scrolling through folders of corrupted image files",
          },
          {
            src: "/photos/art/foreign/video/palms.mp4",
            poster: "/photos/art/foreign/video/palms-poster.jpg",
            width: 1280,
            height: 720,
            title: "Screen recording of corrupted images of buildings and palm trees opening and breaking apart",
            sound: true,
          },
        ],
      },
    ],
  },
];

export const getArtProject = (slug: string) =>
  artProjects.find((p) => p.slug === slug);

/**
 * A project's texts in the given language. The title falls back to English; an
 * untranslated statement is left out rather than shown in English on the Hebrew site.
 */
export const projectText = (project: ArtProject, lang: Locale) => {
  const he = lang === "he" ? project.he : undefined;
  return {
    title: he?.title ?? project.title,
    description: he ? he.description : project.description,
    meta: he ? he.meta : project.meta,
  };
};

export const concerts = {
  years: "2017–2019",
  photos: photoSet("concerts", [
    "A performer in a red and black outfit, arms raised, lit red and blue from the stage",
    "A saxophonist in a wide straw hat playing under red stage light",
    "A large crowd before a stage with two angular screens in green smoke",
    "A performer reaching up into yellow-green light and haze",
    "A guitarist in silhouette against blinding amber light",
    "A singer with arms spread wide as flame jets burst behind",
    "A singer in a hoodie beneath a row of yellow stage lights",
    "A bearded performer with palms pressed together in warm backlight",
    "A performer in camouflage on a stage of red and pink light beams",
    "A singer in a polka-dot jacket with a microphone, against pink and blue light",
    "Guitar effects pedals and a water bottle on a dark stage floor",
    "A singer with both arms raised toward the light, in black and white",
    "Raised hands of the crowd silhouetted against blue light, a performer among them",
    "A singer at a microphone in deep blue and magenta light",
    "A four-piece band standing apart in an angular concrete space",
    "A band leaning in a row against a white wall",
    "A four-piece band standing in front of white louvred doors",
    "A band posed on a rock by the sea",
  ]),
};

export const misc = {
  photos: placeholders(mediumFormat, "Misc"),
};

/** Site sections; labels come from the dictionary (src/lib/i18n.ts). */
export const navigation = [
  { href: "/art", key: "art" },
  { href: "/concerts", key: "concerts" },
  { href: "/misc", key: "misc" },
  { href: "/cv", key: "cv" },
] as const;
