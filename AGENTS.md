# AGENTS.md — Casa Ceiba

## Účel projektu

Casa Ceiba je statický web vytvořený v HTML, CSS a čistém JavaScriptu.

Hlavní soubory:
- `index.html`
- `style.css`
- `script.js`
- `gallery.js`

Web obsahuje mimo jiné galerii fotografií, informace o ubytování, vybavení, mapu a rezervační formulář.

---

## Základní pravidla práce

1. Pracuj pouze na úkolu, který zadal uživatel.
2. Pokud si nejsi jistý požadovaným chováním, nejprve se zeptej.
3. Neměň ani nemaž části projektu, které s aktuálním úkolem nesouvisejí.
4. Zachovávej stávající architekturu projektu, pokud uživatel výslovně nepožádá o její změnu.
5. Nepřidávej framework, knihovny, build systém nebo správce balíčků bez předchozího souhlasu uživatele.
6. Preferuj jednoduchá a čitelná řešení odpovídající současné technologii projektu.

---

## Bezpečnost a Git

1. Před větší změnou nejprve ověř stav Git repository.
2. Nikdy bez výslovného souhlasu uživatele:
   - nemaž soubory,
   - nepoužívej `git reset --hard`,
   - nepoužívej `git clean`,
   - nemaž nebo nepřepisuj historii Git,
   - nepřepisuj změny vytvořené uživatelem.
3. Před významnou změnou zachovej možnost snadného návratu pomocí Git.
4. Po dokončení změny zkontroluj `git diff`.
5. Git commit prováděj pouze na výslovný pokyn uživatele.

---

## Způsob práce

Preferovaný pracovní postup:

1. Analyzuj požadavek.
2. Prohlédni relevantní soubory.
3. Stručně popiš navrhované řešení.
4. Před změnou upozorni na případná rizika nebo vedlejší dopady.
5. Proveď pouze požadované změny.
6. Zkontroluj změněné soubory.
7. Pokud je to možné, proveď vhodnou kontrolu nebo test.
8. Informuj uživatele, co bylo změněno a co bylo ověřeno.

Pokud úkol může vést k odstranění nebo zásadnímu přepsání existující funkce, nejprve si vyžádej potvrzení.

---

## Náhled a ověřování

Po změnách webu je potřeba výsledek ověřit také vizuálně v prohlížeči.

Při změnách HTML/CSS/JavaScriptu:
- zachovej funkčnost ostatních částí webu,
- kontroluj konzoli prohlížeče, pokud je to relevantní,
- ověř změnu v reálném náhledu webu.

---

## Fotografie

Optimalizované fotografie používané webem jsou součástí projektu.

Originální fotografie v plném rozlišení nejsou součástí webového repository.

`convert.bat` a `create_images.py` jsou pomocné nástroje pro přípravu fotografií. Mohou pracovat s originálními fotografiemi uloženými mimo webový projekt.

Originální fotografie ani pracovní zdrojové soubory pro jejich konverzi nepřidávej do webového repository, pokud o to uživatel výslovně nepožádá.

Před změnami souvisejícími s fotografiemi nejprve zjisti, zda se týkají pouze webových optimalizovaných verzí, nebo také externího pracovního procesu.

---

## Co nedělat automaticky

Bez výslovného požadavku uživatele:
- nepředělávat projekt na framework,
- nepřidávat npm/build systém,
- neměnit URL nebo strukturu webu,
- neměnit rezervační systém,
- nemaž staré soubory jen proto, že se zdají být nepoužívané,
- neprováděj hromadné změny pouze kvůli „úklidu“ kódu.

---

## Komunikace

Při dokončení úkolu stručně uveď:

- co bylo změněno,
- které soubory byly změněny,
- jak byla změna ověřena,
- případné problémy nebo doporučení pro další krok.

Pokud je možné úkol splnit více způsoby s různými důsledky, nejprve popiš možnosti a požádej uživatele o rozhodnutí.