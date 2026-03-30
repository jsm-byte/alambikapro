import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Globe, Package, Wine, UtensilsCrossed, Sparkles, Star, Phone, Mail, MapPin, ExternalLink, ArrowUpRight, UserPlus, Building2, ChevronRight, Droplets, Cherry, GlassWater, Scissors, Leaf, Flame, Search } from "lucide-react";

/* ═══════════════════ DESIGN TOKENS ═══════════════════ */
const C = { dark: "#1D1D1D", mid: "#666", light: "#999", border: "#E5E5E5", bg: "#F7F7F7", white: "#FFF", accent: "#B8860B" };
const font = "'DM Sans', sans-serif";
const fb = "'Archivo', sans-serif";

/* ═══════════════════ PRODUCT CATEGORIES ═══════════════════ */
const CATS = {
  en: {
    all: "All", bitters: "Bitters", syrups: "Syrups & Acid", garnishes: "Garnishes",
    barware: "Barware & Glassware", na: "Non-Alcoholic", other: "Other"
  },
  fr: {
    all: "Toutes", bitters: "Amers", syrups: "Sirops & Acides", garnishes: "Garnitures",
    barware: "Barware & Verrerie", na: "Sans alcool", other: "Autre"
  }
};

/* ═══════════════════ BRAND LOGOS ═══════════════════ */
const LOGOS = {
  "Ms Better's Bitters": "MSB",
  "Addition": "ADD",
  "All the Bitter": "ATB",
  "Bennett Bitters": "BB",
  "Bittercube": "BC",
  "Hella Cocktail Co.": "HCC",
  "Honest John Bitters": "HJB",
  "Miracle Mile": "MM",
  "The Japanese Bitters": "TJB",
  "Maleza": "MLZ",
  "Angostura": "ANG",
  "Amargo Chuncho": "AC",
  "The Bitter Truth": "TBT",
  "Peychaud": "PYC",
  "Regan": "R·6",
  "Prosyro": "PRO",
  "Immature": "IMM",
  "Cuvée Roger": "CR",
  "Jack Rudy": "JR",
  "Tomr's Tonic": "TT",
  "3/4 OZ.": "3/4",
  "Yakami Orchard": "YO",
  "Colonel Pabst": "CP",
  "Opaline": "OPL",
  "Essentia": "ESS",
  "Filthy Food": "FF",
  "Luxardo": "LUX",
  "Spherika": "SPH",
  "Alka": "ALK",
  "Lehmann Glass": "LG",
  "HP Juniper": "HPJ",
  "Projet Pilote": "PP",
  "Fin Soda": "FIN",
  "Gruvi": "GRV",
  "NOA": "NOA",
  "Shape": "SHP",
  "Statera": "STR",
  "Jesemi's Collection": "JSM",
  "Sipping Scents": "SS",
};

