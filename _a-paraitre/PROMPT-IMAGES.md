# Images du blog : le prompt de base

Une image par article, 1600 × 900, environ 100 Ko, dans `assets/blog/<slug>.jpg`.
Générée avec ChatGPT. On garde le prompt de base tel quel et on ne change que les
quatre champs entre crochets. C'est ce qui rend la grille harmonieuse sans que
toutes les images se ressemblent.

## Quatre familles d'images, en rotation

Pour que la grille reste harmonieuse sans lasser, chaque image appartient à une
famille. Règle : jamais deux fois la même famille deux semaines de suite.

| Famille | Cadrage | Décor | Pour quels sujets |
|---|---|---|---|
| 1. Le lieu | Plan large | Un lieu de travail réel en Suisse romande, avec vue (Léman, Alpes, vieille ville) | Les sujets d'organisation, de démarrage, d'équipe |
| 2. La nature morte | Plan moyen, de face | Quelques objets posés sur une table, sur un fond uni gris perle ou blanc | Les comparaisons, les choix, les coûts |
| 3. Le geste | Plan serré sur des mains, jamais de visage | Une vraie tâche en cours : trier des papiers, annoter un carnet, ranger un classeur | Les tâches, les processus, la formation |
| 4. La matière | Macro, presque abstrait | Lumière à travers du verre dépoli, papier, tissu, pierre, ombres | Les données, la confiance, la sécurité |

## Le prompt (à copier dans ChatGPT)

Le socle commun ne change jamais. On choisit une famille, puis on remplit les champs entre crochets.

> Photographie éditoriale réaliste, format paysage 16:9.
> Famille : [FAMILLE, avec son cadrage et son décor, repris du tableau ci-dessus].
> Sujet : [SUJET : l'idée de l'article, racontée par une scène ou des objets, sans écran lisible].
> Lumière naturelle de [MOMENT : matin / fin d'après-midi / jour d'hiver clair], ombres douces et réelles.
> Palette : blancs, gris perle, pierre claire et bois clair. Une seule touche de couleur [ACCENT], portée par [OBJET PORTEUR DE L'ACCENT].
> Matières réelles : bois, papier, pierre, lin, verre dépoli, plantes vertes.
> Le sujet principal se trouve dans la moitié droite de l'image ; la moitié gauche et le bas restent calmes et peu détaillés, car le titre s'affiche par-dessus.
> Faible profondeur de champ, léger grain photo, petites imperfections naturelles.
> Interdit : texte, chiffres, logos, marques, visages reconnaissables, écrans lisibles, néons, lueurs futuristes, hologrammes, rendu 3D lisse, robots, cerveaux, circuits imprimés, fond crème ou beige.

## L'accent selon la thématique

| Thématique | Accent à écrire dans le prompt |
|---|---|
| Par où commencer | lavande violette (#B49AEB) |
| Coûts et rentabilité | vert menthe (#34C7AE) |
| Données et confiance | bleu ciel (#4BA4FB) |

## Pour que ça ne fasse pas « image IA »

- Une scène qu'un photographe pourrait vraiment prendre. Si elle est impossible dans la réalité, on la refait.
- Une seule idée par image. Pas de symboles flottants.
- Refuser toute image avec du texte déformé, des mains à six doigts ou des reflets incohérents.

## Après la génération

1. Recadrer en 1600 × 900 si besoin.
2. Compresser autour de 100 Ko (JPEG qualité 75 à 80).
3. Enregistrer sous `assets/blog/<slug>.jpg`.

## Images déjà faites

| Article | Famille | Sujet | Accent |
|---|---|---|---|
| blog-par-quoi-commencer | 1. Le lieu | Marches et pictogrammes vers un bureau, Alpes | lavande |
| blog-combien-coute-un-agent-ia | 1. Le lieu | Documents, cube et piles de pièces, Léman et jet d'eau | menthe |
| blog-donnees-ia | 1. Le lieu | (à compléter) | bleu |
| blog-quelle-ia-choisir | 2. La nature morte | Six objets en verre dépoli de formes différentes, un seul teinté | lavande, sur l'objet choisi |
