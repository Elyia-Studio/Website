#!/usr/bin/env python3
"""Lancé par Netlify à chaque mise en production (voir netlify.toml).

Retire du site publié les articles encore dans la file d'attente, leurs images
et leurs cartes, pour que personne ne puisse les lire avant leur date.
Ne touche qu'au dossier publié par Netlify, jamais au dépôt GitHub.
"""
import json, os, shutil

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILE = os.path.join(RACINE, "_a-paraitre", "file.json")

if os.path.exists(FILE):
    with open(FILE, encoding="utf-8") as f:
        for a in json.load(f)["articles"]:
            for cle in ("page", "image"):
                chemin = os.path.join(RACINE, a[cle])
                if os.path.exists(chemin):
                    os.remove(chemin)
                    print("Masqué :", a[cle])
for dossier in ("_a-paraitre", "scripts", ".github", "Claude outputs"):
    shutil.rmtree(os.path.join(RACINE, dossier), ignore_errors=True)