/* ═══════════════════ BRAND DATA ═══════════════════ */
const brands = [
  // BITTERS
  { name: "Ms Better's Bitters", pcat: "bitters", country: "CA", top: true, house: false, tagline: "Premium bitters, syrups, and the world's first vegan botanical foamer.", url: "https://www.msbetters.com",
    seo: { en: "Ms Better's Bitters is a Montreal-based craft bitters company offering an extensive range of cocktail bitters and the world's first vegan botanical foamer. As their exclusive Canadian distributor, Alambika PRO provides wholesale pricing on the full Ms Better's lineup for bars, restaurants, and hotels across Canada.", fr: "Ms Better's Bitters est une entreprise montréalaise de bitters artisanaux offrant une gamme complète d'amers à cocktail et le premier mousseur botanique végane au monde. En tant que distributeur exclusif canadien, Alambika PRO offre des prix de gros sur toute la gamme Ms Better's pour les bars, restaurants et hôtels à travers le Canada." } },
  { name: "Addition", pcat: "bitters", country: "US", house: false, tagline: "Handcrafted cocktail spices from Seattle using traditional maceration.", url: "https://www.drinkaddition.com",
    seo: { en: "Addition bitters are handcrafted in Seattle using traditional maceration techniques. Alambika PRO is the exclusive Canadian distributor — order wholesale for your bar or restaurant.", fr: "Les bitters Addition sont fabriqués artisanalement à Seattle par macération traditionnelle. Alambika PRO est le distributeur exclusif canadien — commandez en gros pour votre bar ou restaurant." } },
  { name: "All the Bitter", pcat: "bitters", country: "US", house: false, tagline: "Small-batch non-alcoholic bitters handmade with whole organic plants.", url: "https://allthebitter.com",
    seo: { en: "All the Bitter produces small-batch, non-alcoholic bitters made with organic whole plants. Perfect for zero-proof cocktail programs. Available wholesale in Canada through Alambika PRO.", fr: "All the Bitter produit des amers sans alcool en petits lots à partir de plantes biologiques entières. Parfait pour les programmes de cocktails sans alcool. Disponible en gros au Canada via Alambika PRO." } },
  { name: "Bennett Bitters", pcat: "bitters", country: "US", house: false, tagline: "Organic, hand-crafted bitters inspired by the fragrant fields of Provence.", url: "https://bennettbitters.com",
    seo: { en: "Bennett Bitters are organic, hand-crafted cocktail bitters inspired by Provence. Available for wholesale purchase in Canada exclusively through Alambika PRO.", fr: "Bennett Bitters sont des amers biologiques artisanaux inspirés de la Provence. Disponibles en gros au Canada exclusivement via Alambika PRO." } },
  { name: "Bittercube", pcat: "bitters", country: "US", house: false, tagline: "Making drinks come true since 2009 — slow-crafted, artisanal bitters.", url: "https://bittercube.com",
    seo: { en: "Bittercube has been crafting artisanal bitters in Milwaukee since 2009. Buy Bittercube wholesale in Canada through Alambika PRO, your national cocktail distributor.", fr: "Bittercube fabrique des amers artisanaux à Milwaukee depuis 2009. Achetez Bittercube en gros au Canada via Alambika PRO, votre distributeur national de cocktails." } },
  { name: "Hella Cocktail Co.", pcat: "bitters", country: "US", house: false, tagline: "Premium cocktails crafted with integrity, rooted in discovery.", url: "https://hellacocktail.co",
    seo: { en: "Hella Cocktail Co. crafts premium bitters and cocktail mixers with integrity. Wholesale orders available across Canada through Alambika PRO.", fr: "Hella Cocktail Co. crée des amers et mélangeurs premium avec intégrité. Commandes en gros disponibles partout au Canada via Alambika PRO." } },
  { name: "Honest John Bitters", pcat: "bitters", country: "US", house: false, tagline: "Organic, glycerin-free bitters with mountain-sourced botanicals.", url: "https://www.honestjohnbitters.com",
    seo: { en: "Honest John Bitters are organic, glycerin-free bitters sourced from mountain botanicals. Available wholesale in Canada through Alambika PRO.", fr: "Honest John Bitters sont des amers biologiques sans glycérine à base de plantes de montagne. Disponibles en gros au Canada via Alambika PRO." } },
  { name: "Miracle Mile", pcat: "bitters", country: "US", house: false, tagline: "Small batch, handcrafted bitters leading the West Coast revolution.",
    seo: { en: "Miracle Mile Bitters leads the West Coast craft bitters movement. Order wholesale in Canada from Alambika PRO.", fr: "Miracle Mile Bitters mène la révolution des amers artisanaux de la côte ouest. Commandez en gros au Canada chez Alambika PRO." } },
  { name: "The Japanese Bitters", pcat: "bitters", country: "JP", house: false, tagline: "The world's first domestically produced aromatic bitters from Japan.", url: "https://japanese-cocktail-creation.com",
    seo: { en: "The Japanese Bitters are the first aromatic bitters produced in Japan. Exclusively distributed in Canada by Alambika PRO for bars and restaurants.", fr: "The Japanese Bitters sont les premiers amers aromatiques produits au Japon. Distribués exclusivement au Canada par Alambika PRO." } },
  { name: "Maleza", pcat: "bitters", country: "MX", house: false, tagline: "Specialty bitters from Mexico's wild botanicals and herbalist traditions.",
    seo: { en: "Maleza brings Mexico's wild botanical traditions to craft cocktails. Buy Maleza bitters and syrups wholesale in Canada through Alambika PRO.", fr: "Maleza apporte les traditions botaniques sauvages du Mexique aux cocktails. Achetez Maleza en gros au Canada via Alambika PRO." } },
  { name: "Angostura", pcat: "bitters", country: "TT", house: false, tagline: "The world-renowned aromatic bitters with nearly 200 years of history.", url: "https://angostura.com",
    seo: { en: "Angostura aromatic bitters — the bar essential since 1824. Wholesale pricing for Canadian professionals through Alambika PRO.", fr: "Amers aromatiques Angostura — l'essentiel du bar depuis 1824. Prix de gros pour professionnels canadiens via Alambika PRO." } },
  { name: "Amargo Chuncho", pcat: "bitters", country: "PE", house: false, tagline: "Traditional Peruvian bitters essential to an authentic Pisco Sour.", url: "https://amargochuncho.com",
    seo: { en: "Amargo Chuncho is the authentic Peruvian bitters essential for a true Pisco Sour. Distributed in Canada by Alambika PRO.", fr: "Amargo Chuncho est l'amer péruvien authentique essentiel au vrai Pisco Sour. Distribué au Canada par Alambika PRO." } },
  { name: "The Bitter Truth", pcat: "bitters", country: "DE", house: false, tagline: "Award-winning bitters, flower waters & bar essentials for cocktails — crafted in Munich since 2006.", url: "https://the-bitter-truth.com",
    seo: { en: "The Bitter Truth is an award-winning German bitters brand founded in Munich in 2006 by bartenders Stephan Berg and Alexander Hauck. Their extensive range includes aromatic, orange, celery, and chocolate bitters. Wholesale in Canada through Alambika PRO.", fr: "The Bitter Truth est une marque allemande d'amers primée, fondée à Munich en 2006 par les barmans Stephan Berg et Alexander Hauck. Leur gamme comprend des amers aromatiques, orange, céleri et chocolat. En gros au Canada via Alambika PRO." } },
  { name: "Peychaud", pcat: "bitters", country: "US", house: false, tagline: "Gentian-based bitters essential to the Sazerac, from New Orleans.",
    seo: { en: "Peychaud's Bitters — the essential ingredient for a Sazerac. Available at wholesale prices in Canada through Alambika PRO.", fr: "Peychaud's Bitters — l'ingrédient essentiel du Sazerac. Disponible à prix de gros au Canada via Alambika PRO." } },
  { name: "Regan", pcat: "bitters", country: "US", house: false, tagline: "Orange bitters by legendary bartender Gary Regan.",
    seo: { en: "Regan's Orange Bitters No. 6, created by the legendary Gary Regan. Wholesale available in Canada through Alambika PRO.", fr: "Regan's Orange Bitters No. 6, créé par le légendaire Gary Regan. Disponible en gros au Canada via Alambika PRO." } },

  // SYRUPS & ACID
  { name: "Prosyro", pcat: "syrups", country: "CA", house: false, top: true, tagline: "Craft syrups for the power user — quality at prices that make you hate doing it yourself.", url: "https://prosyro.com",
    seo: { en: "Prosyro makes craft cocktail syrups in Montreal for professionals who demand the best. Over 65 SKUs available wholesale in Canada through Alambika PRO — your exclusive source for Prosyro.", fr: "Prosyro fabrique des sirops à cocktails artisanaux à Montréal pour les professionnels exigeants. Plus de 65 produits disponibles en gros au Canada via Alambika PRO — votre source exclusive pour Prosyro." } },
  { name: "Immature", pcat: "syrups", country: "CA", house: true, top: true, tagline: "Local natural verjus from hybrid grapes bred for Canadian climate.", url: "https://alambika.ca",
    seo: { en: "Immature verjus is a house-made natural acid alternative crafted from Quebec hybrid grapes. A fresh, local substitute for lemon and lime in cocktails. Wholesale from Alambika PRO.", fr: "Le verjus Immature est un acide naturel maison fait de raisins hybrides québécois. Une alternative fraîche et locale au citron dans les cocktails. En gros chez Alambika PRO." } },
  { name: "Cuvée Roger", pcat: "syrups", country: "CA", house: false, tagline: "Premium maple syrup harvested at its sweetest point.",
    seo: { en: "Cuvée Roger premium maple syrup — harvested at its sweetest point for perfect cocktails. Exclusive Canadian wholesale through Alambika PRO.", fr: "Sirop d'érable premium Cuvée Roger — récolté à son point le plus sucré. En gros exclusivement via Alambika PRO." } },
  { name: "Jack Rudy", pcat: "syrups", country: "US", house: false, tagline: "Quality bar goods formulated in small batches, distributed globally.", url: "https://jackrudycocktailco.com",
    seo: { en: "Jack Rudy Cocktail Co. produces tonic syrups, bitters, and cocktail cherries in small batches. Wholesale in Canada through Alambika PRO.", fr: "Jack Rudy Cocktail Co. produit sirops toniques, amers et cerises à cocktail en petits lots. En gros au Canada via Alambika PRO." } },
  { name: "Tomr's Tonic", pcat: "syrups", country: "US", house: false, tagline: "The original crafted organic tonic syrup from cinchona bark.", url: "https://tomrstonic.com",
    seo: { en: "Tomr's Tonic is the original craft tonic syrup made from organic cinchona bark. Wholesale in Canada exclusively through Alambika PRO.", fr: "Tomr's Tonic est le sirop tonique artisanal original fait d'écorce de quinquina biologique. En gros au Canada exclusivement via Alambika PRO." } },
  { name: "3/4 OZ.", pcat: "syrups", country: "CA", house: false, tagline: "Delicate syrups crafted in small batches in Montreal.", url: "https://34oztonicmaison.com",
    seo: { en: "3/4 OZ. crafts delicate cocktail syrups in small batches in Montreal. Wholesale available in Canada through Alambika PRO.", fr: "3/4 OZ. fabrique des sirops à cocktails délicats en petits lots à Montréal. Disponible en gros au Canada via Alambika PRO." } },
  { name: "Yakami Orchard", pcat: "syrups", country: "JP", house: false, tagline: "Family citrus growers in Miyazaki — world-class yuzu, sudachi, kabosu.",
    seo: { en: "Yakami Orchard is a family citrus farm in Miyazaki, Japan, producing world-class yuzu, sudachi, and kabosu juices. Wholesale in Canada through Alambika PRO.", fr: "Yakami Orchard est un verger familial à Miyazaki, Japon, produisant yuzu, sudachi et kabosu de classe mondiale. En gros au Canada via Alambika PRO." } },
  { name: "Colonel Pabst", pcat: "syrups", country: "US", house: false, tagline: "Small batch Worcestershire made in Milwaukee with amber lager.", url: "https://colonelpabst.com",
    seo: { en: "Colonel Pabst crafts small-batch Worcestershire sauce in Milwaukee with amber lager. Wholesale in Canada through Alambika PRO.", fr: "Colonel Pabst fabrique une sauce Worcestershire en petits lots à Milwaukee. En gros au Canada via Alambika PRO." } },

  // GARNISHES
  { name: "Opaline", pcat: "garnishes", country: "CA", house: true, top: true, tagline: "Edible cocktail shimmer for dazzling, pearlescent drinks.", url: "https://alambika.ca",
    seo: { en: "Opaline is Alambika's house brand of edible cocktail shimmer, creating dazzling pearlescent effects in drinks. 80-100 cocktails per bottle. Wholesale from Alambika PRO.", fr: "Opaline est la marque maison d'Alambika de miroitement comestible pour cocktails, créant des effets nacrés éblouissants. 80-100 cocktails par bouteille. En gros chez Alambika PRO." } },
  { name: "Essentia", pcat: "garnishes", country: "IT", house: false, top: true, tagline: "What better garnish than an emotion? Essential oil sprays for cocktails.", url: "https://santa-bianca.it",
    seo: { en: "Essentia creates essential oil spray garnishes for cocktails — aromatic finishing touches from Italy. Exclusively distributed in Canada by Alambika PRO.", fr: "Essentia crée des garnitures en spray d'huiles essentielles pour cocktails — touches aromatiques finales d'Italie. Distribué exclusivement au Canada par Alambika PRO." } },
  { name: "Filthy Food", pcat: "garnishes", country: "US", house: false, tagline: "For the detail obsessed & the pleasure committed — premium garnishes.", url: "https://filthyfood.com",
    seo: { en: "Filthy Food produces premium cocktail garnishes — olives, cherries, onions, and more. Exclusive wholesale in Canada through Alambika PRO.", fr: "Filthy Food produit des garnitures à cocktails premium — olives, cerises, oignons et plus. En gros exclusivement au Canada via Alambika PRO." } },
  { name: "Luxardo", pcat: "garnishes", country: "IT", house: false, tagline: "Italian maraschino cherries and premium bar ingredients since 1821.", url: "https://www.luxardo.it",
    seo: { en: "Luxardo — Italian maraschino cherries, and premium ingredients since 1821. Buy Luxardo wholesale in Canada through Alambika PRO.", fr: "Luxardo — cerises marasquin italiennes, et ingrédients premium depuis 1821. Achetez Luxardo en gros au Canada via Alambika PRO." } },
  { name: "Spherika", pcat: "garnishes", country: "ES", house: false, tagline: "Flavored spheres that explode in your mouth — natural and refreshing.", url: "https://caviarspherika.com",
    seo: { en: "Spherika creates flavored cocktail spheres that burst in your mouth — a natural, refreshing garnish from Spain. Wholesale in Canada through Alambika PRO.", fr: "Spherika crée des sphères aromatisées qui éclatent en bouche — une garniture naturelle et rafraîchissante d'Espagne. En gros au Canada via Alambika PRO." } },

  // BARWARE
  { name: "Alka", pcat: "barware", country: "CA", house: true, top: true, tagline: "Professional barware designed by bartenders, for bartenders.", url: "https://alambika.ca",
    seo: { en: "Alka is Alambika's premium barware line designed by bartenders for bartenders. Weighted Boston shakers, jiggers, and tools built for nightly professional use. Wholesale from Alambika PRO.", fr: "Alka est la gamme premium de barware d'Alambika conçue par des barmans pour des barmans. Shakers Boston lestés, jiggers et outils pour usage professionnel quotidien. En gros chez Alambika PRO." } },

  { name: "Lehmann Glass", pcat: "barware", country: "FR", house: false, top: true, tagline: "Glassmaking know-how meets wine expertise — elegant curves for every tasting.", url: "https://www.lehmann-sa.com",
    seo: { en: "Lehmann Glass combines French glassmaking expertise with wine knowledge. Trusted by Michelin-starred sommeliers. Exclusive wholesale distributor in Canada: Alambika PRO.", fr: "Lehmann Glass allie le savoir-faire verrier français à l'expertise vinicole. Choisi par les sommeliers étoilés Michelin. Distributeur exclusif en gros au Canada : Alambika PRO." } },

  // NON-ALCOHOLIC
  { name: "HP Juniper", pcat: "na", country: "CA", house: false, tagline: "Alcohol-free, sugar-free distilled spirit from Quebec.", url: "https://hpjuniper.com",
    seo: { en: "HP Juniper is a Quebec-made alcohol-free, sugar-free distilled spirit alternative. Wholesale in Canada exclusively through Alambika PRO.", fr: "HP Juniper est un spiritueux distillé sans alcool et sans sucre fait au Québec. En gros au Canada exclusivement via Alambika PRO." } },
  { name: "Projet Pilote", pcat: "na", country: "CA", house: false, tagline: "Montreal distillery producing botanical hydrosols from fresh botanicals.",
    seo: { en: "Projet Pilote is a Montreal distillery crafting non-alcoholic botanical hydrosols. Available wholesale across Canada through Alambika PRO.", fr: "Projet Pilote est une distillerie montréalaise créant des hydrosols botaniques sans alcool. En gros partout au Canada via Alambika PRO." } },
  { name: "Fin Soda", pcat: "na", country: "CA", house: false, tagline: "Non-alcoholic drinks created by real working bartenders.", url: "https://finsoda.com",
    seo: { en: "Fin Soda makes non-alcoholic drinks designed by real bartenders. Distributed across Canada by Alambika PRO.", fr: "Fin Soda fabrique des boissons sans alcool conçues par de vrais barmans. Distribué au Canada par Alambika PRO." } },
  { name: "Gruvi", pcat: "na", country: "CA", house: false, tagline: "Award-winning craft non-alcoholic beer and wine.", url: "https://www.getgruvi.com",
    seo: { en: "Gruvi produces award-winning non-alcoholic craft beer and wine. Wholesale for Canadian bars and restaurants through Alambika PRO.", fr: "Gruvi produit des bières et vins sans alcool artisanaux primés. En gros pour bars et restaurants canadiens via Alambika PRO." } },
  { name: "NOA", pcat: "na", country: "CA", house: false, tagline: "Hand-crafted non-alcoholic spirit alternatives, no added sugar.", url: "https://www.drink-noa.com",
    seo: { en: "NOA crafts hand-made non-alcoholic spirit alternatives with no added sugar. Wholesale in Canada through Alambika PRO.", fr: "NOA fabrique des alternatives aux spiritueux sans alcool et sans sucre ajouté. En gros au Canada via Alambika PRO." } },
  { name: "Shape", pcat: "na", country: "CA", house: false, tagline: "Zero-proof spirit alternatives crafted in Quebec.", url: "https://breuvagesshape.com",
    seo: { en: "Shape makes zero-proof spirit alternatives crafted in Quebec. Wholesale distribution across Canada through Alambika PRO.", fr: "Shape fabrique des alternatives aux spiritueux sans alcool au Québec. Distribution en gros au Canada via Alambika PRO." } },
  { name: "Statera", pcat: "na", country: "CA", house: false, tagline: "Canada's first electrolyte-infused non-alcoholic gin.", url: "https://stateraspirits.com",
    seo: { en: "Statera is Canada's first electrolyte-infused non-alcoholic gin. Wholesale available through Alambika PRO.", fr: "Statera est le premier gin sans alcool infusé aux électrolytes au Canada. En gros via Alambika PRO." } },

  // OTHER
  { name: "Jesemi's Collection", pcat: "other", country: "CA", house: true, tagline: "Distributing the finest artisanal cocktail ingredients since 2012.", url: "https://jesemi.com",
    seo: { en: "Jesemi's Collection curates and distributes the finest artisanal cocktail products. Wholesale available through Alambika PRO.", fr: "La Collection Jesemi sélectionne et distribue les meilleurs produits artisanaux de cocktails. En gros via Alambika PRO." } },
  { name: "Sipping Scents", pcat: "other", country: "CA", house: false, tagline: "Thoughtfully crafted candles to bring calm into any space.",
    seo: { en: "Sipping Scents creates thoughtfully crafted candles inspired by cocktail culture. Exclusively distributed in Canada by Alambika PRO.", fr: "Sipping Scents crée des chandelles artisanales inspirées de la culture cocktail. Distribué exclusivement au Canada par Alambika PRO." } },
];

