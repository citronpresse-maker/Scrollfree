#!/bin/bash

# Configuration FTP
FTP_HOST="ftp.scrollfree.fr"
FTP_USER="scrol2762642"
FTP_PASS="QDz6gqqwKsEP5ZD"

echo "🚀 Démarrage du déploiement sur $FTP_HOST..."

# 1. Build du projet
echo "📦 Compilation du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build. Déploiement annulé."
    exit 1
fi

# 2. Upload des fichiers HTML à la racine
echo "📄 Upload des pages HTML..."
for file in dist/*.html; do
    filename=$(basename "$file")
    echo "   -> $filename"
    curl -T "$file" "ftp://$FTP_HOST/$filename" --user "$FTP_USER:$FTP_PASS" --silent
done

# 3. Upload du fichier contact.php
if [ -f "dist/contact.php" ]; then
    echo "PHP -> contact.php"
    curl -T "dist/contact.php" "ftp://$FTP_HOST/contact.php" --user "$FTP_USER:$FTP_PASS" --silent
fi

# 4. Upload des assets (JS, CSS, Images)
echo "🎨 Upload des assets..."
# Note: On utilise --ftp-create-dirs pour s'assurer que le dossier existe
for file in dist/assets/*; do
    filename=$(basename "$file")
    echo "   -> assets/$filename"
    curl -T "$file" "ftp://$FTP_HOST/assets/$filename" --user "$FTP_USER:$FTP_PASS" --silent --ftp-create-dirs
done

# 5. Upload des gradients
if [ -d "dist/gradients" ]; then
    echo "🌈 Upload des gradients..."
    for file in dist/gradients/*; do
        filename=$(basename "$file")
        echo "   -> gradients/$filename"
        curl -T "$file" "ftp://$FTP_HOST/gradients/$filename" --user "$FTP_USER:$FTP_PASS" --silent --ftp-create-dirs
    done
fi

echo "✅ Déploiement terminé avec succès sur scrollfree.fr !"
