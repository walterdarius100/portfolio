# Portfolio personnel

Portfolio en français, sur une seule page, développé en HTML, CSS et JavaScript natifs. Aucun framework, dépendance, outil de compilation, police distante ou service externe n’est nécessaire.

## Lancer le site

Avec Python 3 installé :

```sh
cd /workspace/portfolio
python3 -m http.server 8000 --bind 0.0.0.0
```

Sur votre ordinateur, ouvrez `http://localhost:8000`. Arrêtez le serveur avec `Ctrl+C`. Le serveur Python est destiné au développement. Pour publier, copiez les fichiers sur un hébergement statique HTTPS (GitHub Pages, Netlify, Vercel ou équivalent).

## Organisation

- `index.html` : structure sémantique, sections et formulaire.
- `styles.css` : identité visuelle, dispositions responsive et réduction des mouvements.
- `content.js` : toutes les informations professionnelles personnalisables.
- `app.js` : rendu du contenu, navigation active, menu et validation.
- `assets/` : favicon et emplacement recommandé pour vos images.

## Contenus à compléter

Modifiez `content.js`, en conservant la syntaxe JavaScript :

1. `name`, `title`, `intro`, `about`, `outlook` : nom, titre, présentation, parcours et perspectives.
2. `photo`, `photoAlt` : par exemple `assets/portrait.webp`, avec une description adaptée. Le visuel actuel est un emplacement graphique, pas une photo réelle. Préférez une image WebP ou AVIF optimisée ; une largeur de 900 pixels suffit pour le portrait.
3. `projectCount`, `productCount` : entiers vérifiables ou `null` si inconnus. Aucun chiffre n’est inventé.
4. `services` : descriptions correspondant à vos compétences réelles. Passez `confirmed` à `true` seulement après confirmation. Les quatre domaines demandés sont actuellement signalés comme étant à confirmer.
5. `projects` : nom, image, texte alternatif, problème (`problem`), rôle (`role`), solution, tableau de technologies, statut et liens. Les statuts reconnus sont `prototype`, `en développement` et `publié`. Les deux cartes initiales sont des emplacements, pas des réalisations fictives. Les liens de démonstration et de code source ne sont affichés que pour des URL HTTP ou HTTPS valides. Utilisez HTTPS en production.
6. `technologies` : PHP, HTML et CSS sont présentés sans niveau de maîtrise, avec une utilisation à confirmer. Ajoutez des entrées au tableau pour d’autres outils. Ce site utilise réellement HTML, CSS et JavaScript ; il n’utilise pas PHP.
7. `experiences` : rôle, organisation, période, missions et réalisations vérifiées. Placez les expériences de la plus récente à la plus ancienne. Aucune date n’est inventée ou triée à partir de texte ambigu.
8. `email`, `professionalLinks` : adresse et liens professionnels réels. Les valeurs initiales n’affichent aucun faux lien.

Les titres éditoriaux et textes d’aide génériques restent dans `index.html`. Personnalisez également le monogramme `v.` et le favicon pour votre identité. Lorsque vos contenus sont renseignés, adaptez les introductions mentionnant « à préciser » et retirez la note sur les emplacements de projets si elle n’est plus pertinente.

## Formulaire : état actuel et activation

**Aucun message n’est envoyé.** La validation locale vérifie les champs obligatoires, le format d’adresse et la longueur minimale du message. Avec des champs valides, le formulaire affiche explicitement « Message non envoyé » et conserve votre saisie. Aucune requête réseau, stockage local ou simulation de réussite n’est effectuée. Sans JavaScript, le bouton est désactivé pour empêcher la soumission.

Pour activer l’envoi, choisissez un service de formulaire ou un serveur compatible avec votre hébergement. Aucun endpoint PHP n’est fourni, car la prise en charge PHP de votre hébergement n’est pas connue. L’intégration devra :

- valider les champs et leurs tailles côté serveur ;
- protéger contre le spam avec limitation de débit et piège à robots, et appliquer une protection CSRF selon le mode de traitement ;
- conserver les clés et identifiants exclusivement côté serveur, hors du dépôt ;
- éviter l’injection d’en-têtes et de contenu HTML dans les e-mails ;
- limiter la journalisation des données personnelles et documenter leur traitement ;
- afficher « envoi en cours » pendant la requête, puis une réussite uniquement après confirmation effective du serveur, ou une erreur exploitable ;
- remplacer l’avertissement actuel et adapter la mention sur les données transmises.

Ne renseignez pas de secrets dans `content.js` : ce fichier est public.

## Validation effectuée

Tests dans Chromium, aux largeurs 1440, 768, 390 et 320 pixels :

- sept sections, quatre domaines, deux emplacements de projets et trois technologies ;
- absence de débordement horizontal ;
- menu mobile ouvert/fermé, fermeture avec Échap et après navigation ;
- ancre Projets, section active et titre non masqué par l’en-tête ;
- champs vides et e-mail invalide, déplacement du focus vers le premier champ incorrect ;
- message valide : absence d’envoi réseau et conservation du texte ;
- absence de liens vides, d’erreurs JavaScript et de ressources en erreur ;
- sans JavaScript : soumission désactivée ;
- préférence de réduction des mouvements respectée.

Toutes les ancres et la navigation au clavier ont également été vérifiées à 1440 et 390 pixels. L’audit automatisé axe-core sur les règles WCAG 2 A/AA et 2.1 AA n’a signalé aucune violation à ces deux largeurs, après correction des contrastes. Cet audit ne remplace pas une vérification manuelle exhaustive avec un lecteur d’écran.

La référence fournie (`didierganthier-homepage.vercel.app/posts`) n’a pas pu être consultée : l’environnement a refusé la connexion avec HTTP 403. L’identité visuelle et les éléments graphiques sont originaux.