const clients = ["Château Frontenac", "Ritz-Carlton Montréal", "Four Seasons Vancouver", "Fairmont Le Château Montebello", "Bar George", "Atwater Cocktail Club", "Le Bremner", "Coldroom", "Cloakroom Bar"];

/* ═══════════════════ i18n (compact) ═══════════════════ */
const T = {
  en: {
    nav: { brands: "Brands", services: "Services", portal: "Order", contact: "Contact", account: "Open Account" },
    hero: { tag: "National Distributor · B2B · Wholesale to Bars & Restaurants", h1: "Your Professional\nPartner in\nCocktail Culture", sub: "Wholesale to bars and restaurants — premium barware, craft ingredients & glassware from 50+ curated brands by Alambika PRO.", cta: "Access B2B Portal", cta2: "Explore Brands" },
    retailNote: { text: "Retailer looking to carry our brands?", link: "Contact Jesemi Distribution", url: "https://www.jesemi.com" },
    consultBanner: { title: "Need help building your menu?", text: "Developing a menu, want to sample products but you're far from our showroom? Book a Zoom meeting with one of our expert consultants to figure out exactly what you need.", cta: "Contact Us" },
    stats: [{ n: "50+", l: "Active Brands" }, { n: "15+", l: "Countries" }, { n: "1000+", l: "Professional Clients" }, { n: "15+", l: "Years of Expertise" }],
    brands: { title: "Our Brands", sub: "National distributor of the finest cocktail brands — filterable by product category.", distTag: "National Distributor", top: "Top", house: "House Brand", since: "Partner since", viewAll: "View all brands", orderCta: "Order this brand", backToBrands: "Back to all brands", seoTitle: "wholesale in Canada", products: "Products", origin: "Origin", website: "Official website" },
    services: { title: "PRO Services", sub: "Tailored solutions for the hospitality industry's most demanding professionals.", items: [
      { id: "products", t: "Our Products", d: "Premium cocktail ingredients, barware, and glassware from 50+ curated brands worldwide.", label: "Products" },
      { id: "custom-glassware", t: "Custom Glassware & Decor", d: "Branded glassware and decor for your establishment. From etching to full custom designs.", label: "Verrerie" },
      { id: "custom-barware", t: "Custom Barware", d: "Bespoke bar tools crafted to your specifications. Elevate your bar's identity.", label: "Barware" },
      { id: "rental", t: "Rental Services", d: "Premium glassware and barware rental for events, pop-ups, and special occasions.", label: "Location" },
      { id: "custom-syrups", t: "Custom Syrups & Cocktails", d: "Signature cocktail development and custom Prosyro formulations for your menu.", label: "Sirops" },
      { id: "events", t: "Special Events", d: "Full-service cocktail catering and event support for private parties, corporate events, and launches.", label: "Events" },
      { id: "photo", t: "Photography Service", d: "Professional cocktail and bar photography for your menus, social media, and marketing materials.", label: "Photo" },
      { id: "consulting", t: "Consulting & Expertise", d: "Bar program development, menu engineering, and operational consulting for hospitality professionals.", label: "Consulting" },
      { id: "retailer", t: "Becoming a Retailer", d: "Interested in carrying our brands in your retail store? Contact our retail distribution partner Jesemi Distribution at jesemi.com.", label: "Retail" },
      { id: "gifts", t: "Corporate Gifts", d: "Curated cocktail gift sets and branded packages for corporate gifting and employee appreciation.", label: "Gifts" },
      { id: "menu", t: "Menu Creation", d: "Complete cocktail menu design and development tailored to your concept and clientele.", label: "Menu" },
      { id: "picks", t: "Custom Cocktail Picks", d: "Personalized bamboo cocktail picks laser-engraved with your logo. Perfect for signature drinks and branding.", label: "Picks", hasDetail: true },
      { id: "coasters", t: "Custom Silicone Coasters", d: "Premium silicone coasters custom-molded with your logo or design. Durable, elegant, and dishwasher safe.", label: "Coasters", hasDetail: true },
      { id: "cloths", t: "Microfiber Polishing Cloths", d: "Professional-grade microfiber cloths for streak-free glass polishing. A bar essential, available in bulk.", label: "Cloths", hasDetail: true }
    ]},
    trusted: { title: "Trusted By" },
    portal: { title: "Ready to Order?", sub: "Access our full B2B catalog, check availability, and place orders through our professional portal.", cta: "Go to B2B Portal", note: "Need an account? Open one below." },
    account: { title: "Open a PRO Account", sub: "Apply for wholesale pricing and B2B portal access. We serve bars, restaurants, hotels, and retailers across Canada.", f: { biz: "Business Name", name: "Contact Name", email: "Email", phone: "Phone", type: "Business Type", ph: "Select...", types: ["Bar / Cocktail Bar", "Restaurant", "Hotel", "Retailer / Shop", "Event Company", "Other"], city: "City / Province", liquor: "Liquor Permit #", msg: "Tell us about your business", send: "Submit Application" }, note: "We'll review your application within 48 hours.", benefits: ["Wholesale pricing on all brands", "Direct B2B portal access", "Custom product requests", "Dedicated account manager"] },
    contact: { title: "Get in Touch", sub: "Partnership inquiries, custom orders, or any questions.", addr: "6484 Saint-Laurent Blvd, Montreal, QC", f: { name: "Name", email: "Email", msg: "Message", send: "Send Message" } },
    footer: { tag: "Wholesale to bars and restaurants since 2012.", rights: "All rights reserved.", retail: "Retailers: contact Jesemi Distribution — jesemi.com" },
    langSwitch: "FR"
  },
  fr: {
    nav: { brands: "Marques", services: "Services", portal: "Commander", contact: "Contact", account: "Ouvrir un compte" },
    hero: { tag: "Distributeur national · B2B · Vente en gros aux bars et restaurants", h1: "Votre Partenaire\nProfessionnel en\nCulture Cocktail", sub: "Vente en gros aux bars et restaurants — barware premium, ingrédients artisanaux et verrerie de plus de 50 marques sélectionnées par Alambika PRO.", cta: "Accéder au portail B2B", cta2: "Découvrir les marques" },
    retailNote: { text: "Détaillant intéressé à offrir nos marques?", link: "Contactez Jesemi Distribution", url: "https://www.jesemi.com" },
    consultBanner: { title: "Besoin d'aide pour créer votre menu?", text: "Vous développez un menu, souhaitez goûter nos produits mais êtes loin de notre showroom? Réservez un appel Zoom avec l'un de nos consultants experts pour déterminer exactement vos besoins.", cta: "Contactez-nous" },
    stats: [{ n: "50+", l: "Marques actives" }, { n: "15+", l: "Pays" }, { n: "1000+", l: "Clients professionnels" }, { n: "15+", l: "Années d'expertise" }],
    brands: { title: "Nos Marques", sub: "Distributeur national des meilleures marques cocktail — filtrables par catégorie de produits.", distTag: "Distributeur national", top: "Top", house: "Marque maison", since: "Partenaire depuis", viewAll: "Voir toutes les marques", orderCta: "Commander cette marque", backToBrands: "Retour aux marques", seoTitle: "en gros au Canada", products: "Produits", origin: "Origine", website: "Site officiel" },
    services: { title: "Services PRO", sub: "Des solutions sur mesure pour les professionnels les plus exigeants de l'hôtellerie-restauration.", items: [
      { id: "products", t: "Nos Produits", d: "Ingrédients cocktail premium, barware et verrerie de plus de 50 marques sélectionnées à travers le monde.", label: "Produits" },
      { id: "custom-glassware", t: "Verrerie & Décoration sur mesure", d: "Solutions de verrerie et décoration personnalisées. De la gravure au design complet.", label: "Verrerie" },
      { id: "custom-barware", t: "Barware sur mesure", d: "Outils de bar selon vos spécifications. Rehaussez l'identité de votre bar.", label: "Barware" },
      { id: "rental", t: "Service de location", d: "Location premium de verrerie et barware pour événements, pop-ups et occasions spéciales.", label: "Location" },
      { id: "custom-syrups", t: "Sirops & cocktails sur mesure", d: "Développement de cocktails signature et formulations Prosyro personnalisées.", label: "Sirops" },
      { id: "events", t: "Événements spéciaux", d: "Service traiteur cocktail complet et soutien événementiel pour fêtes privées, événements corporatifs et lancements.", label: "Événements" },
      { id: "photo", t: "Service de photographie", d: "Photographie professionnelle de cocktails et bars pour vos menus, réseaux sociaux et matériel marketing.", label: "Photo" },
      { id: "consulting", t: "Consultation & Expertise", d: "Développement de programmes de bar, ingénierie de menus et consultation opérationnelle pour l'hôtellerie-restauration.", label: "Consultation" },
      { id: "retailer", t: "Devenir détaillant", d: "Vous souhaitez offrir nos marques dans votre commerce? Contactez notre partenaire de distribution au détail, Jesemi Distribution, à jesemi.com.", label: "Détail" },
      { id: "gifts", t: "Cadeaux corporatifs", d: "Coffrets cocktail et ensembles cadeaux personnalisés pour vos événements et employés.", label: "Cadeaux" },
      { id: "menu", t: "Création de menus", d: "Conception et développement complet de menus cocktail adaptés à votre concept et clientèle.", label: "Menu" },
      { id: "picks", t: "Pics à cocktails personnalisés", d: "Pics à cocktails en bambou gravés au laser avec votre logo. Parfaits pour vos signatures et votre image de marque.", label: "Pics", hasDetail: true },
      { id: "coasters", t: "Sous-verres en silicone personnalisés", d: "Sous-verres en silicone premium moulés avec votre logo. Durables, élégants et lavables au lave-vaisselle.", label: "Sous-verres", hasDetail: true },
      { id: "cloths", t: "Chiffons de polissage microfibre", d: "Chiffons microfibre professionnels pour un polissage sans trace. Un essentiel de bar, disponible en vrac.", label: "Chiffons", hasDetail: true }
    ]},
    trusted: { title: "Ils nous font confiance" },
    portal: { title: "Prêt à commander?", sub: "Accédez à notre catalogue B2B, vérifiez la disponibilité et passez vos commandes via notre portail professionnel.", cta: "Accéder au portail B2B", note: "Besoin d'un compte? Ouvrez-en un ci-dessous." },
    account: { title: "Ouvrir un compte PRO", sub: "Demandez l'accès aux prix de gros et au portail B2B. Nous desservons bars, restaurants, hôtels et détaillants partout au Canada.", f: { biz: "Nom de l'entreprise", name: "Nom du contact", email: "Courriel", phone: "Téléphone", type: "Type d'entreprise", ph: "Sélectionner...", types: ["Bar / Bar à cocktails", "Restaurant", "Hôtel", "Détaillant / Boutique", "Entreprise événementielle", "Autre"], city: "Ville / Province", liquor: "# Permis d'alcool", msg: "Parlez-nous de votre entreprise", send: "Soumettre la demande" }, note: "Nous examinerons votre demande dans les 48 heures.", benefits: ["Prix de gros sur toutes les marques", "Accès direct au portail B2B", "Demandes de produits sur mesure", "Gestionnaire de compte dédié"] },
    contact: { title: "Nous joindre", sub: "Demandes de partenariat, commandes sur mesure ou questions.", addr: "6484 boul. Saint-Laurent, Montréal, QC", f: { name: "Nom", email: "Courriel", msg: "Message", send: "Envoyer" } },
    footer: { tag: "Vente en gros aux bars et restaurants depuis 2012.", rights: "Tous droits réservés.", retail: "Détaillants : contactez Jesemi Distribution — jesemi.com" },
    langSwitch: "EN"
  }
};

