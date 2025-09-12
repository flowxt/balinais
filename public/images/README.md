# Guide des Images - Bohemian House

## 📸 Bonnes pratiques pour les images de produits

### Tailles recommandées
- **Images de produits** : 800x800px maximum (format carré idéal)
- **Images de héros** : 1920x1080px maximum
- **Images de catégories** : 600x400px maximum

### Formats et qualité
- **Format** : JPEG pour les photos, PNG pour les images avec transparence
- **Qualité** : 80-85% pour JPEG (bon compromis taille/qualité)
- **Poids** : Maximum 500KB par image (idéal < 200KB)

### Organisation des dossiers
```
public/images/
├── products/          # Images de produits individuels
│   ├── luminaires/    # Images des luminaires
│   ├── arts-table/    # Images des arts de la table
│   ├── decoration/    # Images de décoration murale
│   └── ...
├── categories/        # Images d'en-tête des catégories
├── hero/             # Images de bannière/hero
└── ...
```

### Outils de compression recommandés
- **En ligne** : TinyPNG, Squoosh.app
- **Logiciels** : ImageOptim (Mac), GIMP, Photoshop

### Nommage des fichiers
- Utilisez des noms descriptifs et courts
- Pas d'espaces (utilisez des tirets : `-`)
- Exemple : `lampe-bambou-traditionnelle.jpg`

### ⚠️ À éviter
- Images "4x-scaled" (trop lourdes)
- Fichiers > 1MB
- Noms avec espaces ou caractères spéciaux
- Formats proprietaires (PSD, AI, etc.)
