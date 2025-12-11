# Copilot Instructions — Atellier Mindfulness Landing

Opis projektu (PL)

Projekt: Atellier — strona typu landing page dla usługi psychoedukacji i redukcji stresu.

Cel: statyczna strona marketingowa o estetyce natury (lasy, mech, kora), z łagodną animacją, parallaxem i płynnym przewijaniem. Treść przechowywana w MDX (micro-CMS) tak, aby można było łatwo dodawać, usuwać i porządkować sekcje.

Główne technologie użyte w projekcie

- Astro — generowanie strony statycznej, routing i layouty
- Tailwind CSS — stylowanie, system designu i szybkie klasy utilitarne
- @astrojs/mdx / Astro Content Collections — treść jako MDX z typami (micro-CMS)
- GSAP (greensock) + ScrollTrigger — animacje wejścia i parallax
- Lenis — płynne, „buttery” przewijanie (smooth scroll)
- Node.js / npm — narzędzia developerskie i budowanie projektu

Struktura projektu (skrót)

- `src/pages/index.astro` — strona główna składająca sekcje
- `src/layouts/BaseLayout.astro` — head, fonty, globalne skrypty inicjalizujące
- `src/components/` — komponenty sekcji i UI (Hero, Nav, Footer, SectionWrapper, ParallaxImage, BlobAmbientBackground, itp.)
- `src/content/` — kolekcje MDX (hero, why, how, process, pricing, faq, regulations)
- `src/styles/` — `globals.css` (Tailwind + CSS vars) i `animations.css`
- `src/scripts/` — `lenis.js` i `gsap-init.js`
- `public/` — favicon i obrazy (użytkownik dodaje własne zdjęcia do `public/images`)

Jak pracować lokalnie

1. Zainstaluj zależności:

```bash
npm install
```

2. Start środowiska developerskiego:

```bash
npm run dev
# Strona dostępna domyślnie: http://localhost:4321
```

3. Budowanie produkcyjne (statyczny output):

```bash
npm run build
# pliki w `dist/`
npm run preview
```

Jak edytować treść (MDX)

- Każda sekcja ma swój folder w `src/content/` i plik `main.mdx`.
- Frontmatter (YAML) definiuje pola jak `title`, `subtitle`, `order`, `background`, `images`, `packages` itp.
- Możesz dodać nowe sekcje: stworzyć folder w `src/content/<name>/main.mdx`, dodać komponent `src/components/<Name>Section.astro` i wstawić go w `src/pages/index.astro`.
- Kolejność sekcji kontrolowana jest w `index.astro` przez kolejność komponentów. `order` w frontmatter przydaje się, ale indeksowa kolejność komponentów jest nadrzędna.

Gdzie znajdują się animacje

- Inicjalizacja: `src/scripts/lenis.js` oraz `src/scripts/gsap-init.js`.
- Większość efektów scroll/timelineów jest w `gsap-init.js` i powiązana z atrybutami `data-animate`, `data-parallax`, `data-parallax-bg`, `data-stagger` na elementach.
- Dodatkowe keyframes CSS i klasy pomocnicze w: `src/styles/animations.css`.

Styling i zmiana kolorów/typografii

- Główne zmienne kolorystyczne i rozszerzenia Tailwind: `tailwind.config.mjs`.
- Globalne zmienne CSS w `src/styles/globals.css`.
- Dostosuj paletę (forest/moss/bark/mist/night) w `tailwind.config.mjs` i `globals.css` zgodnie z marką.

Jak dodać własne obrazy

- Wrzucaj obrazy do `public/images/` i używaj ścieżek zaczynających się od `/images/` w MDX i komponentach.
- Zalecane rozmiary i kompresja opisane w `README.md` (hero ~2560x1440, sekcje ~1200px, OG 1200x630).

Deploy / serwowanie statyczne

- `npm run build` wygeneruje statyczne pliki w `dist/`.
- Możesz deployować `dist/` do Netlify, Vercel, Cloudflare Pages, S3+CloudFront, czy dowolnego serwera Nginx.

Wskazówki developerskie

- Zmiany w MDX synchronizują się z kolekcjami Astro Content — uruchom dev lub build, aby zobaczyć efekt.
- Jeśli animacje nie działają, sprawdź konsolę przeglądarki oraz czy `lenis` i `gsap` zostały poprawnie zainicjalizowane.
- Aby wyłączyć Lenis podczas debugowania, możesz tymczasowo nie ładować `src/scripts/lenis.js` w `BaseLayout.astro`.

Uwagi o bezpieczeństwie i środowisku serwera

- Pliki `dist/` są statyczne — nie przechowuj w nich sekretów.
- Jeśli chcesz hostować na własnym serwerze Ubuntu, użyj Nginx do serwowania katalogu `dist/` (przykładowe instrukcje setupu są w `SERVER_SETUP.md`).

Kontakt i dalsze kroki

- Jeśli chcesz, mogę przygotować skrypt instalacyjny dla Ubuntu (instalacja Node, Nginx, budowanie i deployment), ale nie mogę się zalogować do Twojego serwera bez danych dostępowych i Twojego uruchomienia komend. Podam gotowy skrypt i instrukcję uruchomienia przez `ssh`.

---

(Dokument w języku polskim — użyj go jako `copilot instructions` dla innych devów pracujących nad projektem.)
