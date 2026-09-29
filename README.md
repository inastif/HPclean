# HpClean — site vitrine

Site statique (HTML, CSS, JavaScript, sans dépendance ni étape de compilation) pour HpClean, entreprise de nettoyage à Laval.

## Structure

```
index.html               Accueil
services.html            Prestations (particuliers, professionnels, spécialisé)
nettoyage-textile.html   Canapés, matelas, tapis
apropos.html             À propos
contact.html             Formulaire de devis, horaires, carte
mentions-legales.html    Mentions légales et RGPD (à compléter)
404.html                 Page introuvable
assets/css/style.css     Styles
assets/js/main.js        Menu mobile, comparateur avant/après, formulaire
assets/fonts/            Polices auto-hébergées (pas d'appel à Google Fonts)
assets/img/              Images optimisées en WebP, favicon, image de partage
sitemap.xml, robots.txt  Référencement
.htaccess                HTTPS, page 404, cache (hébergeurs Apache)
```

Les noms des pages sont identiques à l'ancien site : les liens déjà référencés par Google restent valides.

## Mettre en ligne

Envoyer tout le contenu de ce dossier à la racine de l'hébergement (dossier `www` ou `public_html`), en FTP ou via le gestionnaire de fichiers de l'hébergeur.

## Avant la mise en ligne — à compléter

1. **Mentions légales** : forme juridique, SIRET, nom du responsable, hébergeur (zones surlignées dans `mentions-legales.html`). C'est une obligation légale.
2. **Vérifier l'e-mail** : l'ancien site utilisait deux adresses différentes (`hpclean.nettoyages@` et `hpclean.nettoyage@`). La nouvelle version utilise `hpclean.nettoyages@gmail.com` partout. Si ce n'est pas la bonne, remplacer dans tous les `.html` et dans `assets/js/main.js` (constante `CONTACT_EMAIL`).
3. **Vérifier Instagram** : le lien pointe vers `hpclen.nettoyage` (sans le « a »), comme sur l'ancien site.
4. **Photos** : les images actuelles viennent de l'ancien site (photos génériques). Remplacer par de vraies photos de chantiers dès que possible, en particulier le comparateur avant/après de l'accueil (`interieur-avant.webp` et `interieur-apres.webp`, même cadrage, format 3:2). La mention « Image d'illustration » pourra alors être retirée dans `index.html`.
5. **Communes desservies** : ajuster la liste dans `index.html` (section « Laval et ses alentours »).

## Recevoir les demandes de devis par e-mail

Par défaut, le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie (aucun serveur nécessaire). Pour recevoir les demandes directement :

1. Créer un compte gratuit sur [Formspree](https://formspree.io) ou [Web3Forms](https://web3forms.com).
2. Dans `index.html` et `contact.html`, ajouter l'adresse fournie sur la balise du formulaire :
   `<form class="form-card" data-quote-form novalidate action="https://formspree.io/f/XXXXXXX" method="POST">`

Le script détecte l'attribut `action` et laisse alors le formulaire s'envoyer normalement.

## Référencement local

Créer ou compléter la fiche **Google Business Profile** de HpClean (adresse, horaires, photos, avis), puis soumettre `https://hpclean.fr/sitemap.xml` dans Google Search Console. Les avis Google pourront ensuite remplacer ou compléter les deux témoignages du site.
