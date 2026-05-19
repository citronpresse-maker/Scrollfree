# Guide de Déploiement : Scrollfree

Le projet utilise désormais un workflow de déploiement continu via **GitHub** et **Vercel**, remplaçant l'ancien système par FTP.

## Architecture de Déploiement
`GitHub (Push)` -> `Vercel (Build & Deploy)` -> `scrollfree.fr`

## 1. Fonctionnement Automatique
Chaque fois que vous effectuez un `git push` sur la branche principale, Vercel :
1. Détecte le changement.
2. Lance le build (`npm run build`).
3. Déploie automatiquement les nouveaux fichiers sur `scrollfree.fr`.

## 2. Configuration Vercel
Le fichier `vercel.json` à la racine gère les redirections propres (ex: `scrollfree.fr/simulateur` au lieu de `simulateur.html`).

## 3. Déploiement Manuel (via CLI)
Si vous avez besoin de déployer manuellement sans passer par GitHub :
```bash
# Déploiement de test (preview)
vercel

# Déploiement de production
vercel --prod
```

## 4. Pourquoi ce changement ?
- **Sécurité** : Plus de mots de passe FTP en clair.
- **Fiabilité** : Vercel gère le cache et l'optimisation des images (WebP).
- **Historique** : Chaque déploiement est lié à un commit GitHub, permettant des retours en arrière faciles.
- **Performance** : Déploiement sur un CDN mondial (Edge network).