/* Country names */
const CN = { CA: "Canada", US: "United States", FR: "France", IT: "Italy", JP: "Japan", MX: "Mexico", PE: "Peru", TT: "Trinidad", ES: "Spain", DE: "Germany" };

/* ═══════════════════ BRAND DETAIL PAGE ═══════════════════ */
/* ═══ BRAND CONTENT ═══ */
const BC={
"Ms Better's Bitters":{h:"Founded by father-daughter duo Phillip and Sam Unger, Ms Better's Bitters began when they discovered a century-old Angostura recipe and...",p:["Miraculous Foamer","Aromatic Bitters","Chocolate Bitters","Orange Tree Bitters","Grapefruit Bitters","Sumac Kiwi Bitters","Cucumber Bitters","Wormwood Bitters","Mole Bitters","Lavender Bitters","Citrus Bitters","Cherry Bitters","Cardamom Bitters","Habanero Bitters","Coffee Bitters","Rhubarb Bitters","Saskatoon Berry Bitters","Firewater Tincture","Smoke Tincture"]},
"Addition":{h:"Founded in 2012 by bartenders Matt Hemeyer and Eric Salenski in Seattle's Georgetown neighborhood, Addition was created to bring spicy and...",p:["Allspice Cocktail Spice","Black Pepper Cocktail Spice","Cardamom Cocktail Spice","Chipotle Cocktail Spice","Cinnamon Cocktail Spice","Clove Cocktail Spice","Cubeb Pepper Cocktail Spice","Cumin Cocktail Spice","Curry Cocktail Spice","Filthy Dirty Cocktail Spice","Fenugreek Cocktail Spice","Garlic Cocktail Spice","Habanero Cocktail Spice","Horseradish Cocktail Spice","Jalapeno Cocktail Spice","Long Pepper Cocktail Spice","Pink Pepper Cocktail Spice","Piri-Piri Cocktail Spice","Rosemary Cocktail Spice","Sage Cocktail Spice","Star Anise Cocktail Spice","Szechuan Pepper Cocktail Spice","Tarragon Cocktail Spice","Thai Green Chili Cocktail Spice","Thyme Cocktail Spice","Turmeric Cocktail Spice","The Full Pull"]},
"All the Bitter":{h:"Created by former sommeliers Ian and Carly from The French Laundry in Napa Valley, All the Bitter developed non-alcoholic bitters in their...",p:["Aromatic Bitters","Orange Cardamom Bitters","New Orleans Spiced Cherry Bitters","Lavender Chamomile Bitters","Coffee & Cherry Bitters","Fig & Walnut Bitters","Classic Bitters Travel Pack"]},
"Bennett Bitters":{h:"Created by award-winning NYC mixologists Yana and Joey, Bennett Bitters was inspired by the fragrant fields of Provence, France....",p:["Bermuda Bitters","Cocktail Bitters","Exorcism Bitters","Lavender Fields Bitters","Scorpion Bitters","Wild Hunt Bitters"]},
"Bittercube":{h:"Founded in 2009 by bartenders Nicholas Kosevich and Ira Koplowitz, Bittercube started in Milwaukee with a vision for bold and balanced...",p:["Cherry Bark Vanilla Bitters","Orange Bitters","Bolivar Bitters","Trinity Bitters","Grapefruit Hibiscus Bitters","Root Beer Bitters","Blackstrap Bitters","Ginger Allspice Bitters","Chipotle Cacao Bitters"]},
"Hella Cocktail Co.":{h:"Founded with a commitment to crafting premium cocktail mixers with integrity, Hella Cocktail Co. creates bold, balanced bitters using real...",p:["Aromatic Bitters","Smoked Chili Bitters","Ginger Bitters","Five Flavor Bitters Bar Set","Habanero Margarita Mixer","Classic Margarita Mixer","Old Fashioned Mixer","Moscow Mule Mixer"]},
"Honest John Bitters":{h:"Incorporated in 2016 by Sara Lund, Honest John Bitters grew from recipes developed with bartenders and chefs at her downtown Salt Lake City...",p:["Aromatic Bitters","Chocolate Bitters","Bananas Foster Bitters","Orange Clove Bitters","Black Walnut Bitters","NOLA Bitters","Coffee + Cherry Bitters","Lavender Bitters","Lemongrass Cardamom Bitters","Sarsaparilla Bitters","Cara Cara Orange Bitters","Grapefruit Bitters"]},
"Miracle Mile":{h:"Founded in 2010 by cocktail enthusiast Louis Anderman in Los Angeles, Miracle Mile Bitters Co. began as a kitchen hobby before evolving...",p:["Forbidden Bitters","Yuzu Bitters","Walnut Bitters","Aperitivo Bitters","Orange Bitters","Ume Bitters","Bay Rum Bitters","Castanea Bitters","Sour Cherry Bitters","Toasted Pecan Bitters"]},
"The Japanese Bitters":{h:"Developed by bartender Yuki Yamazaki after returning to Japan following 2011 earthquake relief efforts, The Japanese Bitters represents the...",p:["Sansho Bitters","Umami Bitters","Yuzu Bitters","Shiso Bitters","Hinoki Bitters","Sakura Bitters"]},
"Maleza":{h:"Maleza is a collection of handcrafted Mexican bitters founded by women who celebrate the richness of indigenous botanicals with deep...",p:["Flores Mexicanas Bitters","Especias Mexicanas Bitters","Citricos Mexicanos Bitters","Hierbas Mexicanas Bitters"]},
"Angostura":{h:"Dr. Johann Gottlieb Benjamin Siegert, a German surgeon in South America, developed this aromatic bitters formula as a medicinal tonic...",p:["Aromatic Bitters","Orange Bitters","Cocoa Bitters"]},
"Amargo Chuncho":{h:"Named after the indigenous Amazonian people who resisted Spanish conquest, Amargo Chuncho bitters originated in Lima, Peru as a distinctive...",p:["Amargo Chuncho Bitters"]},
"The Bitter Truth":{h:"Two passionate Munich bartenders, Stephen Berg and Alexander Hauck, founded The Bitter Truth in 2006 to revive historical bitters recipes...",p:["Old Time Aromatic Bitters","Orange Bitters","Lemon Bitters","Jerry Thomas Bitters","Creole Bitters","Celery Bitters","Grapefruit Bitters","Chocolate Bitters","Tonic Bitters","Peach Bitters","Cucumber Bitters","Black Cherry Bitters","Olive Bitters","Orange Flower Water","Rose Water"]},
"Peychaud":{h:"Created between 1849 and 1857 by Antoine Amédée Peychaud, a Creole apothecary from Haiti who arrived in New Orleans around 1793, Peychaud's...",p:["Aromatic Cocktail Bitters","Herbal Bitters"]},
"Regan":{h:"Created in the early 1990s by celebrated bartender Gary Regan after struggling to find suitable orange bitters, Regan's Orange Bitters No....",p:["Orange Bitters No. 6"]},
"Prosyro":{h:"Prosyro emerged as a Canadian craft syrup producer designed specifically for professional bartenders seeking alternatives to mass-produced...",p:["Pineapple Syrup","Jalapenos Syrup","Mango Syrup","Falernum Syrup (Rum, Lime & Spices)","Fassionola Syrup (Exotic Fruit Punch)","Orgeat Syrup","Coconut Syrup","Fig Syrup","Ube (Purple Yam) Syrup","Kalamansi Syrup","Yuzu Syrup","Bergamot Syrup","Pink Grapefruit Syrup","Entire Lime Syrup","Triple Sec Syrup","Lemoncello Syrup","Raspberry Syrup","Organic Apricot Syrup","BC Totem Strawberry Syrup","Northern Blueberry Syrup","Rhubarb Syrup","Blackberry Syrup","Green Apple Syrup","Watermelon Syrup","Cucumber Syrup","Violet Syrup","Rose Syrup","Lavender Syrup","Viennese Elderflower Syrup","London Elderflower Syrup","Double Vanilla Syrup","Double Ginger Syrup","Rosemary Syrup","Basil Syrup","Smoked Chiles Syrup","Saffron Syrup","Pistachio Orgeat Syrup","Espresso Martini Base","Earl Grey Espresso Martini Base","Tonic Base","Margarita / Daiquiri Base","Cosmopolitan Base","Moscow Mule Base","Caesar Booster (Savory)","Zap! Solution (Neutral Acidity)","Zap! Lemon","Zap! Lime","Triple Sec NA (Replaces Triple Sec)","Limoncello NA (Replaces Limoncello)","Espresso Martini NA (Replaces Kahlua)","Raspberry NA (Replaces Chambord)","Coconut NA (Replaces Malibu)","Orgeat NA (Replaces Amaretto)","Violet NA (Replaces Violet Liqueur)","Viennese Elderflower NA (Replaces St-Germain)"]},
"Immature":{h:"Immature is a specialty bitters offering from the Ms Better's Bitters family, focused on creating unique flavor combinations that bring new...",p:["Verjus Naturel"]},
"Cuvée Roger":{h:"Cuvée Roger is a premium maple syrup created by Pier-Alexis Soulière, Master Sommelier and founder of P-A Soulière Sélection, from the...",p:["Cuvee Roger Maple Syrup","Cuvee Saint-Laurent Maple Syrup"]},
"Jack Rudy":{h:"Brooks Reitz created Jack Rudy Cocktail Co. in 2010 after perfecting a tonic syrup recipe that revolutionized bartender craft in Charleston...",p:["Classic Tonic Syrup","Elderflower Tonic Syrup","Extra Bitter Tonic Syrup","Demerara Syrup","Sweet Tea Syrup","Grenadine","Aromatic Bitters","Lavender Bitters","Bourbon Cocktail Cherries","Vermouth Brined Olives"]},
"Tomr's Tonic":{h:"Founder Tom Richter, a former Broadway actor turned bartender in New York's creative bar scene, crafted his tonic syrup formula in 2007 out...",p:["Tomr's Tonic Concentrate 200ml","Tomr's Tonic Concentrate 750ml"]},
"3/4 OZ.":{h:"3/4 OZ. was founded by two Montreal friends, Alexandrine Lemaire and Hannah Palmer, who combined their backgrounds in design and...",p:["Tonic Syrup","Ginger Ale Syrup","Honey Sour Syrup","Cola Syrup","Spritz Syrup","Salted Maple Caramel Syrup","Spiced Chai Latte Syrup","Pistachio Syrup"]},
"Yakami Orchard":{h:"Yakami Orchard is a family-owned producer from Japan's Miyazaki Prefecture, with some growers in their fourth generation, specializing in...",p:["Yuzu Juice (First Pressing)","Yuzu Juice (Second Pressing)","Sudachi Juice (First Pressing)","Sudachi Juice (Second Pressing)","Kabosu Juice (First Pressing)"]},
"Colonel Pabst":{h:"Colonel Pabst was founded by descendants of the Pabst brewing family, drawing on a recipe created by Colonel Gustave Pabst, a Master Brewer...",p:["All-Malt Amber Lager Worcestershire Sauce"]},
"Opaline":{h:"Opaline is a cocktail shimmer product line distributed by Alambika, developed to address the demand for premium, food-safe edible products...",p:["Liquid Cocktail Shimmer","Edible Gold Dust"]},
"Essentia":{h:"Essentia is an innovative line of essential oil sprays developed from Podere Santa Bianca, a small farm in Tuscany, Italy. Created in...",p:["Essentia Lemon","Essentia Bitter Orange","Essentia Basil","Essentia Oregano","Essentia Cardamom","Essentia Jasmine","Essentia Helichrysum","Essentia Vetiver","Essentia Orange Leaves","Essentia Sweet Orange","Essentia Ginger","Essentia Blend Aria","Essentia Blend N.4","Essentia Blend Mare"]},
"Filthy Food":{h:"Filthy Food was founded by Daniel Singer, who was dissatisfied with commercially available cocktail garnishes. After two years of...",p:["Filthy Black Cherry","Filthy Red Cherry","Filthy Blue Cheese Olives","Filthy Pimento Olives","Filthy Pepper Olives","Filthy Pickle Olives","Filthy Pitted Olive","Filthy Pearl Onions","Filthy Mushroom","Filthy Olive Brine"]},
"Luxardo":{h:"Luxardo is a historic Italian distillery founded in 1821 by Girolamo Luxardo in Zara, Dalmatia, when he refined his wife Maria Canevari's...",p:["Luxardo Maraschino Cherries"]},
"Spherika":{h:"Spherika is a Spanish brand created by Pescaviar, a family-owned business and leader in the spherification segment with presence in over 20...",p:["Passion Fruit Cocktail Pearls","Lime & Lemon Pearls","Chili Flavor Pearls","Date Flavor Pearls","Yuzu Flavor Pearls","Olive Oil Pearls","Soy Sauce Pearls"]},
"Alka":{h:"Alka is a barware product line developed by Alambika after opening Alkademie in 2019, a space where top bartenders were invited to share...",p:["Boston Shaker Set Le Pro (Stainless Steel)","Boston Shaker Set Le Pro (Gold)","Boston Shaker Set Le Pro (Copper)","Lemonizer Bar Knife"]},
"Lehmann Glass":{h:"Lehmann Glass was founded in 1988 in Reims, France by renowned glass designer Gérard Lehmann and sommelier Gérard Basset. Starting with...",p:["New York Cocktail Glass","Paris Cocktail Glass","Dubai Collection","London Collection","Montreal Collection","Rio Collection","Roma Collection","Tokyo Collection","Reims Collection","F. Thireau Signature Collection","A. Lallement No. 4 Champagne Glass","P. Jamesse Prestige Collection","P. Jamesse Synergie Collection","G. Basset Hommage Collection","Excellence Universal Wine Glass"]},
"HP Juniper":{h:"Founded in Quebec by Patrick Cool and Valérian Roy, HP Juniper emerged from entrepreneurs who began crafting spirits in 2017 before...",p:["Classic Non-Alcoholic Gin","Signature Non-Alcoholic Gin","Floral Non-Alcoholic Gin","HP Agave","HP Spiced Cane","Single Malt Non-Alcoholic Whisky"]},
"Projet Pilote":{h:"Founded by owner and distiller Guillaume Drapeau in Montreal's Plateau Mont-Royal, Projet Pilote is an integrated micro-distillery,...",p:["Botanical Hydrosol","Root Hydrosol","Pastiche Hydrosol","Eclat Hydrosol"]},
"Fin Soda":{h:"Created by bartenders Pierre-Hugues Marois and Melanie Aumais, Fin Soda was born from frustration with the lack of interesting...",p:["Aperitivo Spritz","Ginger Mule","Lemon Verbena Collins","Haskap Berry Fizz","Une Poire pour la Soif","Cascara Sea Buckthorn & Strawberries"]},
"Gruvi":{h:"Founded in Denver by siblings Anika and Niki Sawni, Gruvi creates award-winning non-alcoholic beers and wines that elevate social moments...",p:["Golden Lager","Mocha Nitro Stout","Juicy IPA","Sour Weisse","Bubbly Rose","Dry Secco","Dry Red Blend"]},
"NOA":{h:"NOA is a Canadian brand launched in 2023 that quickly established itself as a leader in non-alcoholic spirits, winning Best Canadian Spirit...",p:["N/A Dry Gin","N/A Garden Gin","N/A Amaretto","N/A Italian Amaro","N/A Italian Aperitif","N/A Italian Bitter","N/A Jamaican Spiced Rum","N/A Spiced Rum","N/A Sweet Vermouth"]},
"Shape":{h:"Founded in Montreal in 2021 through a collaboration between Club Local Cocktails & Spiriteaux and Les Brasseurs du Nord, Shape created...",p:["Non-Alcoholic Gin","Non-Alcoholic Amaretto","Non-Alcoholic Rum"]},
"Statera":{h:"Founded in 2021 by four passionate entrepreneurs in Quebec, Statera hand-distills non-alcoholic spirits in small batches using quality gin...",p:["Non-Alcoholic Distilled Gin"]},
"Jesemi's Collection":{h:"Based in Montreal, Jesemi's Collection operates as a wholesale distributor of curated cocktail products and barware. The brand specializes...",p:["Curated wholesale cocktail products and barware"]},
"Sipping Scents":{h:"Sipping Scents creates aromatic cocktail enhancers that elevate the drinking experience through scent. The brand brings together the art of...",p:["Aromatic cocktail scent enhancers"]},
};

