# InStock — Tableau de bord (React + Vite)

Page unique "Tableau de bord" d'une application professionnelle de gestion
de stock, construite avec React 18 + Vite, en conservant l'identité visuelle
(navbar, couleurs, typographie) de la maquette InStock.

## Contenu

- **Navbar** identique à la maquette : logo, navigation, notifications
  (pastille animée), menu profil animé, bascule clair/sombre, menu mobile
  responsive, animation fade-in + slide-down au chargement.
- **En-tête du tableau de bord** : titre, sous-titre, sélecteur de période.
- **4 cartes KPI principales** : Total produits, Valeur du stock,
  Stock faible, Rupture de stock.
- **4 cartes KPI secondaires** : Entrées du mois, Sorties du mois,
  Produits vendus, Commandes.
- **Graphiques Recharts prêts à recevoir des données** :
  - `MovementsChart` — LineChart (entrées / sorties)
  - `CategoryChart` — PieChart / Donut (répartition par catégorie)
  - `StockValueChart` — AreaChart (valeur du stock dans le temps)
- **`TopProductsTable`** — structure de tableau prête, sans lignes fictives.
- **`PerformanceIndicators`** — Taux de disponibilité, Taux de rupture,
  Rotation du stock, Croissance.
- **`StockStatus`** — barres de progression neutres pour Stock normal,
  Stock faible, Stock critique, Rupture.

Aucune donnée fictive, aucun pourcentage inventé, aucun produit fictif :
toutes les valeurs affichent `—` ou un état vide (`EmptyState`), en attendant
le branchement à une API / un backend réel.

## Démarrage

```bash
npm install
npm run dev
```

Puis ouvrez l'URL indiquée par Vite (par défaut http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    Navbar/            → Navbar.jsx, Navbar.css
    ui/                 → StatCard, EmptyState, SkeletonLoader,
                           ChartCard, PeriodSelector (composants réutilisables)
    dashboard/           → DashboardHeader, MovementsChart, CategoryChart,
                           StockValueChart, TopProductsTable,
                           PerformanceIndicators, StockStatus, Dashboard.jsx
  hooks/
    useDarkMode.js       → gestion du thème + persistance localStorage
  styles/
    theme.css            → tokens couleur clair/sombre
    global.css            → reset, typographie, animations partagées
```

## Prochaine étape (branchement des données réelles)

Chaque composant de graphique / tableau / indicateur accepte déjà les props
nécessaires (`data`, `rows`, `values`) : il suffira de les alimenter avec les
données provenant de l'API pour que les graphiques et indicateurs
s'affichent automatiquement, sans changer la structure existante.
