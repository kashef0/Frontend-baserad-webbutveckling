
# Projektbeskrivning: Film- och TV-serievisningssida med översättning

## Översikt

[MOVIE LOVERS](https://main--sage-beignet-ee7eba.netlify.app/) Jag utvecklade denna webbplats med målet att erbjuda användarna en plattform för att utforska och upptäcka de senaste filmerna och TV-serierna. En central funktion i webbplatsen är möjligheten att översätta beskrivningar av mediainnehåll till olika språk samt en sökfunktion för att söka efter filmer eller Tv-serier med möjlighet att öka antal filmer eller tv-serier på sidan. det finns möjlighet att visa filmer eller tv-serier genom att klicka på "välj typ" växlare.

## Utvecklingsprocess

Under utvecklingsprocessen användes **Parcel** som byggverktyg för att automatisera arbetsflödet. Parcel är en snabb, enkel och kraftfull webbpack-alternativ som kräver minimal konfiguration. Med hjälp av Parcel kunde utvecklingsmiljön snabbt sättas upp och hanteras utan komplexa inställningar. För att styla webbplatsen och hantera stilmallar användes **Sass** (Syntactically Awesome Style Sheets), som är en CSS-förprocessor som ger extra funktionalitet som variabler, nästlade regler och mixins. Detta gjorde hanteringen av stilmallar mer effektiv och underlättade underhåll av kodbasen.

## Använding av Utvecklingsfiler

 1- **HTML:** Huvudstrukturen och layouten av webbplatsen definieras i HTML-filerna, vilket inkluderar sidans innehåll, element och strukturer.
 2- **CSS (Sass):** Vi använde Sass som vår CSS-preprocessor för att effektivt skapa och organisera vår stilmall. Detta inkluderar definitioner av färger, typografi, layouter m.m.
 3- **JavaScript:** Webbplatsens interaktivitet och funktionalitet implementeras med JavaScript, inklusive händelsehantering, API-anrop och dynamisk manipulation av DOM.
 4- **Bilder och Mediefiler:** För att förbättra användarupplevelsen inkluderar vi bilder och mediefiler för att visa bilder, ikoner och annat grafiskt innehåll.
 5- **Konfigurationsfiler:** Jag använder även konfigurationsfiler för att konfigurera och anpassa mina byggverktyg och miljöer, vilket inkluderar konfigurationsfiler för Parcel och Sass. 
 - **.gitignore:** En fil som specificerar vilka filer och mappar som Git ska ignorera vid versionshantering.
 - **package.json:** En fil som används för att definiera metadata om ett Node.js-projekt och för att inkludera beroenden som projektet behöver.
 - **translate-projrct-e34b06e0f5d0.json:** En JSON-fil som innehåller autentiseringsuppgifter för att använda Google Cloud Translate API.
 - **sharp.config.json:** En konfigurationsfil för Sharp, ett Node.js-bibliotek för bildbehandling.
 - **package-lock.json:** En fil som används för att exakt låsa beroenden för att garantera en konsekvent installationsprocess på olika system.
 - **.env:** En fil som används för att definiera miljövariabler och konfigurationsinställningar för applikationen.

 

## Teknologier

- **Byggverktyg:** Vi använder [Parcel](https://parceljs.org/) för att effektivt bygga och paketera vår webbapplikation med enkel konfiguration och automatisk hantering av beroenden.
- **CSS-preprocessor:** För att skriva mer effektiv och modulär CSS använder vi [Sass](https://sass-lang.com/), som ger oss fördelarna med variabler, nästlade regler, mixins och mycket mer.

## Länkar

- [MOVIE LOVERS](https://main--sage-beignet-ee7eba.netlify.app/)


> OBS: jag tänkte att använda myanimelist API för att visa anime innehåll på sidan&#128532;.