function BrandPage({ brand, lang, onBack }) {
  const t = T[lang];
  const cats = CATS[lang];
  const countryName = CN[brand.country] || brand.country;
  const seoText = brand.seo?.[lang] || "";

  return (
    <div style={{ minHeight: "100vh", background: C.white }}>
      {/* Sticky back bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "14px 48px", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", color: C.mid, padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.dark} onMouseLeave={e => e.currentTarget.style.color = C.mid}
          ><ArrowLeft size={15} /> {t.brands.backToBrands}</button>
          <a href="https://alambikab2b.dearportal.com/" target="_blank" rel="noopener noreferrer" style={{
            background: C.dark, color: C.white, padding: "8px 20px", textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6
          }}>{t.brands.orderCta} <ExternalLink size={12} /></a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "80px 48px 60px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 60, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Logo */}
          <div style={{ width: 120, height: 120, background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 16, overflow: "hidden" }}>
            <span style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: C.dark, letterSpacing: "0.05em", textAlign: "center" }}>{LOGOS[brand.name] || brand.name.charAt(0)}</span>
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: fb, color: C.dark, background: "#EDEDED", padding: "3px 10px" }}>{t.brands.distTag}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: fb, color: C.white, background: C.dark, padding: "3px 10px" }}>{cats[brand.pcat]}</span>
              {/* house badge removed */}
              {brand.top && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: fb, color: C.accent, background: "#FDF6E3", padding: "3px 10px", display: "flex", alignItems: "center", gap: 3 }}><Star size={9} fill={C.accent} />{t.brands.top}</span>}
            </div>
            {/* SEO-optimized h1 */}
            <h1 style={{ fontFamily: font, fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1.1 }}>{brand.name}</h1>
            <p style={{ fontFamily: font, fontSize: 20, color: C.mid, fontWeight: 400, margin: "0 0 24px", lineHeight: 1.5 }}>{brand.tagline}</p>
            {/* Meta info */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", fontSize: 13, fontFamily: fb, color: C.mid }}>
              <div><span style={{ color: C.light, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 10 }}>{t.brands.products}</span><br/><span style={{ color: C.dark, fontWeight: 500 }}>{cats[brand.pcat]}</span></div>
              <div><span style={{ color: C.light, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 10 }}>{t.brands.origin}</span><br/><span style={{ color: C.dark, fontWeight: 500 }}>{countryName}</span></div>
              {brand.url && <div><span style={{ color: C.light, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 10 }}>{t.brands.website}</span><br/><a href={brand.url} target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${C.border}` }}>{brand.url.replace(/https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <ArrowUpRight size={11} style={{ verticalAlign: "0px" }} /></a></div>}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story & Content */}
      <div style={{ padding: "64px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            {brand.name} — {t.brands.seoTitle}
          </h2>
          {/* Producer History */}
          {BC[brand.name] && BC[brand.name].h && (
            <p style={{ fontSize: 16, lineHeight: 1.8, color: C.mid, fontFamily: fb, margin: "0 0 32px" }}>{BC[brand.name].h}</p>
          )}
          {/* SEO Text */}
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.light, fontFamily: fb, margin: "0 0 40px", fontStyle: "italic" }}>{seoText}</p>

          {/* Product List */}
          {BC[brand.name] && BC[brand.name].p && BC[brand.name].p.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: font, fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <Package size={18} /> {lang === "en" ? "Products" : "Produits"}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
                {BC[brand.name].p.map((p, i) => (
                  <div key={i} style={{ fontSize: 14, fontFamily: fb, color: C.dark, padding: "8px 0", borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", gap: 8, width: "calc(50% - 12px)" }}>
                    <span style={{ width: 6, height: 6, background: C.accent, flexShrink: 0, display: "inline-block" }}></span> {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image placeholder */}
          <div style={{ width: "100%", height: 320, background: C.bg, border: "1px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: fb, fontSize: 13, color: C.light, letterSpacing: "0.06em", textTransform: "uppercase" }}>Brand hero image</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "40px", background: C.bg, border: `1px solid ${C.border}`, marginTop: 48 }}>
          <h3 style={{ fontFamily: font, fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>
            {lang === "en" ? `Order ${brand.name} wholesale for your menu` : `Commandez ${brand.name} en gros pour votre menu`}
          </h3>
          <p style={{ fontSize: 14, color: C.mid, fontFamily: fb, margin: "0 0 20px" }}>
            {lang === "en" ? "Wholesale to bars and restaurants — log into the Alambika B2B portal to see pricing, availability, and place your order. Retailers: contact Jesemi Distribution." : "Vente en gros aux bars et restaurants — connectez-vous au portail B2B pour les prix et la disponibilité. Détaillants : contactez Jesemi Distribution."}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://alambikab2b.dearportal.com/" target="_blank" rel="noopener noreferrer" style={{
              background: C.dark, color: C.white, padding: "13px 28px", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8
            }}>{lang === "en" ? "Order Now" : "Commander"} <ExternalLink size={14} /></a>
            <button onClick={onBack} style={{
              background: "transparent", color: C.dark, padding: "13px 28px", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase"
            }}>{t.brands.viewAll}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SERVICE DETAIL DATA ═══════════════════ */
const serviceDetails = {
  picks: {
    en: {
      title: "Custom Cocktail Picks",
      intro: "Add a personal touch to every drink with laser-engraved bamboo cocktail picks featuring your logo or design. Each pick becomes a subtle branding moment that elevates the presentation of your signature cocktails.",
      benefits: ["Reinforce your brand identity with every cocktail served", "Premium bamboo material — elegant and sustainable", "Laser engraving for precision and durability", "Minimum quantities adapted to bar and restaurant needs", "Fast turnaround for events and seasonal menus"],
      options: ["Standard bamboo picks (9cm / 12cm / 15cm)", "Knotted bamboo picks", "Flat paddle picks", "Ball-top picks", "Custom shapes available on request"],
      whatWeNeed: ["Your logo in vector format (AI, EPS, SVG, or high-res PNG)", "Desired pick style and length", "Quantity needed", "Timeline for delivery"],
      cta: "Ready to create your custom picks? Contact us for a quote."
    },
    fr: {
      title: "Pics à cocktails personnalisés",
      intro: "Ajoutez une touche personnelle à chaque verre avec des pics à cocktails en bambou gravés au laser avec votre logo ou design. Chaque pic devient un moment de marque subtil qui rehausse la présentation de vos cocktails signature.",
      benefits: ["Renforcez votre identité de marque avec chaque cocktail servi", "Bambou premium — élégant et durable", "Gravure laser pour précision et durabilité", "Quantités minimales adaptées aux bars et restaurants", "Délais rapides pour événements et menus saisonniers"],
      options: ["Pics en bambou standard (9cm / 12cm / 15cm)", "Pics en bambou noués", "Pics plats (paddle)", "Pics à boule", "Formes personnalisées disponibles sur demande"],
      whatWeNeed: ["Votre logo en format vectoriel (AI, EPS, SVG ou PNG haute résolution)", "Style et longueur de pic souhaités", "Quantité requise", "Échéancier de livraison"],
      cta: "Prêt à créer vos pics personnalisés? Contactez-nous pour une soumission."
    }
  },
  coasters: {
    en: {
      title: "Custom Silicone Coasters",
      intro: "Elevate your bar or restaurant with premium custom silicone coasters molded with your logo or design. These coasters are built to endure nightly professional use while keeping your brand front and center.",
      benefits: ["100% food-grade silicone — safe and non-toxic", "Dishwasher safe and incredibly durable", "Non-slip surface protects your bar and furniture", "Full-color molding with fine detail reproduction", "Lightweight yet substantial feel"],
      whatWeNeed: ["Your logo in vector format (AI, EPS, SVG, or high-res PNG)", "Preferred coaster shape (round, square, custom)", "Color preferences", "Quantity needed", "Timeline for delivery"],
      cta: "Interested in custom coasters for your establishment? Reach out for a quote."
    },
    fr: {
      title: "Sous-verres en silicone personnalisés",
      intro: "Rehaussez votre bar ou restaurant avec des sous-verres en silicone premium moulés avec votre logo ou design. Ces sous-verres sont conçus pour résister à une utilisation professionnelle quotidienne tout en gardant votre marque au premier plan.",
      benefits: ["Silicone 100% alimentaire — sûr et non toxique", "Lavable au lave-vaisselle et incroyablement durable", "Surface antidérapante qui protège votre bar et mobilier", "Moulage en couleur avec reproduction fine des détails", "Léger mais avec un toucher substantiel"],
      whatWeNeed: ["Votre logo en format vectoriel (AI, EPS, SVG ou PNG haute résolution)", "Forme de sous-verre préférée (rond, carré, personnalisé)", "Préférences de couleur", "Quantité requise", "Échéancier de livraison"],
      cta: "Intéressé par des sous-verres personnalisés pour votre établissement? Contactez-nous pour une soumission."
    }
  },
  cloths: {
    en: {
      title: "Microfiber Polishing Cloths",
      intro: "Every bartender knows: spotless glassware is non-negotiable. Our professional-grade microfiber polishing cloths deliver streak-free, lint-free results every time — making them an essential behind every great bar.",
      benefits: ["Ultra-fine microfiber for streak-free polishing", "Lint-free finish on wine glasses, coupes, and crystal", "Machine washable — hundreds of uses per cloth", "Large format for efficient polishing", "Available in bulk for bars and restaurants"],
      whatWeNeed: ["Desired quantity", "Preferred size (standard or large)", "Custom embroidery requests (logo, name)"],
      cta: "Stock up on polishing cloths for your team. Contact us for bulk pricing."
    },
    fr: {
      title: "Chiffons de polissage microfibre",
      intro: "Tout barman le sait : une verrerie impeccable est non négociable. Nos chiffons de polissage microfibre professionnels offrent des résultats sans traces et sans peluches à chaque fois — un essentiel derrière chaque grand bar.",
      benefits: ["Microfibre ultra-fine pour un polissage sans traces", "Finition sans peluches sur verres à vin, coupes et cristal", "Lavable à la machine — des centaines d'utilisations par chiffon", "Grand format pour un polissage efficace", "Disponible en vrac pour bars et restaurants"],
      whatWeNeed: ["Quantité souhaitée", "Taille préférée (standard ou grand)", "Demandes de broderie personnalisée (logo, nom)"],
      cta: "Approvisionnez votre équipe en chiffons de polissage. Contactez-nous pour les prix en vrac."
    }
  }
};

/* ═══════════════════ SERVICE DETAIL PAGE ═══════════════════ */
function ServicePage({ serviceId, lang, onBack }) {
  const detail = serviceDetails[serviceId]?.[lang];
  if (!detail) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.white }}>
      {/* Sticky back bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "14px 48px", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", color: C.mid, padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.dark} onMouseLeave={e => e.currentTarget.style.color = C.mid}
          ><ArrowLeft size={15} /> {lang === "en" ? "Back to Services" : "Retour aux services"}</button>
          <a href="https://alambikab2b.dearportal.com/" target="_blank" rel="noopener noreferrer" style={{
            background: C.dark, color: C.white, padding: "8px 20px", textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6
          }}>{lang === "en" ? "Contact Us" : "Nous joindre"} <ExternalLink size={12} /></a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "80px 48px 60px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontFamily: fb, letterSpacing: "0.2em", textTransform: "uppercase", color: C.light, marginBottom: 16 }}>
            {lang === "en" ? "PRO Service" : "Service PRO"}
          </div>
          <h1 style={{ fontFamily: font, fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.1 }}>{detail.title}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: C.mid, fontFamily: fb, margin: 0, maxWidth: 640 }}>{detail.intro}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "64px 48px", maxWidth: 800, margin: "0 auto" }}>
        {/* Benefits */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: font, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            {lang === "en" ? "Why choose this service" : "Pourquoi choisir ce service"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {detail.benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, lineHeight: 1.6, color: C.mid, fontFamily: fb }}>
                <ChevronRight size={16} style={{ color: C.accent, flexShrink: 0, marginTop: 3 }} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Options (picks only) */}
        {detail.options && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: font, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
              {lang === "en" ? "Available options" : "Options disponibles"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {detail.options.map((o, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: C.mid, fontFamily: fb }}>
                  <span style={{ width: 6, height: 6, background: C.dark, flexShrink: 0 }} />
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What we need */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: font, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            {lang === "en" ? "What we need from you" : "Ce dont nous avons besoin"}
          </h2>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, padding: "28px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
            {detail.whatWeNeed.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: C.dark, fontFamily: fb }}>
                <span style={{ width: 18, height: 18, border: `1px solid ${C.border}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.light }}>
                  {i + 1}
                </span>
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "40px", background: C.dark, color: C.white }}>
          <p style={{ fontSize: 18, fontFamily: font, fontWeight: 500, margin: "0 0 20px", lineHeight: 1.5 }}>{detail.cta}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="mailto:pro@alambika.ca" style={{
              background: C.white, color: C.dark, padding: "13px 28px", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8
            }}><Mail size={14} /> pro@alambika.ca</a>
            <button onClick={onBack} style={{
              background: "transparent", color: C.white, padding: "13px 28px", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase"
            }}>{lang === "en" ? "All Services" : "Tous les services"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN APP ═══════════════════ */
export default function AlambikaProSite() {
  const [lang, setLang] = useState("en");
  const [filter, setFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const t = T[lang];
  const cats = CATS[lang];

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const filtered = filter === "all" ? brands : brands.filter(b => b.pcat === filter);
  const inputBase = { padding: "13px 0", border: "none", borderBottom: `1px solid ${C.border}`, fontSize: 14, fontFamily: fb, outline: "none", background: "transparent", color: C.dark, transition: "border-color 0.2s", width: "100%" };
  const navLink = { background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: fb, letterSpacing: "0.06em", textTransform: "uppercase", padding: 0, transition: "opacity 0.2s", color: C.dark };

  /* ─── Service detail view ─── */
  if (activeService) {
    return (
      <div style={{ fontFamily: fb, color: C.dark }}>
        <ServicePage serviceId={activeService} lang={lang} onBack={() => { setActiveService(null); setTimeout(() => go("services"), 100); }} />
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div><div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>ALAMBIKA<span style={{ fontWeight: 300, color: C.light }}>PRO</span></div><div style={{ fontSize: 13, color: C.light }}>{t.footer.tag}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: C.light }}>&copy; 2026 Alambika. {t.footer.rights}</div><a href="https://www.jesemi.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.accent, textDecoration: "none", fontFamily: fb }}>{t.footer.retail}</a></div>
          </div>
        </footer>
      </div>
    );
  }

  /* ─── Brand detail view ─── */
  if (activeBrand) {
    return (
      <div style={{ fontFamily: fb, color: C.dark }}>
        <BrandPage brand={activeBrand} lang={lang} onBack={() => { setActiveBrand(null); setTimeout(() => go("brands"), 100); }} />
        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div><div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>ALAMBIKA<span style={{ fontWeight: 300, color: C.light }}>PRO</span></div><div style={{ fontSize: 13, color: C.light }}>{t.footer.tag}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: C.light }}>&copy; 2026 Alambika. {t.footer.rights}</div><a href="https://www.jesemi.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.accent, textDecoration: "none", fontFamily: fb }}>{t.footer.retail}</a></div>
          </div>
        </footer>
      </div>
    );
  }

  /* ─── Main site ─── */
  return (
    <div style={{ fontFamily: fb, color: C.dark, background: C.white, minHeight: "100vh" }}>

      {/* TOPBAR */}
      <div style={{ background: C.dark, color: C.white, fontSize: 11, fontFamily: fb, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", padding: "9px 48px", fontWeight: 500 }}>
        {lang === "en" ? "National Distributor — Professional accounts & wholesale pricing" : "Distributeur national — Comptes professionnels et prix de gros"}
      </div>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,0.97)" : C.white, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 48px", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: font, letterSpacing: "-0.02em", cursor: "pointer" }} onClick={() => go("hero")}>ALAMBIKA<span style={{ fontWeight: 300, color: C.mid }}>PRO</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {[{ id: "brands", l: t.nav.brands }, { id: "services", l: t.nav.services }, { id: "contact", l: t.nav.contact }].map(i => (
              <button key={i.id} onClick={() => go(i.id)} style={{ ...navLink, opacity: 0.55 }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.55}>{i.l}</button>
            ))}
            <a href="https://alambikab2b.dearportal.com/" target="_blank" rel="noopener noreferrer" style={{ ...navLink, opacity: 0.55, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.55}>{t.nav.portal} <ArrowUpRight size={11} /></a>
            <button onClick={() => go("account")} style={{ background: C.dark, color: C.white, border: "none", cursor: "pointer", padding: "8px 16px", fontSize: 11, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}><UserPlus size={12} /> {t.nav.account}</button>
            <button onClick={() => setLang(lang === "en" ? "fr" : "en")} style={{ background: "none", border: `1px solid ${C.border}`, cursor: "pointer", padding: "5px 12px", fontSize: 11, fontWeight: 600, fontFamily: fb, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, color: C.dark }}><Globe size={12} /> {t.langSwitch}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ background: C.dark, color: C.white, padding: "100px 48px 120px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.035) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 80, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 500px" }}>
            <div style={{ fontSize: 11, fontFamily: fb, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>{t.hero.tag}</div>
            <h1 style={{ fontFamily: font, fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, whiteSpace: "pre-line" }}>{t.hero.h1}</h1>
          </div>
          <div style={{ flex: "1 1 340px", maxWidth: 420 }}>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 36px", fontFamily: fb }}>{t.hero.sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://alambikab2b.dearportal.com/" target="_blank" rel="noopener noreferrer" style={{ background: C.white, color: C.dark, padding: "14px 28px", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 0.85} onMouseLeave={e => e.currentTarget.style.opacity = 1}>{t.hero.cta} <ArrowRight size={15} /></a>
              <button onClick={() => go("brands")} style={{ background: "transparent", color: C.white, padding: "14px 28px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}>{t.hero.cta2}</button>
            </div>
          </div>
        </div>
      </section>

      {/* RETAILER BANNER */}
      <div style={{ background: "#FDF6E3", borderBottom: "1px solid " + C.border, padding: "14px 48px", textAlign: "center" }}>
        <span style={{ fontSize: 13, fontFamily: fb, color: C.mid }}>{t.retailNote.text} </span>
        <a href={t.retailNote.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontFamily: fb, fontWeight: 600, color: C.dark, textDecoration: "none", borderBottom: "1px solid " + C.dark }}>{t.retailNote.link} <ArrowUpRight size={11} style={{ verticalAlign: "-1px" }} /></a>
      </div>

      {/* STATS */}
      <section style={{ borderBottom: `1px solid ${C.border}`, padding: "48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", flex: "1 1 140px" }}>
              <div style={{ fontFamily: font, fontSize: 42, fontWeight: 600, letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ fontSize: 11, color: C.light, fontFamily: fb, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 12px" }}>{t.brands.title}</h2>
          <p style={{ fontSize: 17, color: C.mid, maxWidth: 600, lineHeight: 1.6, margin: 0, fontFamily: fb }}>{t.brands.sub}</p>
        </div>
        {/* Category filters */}
        <div style={{ display: "flex", gap: 6, marginBottom: 40, flexWrap: "wrap" }}>
          {Object.entries(cats).map(([key, label]) => {
            const count = key === "all" ? brands.length : brands.filter(b => b.pcat === key).length;
            if (count === 0 && key !== "all") return null;
            return (
              <button key={key} onClick={() => setFilter(key)} style={{
                padding: "8px 18px", border: `1px solid ${filter === key ? C.dark : C.border}`,
                background: filter === key ? C.dark : "transparent", color: filter === key ? C.white : C.mid,
                fontSize: 12, fontWeight: 500, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
              }}>{label} <span style={{ opacity: 0.5, marginLeft: 4 }}>{count}</span></button>
            );
          })}
        </div>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
          {filtered.map(b => (
            <div key={b.name} onClick={() => { setActiveBrand(b); window.scrollTo(0, 0); }}
              style={{ background: C.white, padding: "28px", cursor: "pointer", transition: "background 0.2s", display: "flex", flexDirection: "column", gap: 14 }}
              onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = C.white}>
              {/* Logo + badges row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 56, height: 56, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                  <span style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: C.dark, letterSpacing: "0.08em", textAlign: "center" }}>{LOGOS[b.name] || b.name.charAt(0)}</span>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  {b.top && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent, background: "#FDF6E3", padding: "3px 7px", display: "flex", alignItems: "center", gap: 3 }}><Star size={9} fill={C.accent} />{t.brands.top}</span>}
                </div>
              </div>
              {/* Name */}
              <div style={{ fontFamily: font, fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>
                {b.name} <ArrowUpRight size={12} style={{ opacity: 0.3, verticalAlign: "1px" }} />
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: C.mid, margin: 0, fontFamily: fb }}>{b.tagline}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: fb, color: C.light }}>{cats[b.pcat]} · {b.country}</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: fb, color: C.dark, background: "#EDEDED", padding: "3px 8px" }}>{t.brands.distTag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONSULTATION BANNER */}
      <section style={{ background: C.dark, color: C.white, padding: "64px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 500px" }}>
            <h3 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 12px" }}>{t.consultBanner.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", fontFamily: fb, margin: 0 }}>{t.consultBanner.text}</p>
          </div>
          <button onClick={() => go("contact")} style={{ background: C.white, color: C.dark, padding: "14px 32px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>{t.consultBanner.cta} <ArrowRight size={14} /></button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: C.bg, padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 12px" }}>{t.services.title}</h2>
          <p style={{ fontSize: 17, color: C.mid, maxWidth: 520, lineHeight: 1.6, margin: "0 0 64px", fontFamily: fb }}>{t.services.sub}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 1, background: C.border }}>
            {t.services.items.map((s, i) => {
              const icons = [<Package size={24} strokeWidth={1.5} />, <Wine size={24} strokeWidth={1.5} />, <UtensilsCrossed size={24} strokeWidth={1.5} />, <GlassWater size={24} strokeWidth={1.5} />, <Droplets size={24} strokeWidth={1.5} />, <Star size={24} strokeWidth={1.5} />, <Sparkles size={24} strokeWidth={1.5} />, <Search size={24} strokeWidth={1.5} />, <Building2 size={24} strokeWidth={1.5} />, <Package size={24} strokeWidth={1.5} />, <Leaf size={24} strokeWidth={1.5} />, <Flame size={24} strokeWidth={1.5} />, <Cherry size={24} strokeWidth={1.5} />, <Star size={24} strokeWidth={1.5} />];
              const isClickable = s.hasDetail;
              return (
                <div key={i}
                  onClick={() => isClickable && (() => { setActiveService(s.id); window.scrollTo(0, 0); })()}
                  style={{ background: C.white, padding: "36px 32px", transition: "background 0.2s", cursor: isClickable ? "pointer" : "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FDFDFD"} onMouseLeave={e => e.currentTarget.style.background = C.white}>
                  <div style={{ width: 48, height: 48, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.dark, marginBottom: 24 }}>{icons[i] || <Sparkles size={24} strokeWidth={1.5} />}</div>
                  <div style={{ fontSize: 10, fontFamily: fb, letterSpacing: "0.14em", textTransform: "uppercase", color: C.light, marginBottom: 10 }}>{s.label}</div>
                  <h3 style={{ fontFamily: font, fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    {s.t} {isClickable && <ArrowUpRight size={14} style={{ opacity: 0.3 }} />}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: C.mid, margin: 0, fontFamily: fb }}>{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "72px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontFamily: fb, letterSpacing: "0.2em", textTransform: "uppercase", color: C.light, marginBottom: 24 }}>{t.trusted.title}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
            {clients.map((c, i) => (
              <span key={i} style={{ fontFamily: font, fontSize: 20, fontWeight: 500, color: C.dark, opacity: 0.35, transition: "opacity 0.2s", cursor: "default", whiteSpace: "nowrap" }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.35}>{c}{i < clients.length - 1 && <span style={{ margin: "0 8px", opacity: 0.3 }}>·</span>}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL */}
      <section id="portal" style={{ background: C.dark, color: C.white, padding: "120px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: font, fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1.1 }}>{t.portal.title}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", margin: "0 0 40px", fontFamily: fb, maxWidth: 520 }}>{t.portal.sub}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a href="https://alambikab2b.dearportal.com/" target="_blank" rel="noopener noreferrer" style={{ background: C.white, color: C.dark, padding: "16px 32px", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 0.85} onMouseLeave={e => e.currentTarget.style.opacity = 1}>{t.portal.cta} <ExternalLink size={15} /></a>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: fb }}>{t.portal.note}</span>
          </div>
        </div>
      </section>

      {/* ACCOUNT */}
      <section id="account" style={{ padding: "120px 48px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px", maxWidth: 400 }}>
            <div style={{ width: 56, height: 56, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.dark, marginBottom: 28 }}><Building2 size={26} strokeWidth={1.5} /></div>
            <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.1 }}>{t.account.title}</h2>
            <p style={{ fontSize: 16, color: C.mid, lineHeight: 1.65, margin: "0 0 32px", fontFamily: fb }}>{t.account.sub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: C.mid, fontFamily: fb }}>
              {t.account.benefits.map((b, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}><ChevronRight size={14} style={{ color: C.accent, flexShrink: 0 }} /><span>{b}</span></div>))}
            </div>
          </div>
          <div style={{ flex: "1 1 400px", maxWidth: 540 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: "40px 36px", minHeight: 560 }}>
              {/* Formcrafts embed */}
              <div
                dangerouslySetInnerHTML={{ __html: '<div data-fc-seamless="true" data-fc-key="kguuwxr" style="max-width:500px;height:545.96px;margin:0 auto"></div><script src="https://app.formcrafts.com/embed.js"><\/script>' }}
              />
              <noscript>
                <p style={{ fontSize: 14, color: C.mid, fontFamily: fb, textAlign: "center", padding: "40px 0" }}>
                  {lang === "en" ? "Please enable JavaScript to load the application form, or contact us at pro@alambika.ca" : "Veuillez activer JavaScript pour charger le formulaire, ou contactez-nous à pro@alambika.ca"}
                </p>
              </noscript>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 48px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 12px" }}>{t.contact.title}</h2>
            <p style={{ fontSize: 15, color: C.mid, lineHeight: 1.6, margin: "0 0 40px", fontFamily: fb }}>{t.contact.sub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[{ icon: <MapPin size={18} strokeWidth={1.5} />, text: t.contact.addr }, { icon: <Mail size={18} strokeWidth={1.5} />, text: "pro@alambika.ca" }, { icon: <Phone size={18} strokeWidth={1.5} />, text: "+1 (514) 564-3562" }].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontSize: 14, color: C.mid, fontFamily: fb }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 360px", maxWidth: 480 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input type="text" placeholder={t.contact.f.name} style={inputBase} onFocus={e => e.target.style.borderBottomColor = C.dark} onBlur={e => e.target.style.borderBottomColor = C.border} />
              <input type="email" placeholder={t.contact.f.email} style={inputBase} onFocus={e => e.target.style.borderBottomColor = C.dark} onBlur={e => e.target.style.borderBottomColor = C.border} />
              <textarea placeholder={t.contact.f.msg} rows={4} style={{ ...inputBase, resize: "none", fontFamily: fb }} onFocus={e => e.target.style.borderBottomColor = C.dark} onBlur={e => e.target.style.borderBottomColor = C.border} />
              <button style={{ background: C.dark, color: C.white, padding: "14px 28px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: fb, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 8, alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>{t.contact.f.send} <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div><div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>ALAMBIKA<span style={{ fontWeight: 300, color: C.light }}>PRO</span></div><div style={{ fontSize: 13, color: C.light }}>{t.footer.tag}</div></div>
          <div style={{ fontSize: 12, color: C.light }}>&copy; 2026 Alambika. {t.footer.rights}</div>
        </div>
      </footer>
    </div>
  );
}
