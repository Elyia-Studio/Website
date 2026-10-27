#!/usr/bin/env python3
"""Publie les articles de blog programmés dans _a-paraitre/file.json.

Lancé chaque mercredi par l'Action GitHub « Publier les articles du blog ».
Un article est publié quand sa date est passée, ou le jour même à partir de
son heure (heure de Genève). Pour chaque article publié, le script :
  - ajoute sa carte en tête de la page blog.html,
  - l'ajoute à sitemap.xml, llms.txt et _redirects,
  - le retire de la file d'attente.

Option --apercu : publie toute la file sans tenir compte des dates. Utilisée
uniquement par les prévisualisations Netlify, pour voir la page Blog complète.
Option --essai : n'écrit rien, affiche ce qui serait publié.
"""
import json, os, re, sys
from datetime import datetime
from zoneinfo import ZoneInfo

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILE = os.path.join(RACINE, "_a-paraitre", "file.json")
SITE = "https://www.elyia.ch/"


def lire(chemin):
    with open(os.path.join(RACINE, chemin), encoding="utf-8") as f:
        return f.read()


def ecrire(chemin, contenu):
    with open(os.path.join(RACINE, chemin), "w", encoding="utf-8") as f:
        f.write(contenu)


def est_du(article, maintenant, apercu):
    if apercu:
        return True
    jour = article["date"]
    aujourdhui = maintenant.strftime("%Y-%m-%d")
    if jour < aujourdhui:
        return True
    return jour == aujourdhui and maintenant.strftime("%H:%M") >= article.get("heure", "07:00")


def verifier(article):
    for cle in ("page", "image", "carte"):
        if not os.path.exists(os.path.join(RACINE, article[cle])):
            sys.exit(f"Fichier manquant pour « {article['titre']} » : {article[cle]}")


def publier(article):
    page = article["page"]
    slug = page[:-5]
    # 1. carte en tête de la page Blog
    blog = lire("blog.html")
    if f'href="{page}" data-link-tile' not in blog:
        m = re.search(r'<div data-grid="3"[^>]*>\n', blog)
        if not m:
            sys.exit("Grille des articles introuvable dans blog.html")
        carte = lire(article["carte"]).rstrip("\n") + "\n"
        blog = blog[: m.end()] + carte + blog[m.end():]
        ecrire("blog.html", blog)
    # 2. sitemap
    sm = lire("sitemap.xml")
    if SITE + page not in sm:
        ligne = (f'  <url><loc>{SITE}{page}</loc><lastmod>{article["date"]}</lastmod>'
                 f'<changefreq>monthly</changefreq><priority>0.7</priority></url>\n')
        blogs = [m for m in re.finditer(r"  <url><loc>https://www\.elyia\.ch/blog-[^\n]*\n", sm)]
        pos = blogs[-1].end() if blogs else sm.index("</urlset>")
        sm = sm[:pos] + ligne + sm[pos:]
        sm = re.sub(r"(<loc>https://www\.elyia\.ch/blog\.html</loc><lastmod>)[^<]*", r"\g<1>" + article["date"], sm)
        ecrire("sitemap.xml", sm)
    # 3. llms.txt (article le plus récent en premier)
    ll = lire("llms.txt")
    if SITE + page not in ll:
        m = re.search(r"^- \[[^\]]*\]\(https://www\.elyia\.ch/blog-", ll, flags=re.M)
        ligne = f"- [{article['titre']}]({SITE}{page})\n"
        ll = ll[: m.start()] + ligne + ll[m.start():] if m else ll.rstrip("\n") + "\n" + ligne
        ecrire("llms.txt", ll)
    # 4. redirection de l'adresse sans .html
    rd = lire("_redirects")
    if f"/{slug} " not in rd:
        ligne = f"/{slug:<33} /{page:<38} 301!\n"
        blogs = [m for m in re.finditer(r"^/blog-[^\n]*\n", rd, flags=re.M)]
        pos = blogs[-1].end() if blogs else len(rd)
        rd = rd[:pos] + ligne + rd[pos:]
        ecrire("_redirects", rd)


def main():
    apercu = "--apercu" in sys.argv
    essai = "--essai" in sys.argv
    if not os.path.exists(FILE):
        print("Aucune file d'attente.")
        return
    file = json.loads(lire(FILE))
    maintenant = datetime.now(ZoneInfo("Europe/Zurich"))
    dus = [a for a in file["articles"] if est_du(a, maintenant, apercu)]
    if not dus:
        print("Rien à publier aujourd'hui.")
        return
    for a in sorted(dus, key=lambda a: a["date"]):
        verifier(a)
        print(f"Publication : {a['titre']} ({a['date']})")
        if not essai:
            publier(a)
    if essai or apercu:
        return
    file["articles"] = [a for a in file["articles"] if a not in dus]
    ecrire(FILE, json.dumps(file, ensure_ascii=False, indent=2) + "\n")
    for a in dus:
        os.remove(os.path.join(RACINE, a["carte"]))
    with open(os.path.join(RACINE, ".publies.txt"), "w", encoding="utf-8") as f:
        f.write(" ; ".join(a["titre"] for a in dus))


if __name__ == "__main__":
    main()
