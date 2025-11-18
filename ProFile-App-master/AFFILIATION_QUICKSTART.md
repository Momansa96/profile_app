# 🚀 Guide de Démarrage Rapide - Système d'Affiliation

## ✅ Checklist d'Installation

### 1️⃣ Migration de la Base de Données

```bash
# Appliquer la migration (à faire manuellement si timeout)
npx prisma migrate deploy

# OU créer une nouvelle migration
npx prisma migrate dev --name add_affiliate_system

# Générer le client Prisma (✅ DÉJÀ FAIT)
npx prisma generate
```

⚠️ **Important** : Si la migration timeout avec Supabase, vous pouvez :
- Exécuter la migration directement dans le SQL Editor de Supabase
- Utiliser `npx prisma db push` en développement

---

### 2️⃣ Configuration FedaPay

#### A. Créer un Compte FedaPay
1. Aller sur https://fedapay.com
2. S'inscrire et activer le mode **Sandbox** pour les tests
3. Récupérer les clés API dans **Dashboard > Paramètres > Clés API**

#### B. Ajouter les Variables d'Environnement

Ajouter dans `.env` :

```env
# FedaPay Configuration
FEDAPAY_SECRET_KEY=sk_sandbox_votre_cle_secrete
FEDAPAY_PUBLIC_KEY=pk_sandbox_votre_cle_publique
FEDAPAY_WEBHOOK_SECRET=whsec_votre_secret_webhook

# URL de l'application (pour les liens d'affiliation)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### C. Configurer le Webhook

1. Aller dans **FedaPay Dashboard > Paramètres > Webhooks**
2. Cliquer sur **"Ajouter un webhook"**
3. URL : `https://votre-domaine.com/api/webhooks/fedapay`
4. Événement : `transaction.approved`
5. Sauvegarder et noter le **Secret du webhook**

---

### 3️⃣ Installer le SDK FedaPay (Optionnel)

Si vous souhaitez créer des transactions côté serveur :

```bash
npm install fedapay
```

---

### 4️⃣ Tester le Système

#### Test 1 : Accéder à la Page de Parrainage

```bash
# Démarrer le serveur
npm run dev

# Ouvrir dans le navigateur
http://localhost:3000/dashboard/candidat/parrainage
```

✅ **Vérifications** :
- Un code d'affiliation unique est généré automatiquement
- Le lien complet s'affiche : `http://localhost:3000/sign-up?ref=VOTRE_CODE`
- Les statistiques s'affichent (0 clics, 0 conversions)

---

#### Test 2 : Tracker un Clic

1. Copier votre lien d'affiliation
2. Ouvrir en navigation privée
3. Coller le lien : `http://localhost:3000/sign-up?ref=VOTRE_CODE`
4. ✅ Une bannière verte doit s'afficher : "Code de parrainage activé"
5. Vérifier dans la console du navigateur :
   ```
   ✅ Code de parrainage détecté : VOTRE_CODE
   ```
6. Retourner sur `/dashboard/candidat/parrainage`
7. ✅ Le compteur de clics doit avoir augmenté de 1

---

#### Test 3 : Simuler un Paiement (Mode Test)

##### Option A : Test Manuel avec la Base de Données

Créer un abonnement de test directement :

```typescript
// Dans la console Prisma Studio ou un script
await createSubscription(
  "user_test_filleul",    // clerkId du filleul
  "CANDIDAT",             // Type d'abonnement
  3000,                   // Prix en FCFA
  "VOTRE_CODE",           // Code d'affiliation
  "test_transaction_id",  // ID de transaction test
  "test_customer_id"      // ID client test
);
```

##### Option B : Test avec FedaPay Sandbox

1. Créer une transaction de test via l'API FedaPay
2. Utiliser les métadonnées :
   ```json
   {
     "clerkId": "user_xxxxx",
     "subscriptionType": "CANDIDAT",
     "referralCode": "VOTRE_CODE"
   }
   ```
3. Approuver manuellement la transaction dans FedaPay Dashboard
4. Le webhook sera déclenché automatiquement

✅ **Résultat Attendu** :
- Un nouvel abonnement est créé dans la table `Subscription`
- Une transaction d'affiliation est créée avec `status: "PENDING"`
- La commission apparaît sur la page de parrainage : **300 FCFA**
- Les conversions augmentent de 1

---

### 5️⃣ Vérifier les Données dans Prisma Studio

```bash
# Ouvrir Prisma Studio
npx prisma studio
```

Tables à vérifier :
- **AffiliateLink** : Votre lien d'affiliation
- **AffiliateTransaction** : Les commissions générées
- **Subscription** : Les abonnements créés

---

## 🔧 Commandes Utiles

### Réinitialiser la Base de Données (Développement uniquement)

```bash
# ⚠️ ATTENTION : Supprime toutes les données
npx prisma migrate reset
```

### Créer un Seed de Test

Créer le fichier `prisma/seed-affiliation.ts` :

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Créer un lien d'affiliation de test
  const affiliateLink = await prisma.affiliateLink.create({
    data: {
      code: 'TEST2025ABC',
      clerkId: 'user_test_parrain',
      clicks: 10,
      conversions: 2,
      totalEarned: 600, // 2 conversions × 300 FCFA
    },
  });

  console.log('✅ Lien d\'affiliation de test créé:', affiliateLink);

  // Créer une transaction de test
  const transaction = await prisma.affiliateTransaction.create({
    data: {
      affiliateLinkId: affiliateLink.id,
      referredClerkId: 'user_test_filleul',
      subscriptionType: 'CANDIDAT',
      amount: 3000,
      commission: 300,
      status: 'PENDING',
    },
  });

  console.log('✅ Transaction de test créée:', transaction);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Exécuter :
```bash
npx ts-node prisma/seed-affiliation.ts
```

---

## 🐛 Dépannage

### Problème : "AffiliateLink non défini"

**Solution** : Régénérer le client Prisma
```bash
npx prisma generate
npm run dev
```

---

### Problème : Migration qui timeout

**Solution 1** : Utiliser `db push` (développement uniquement)
```bash
npx prisma db push
```

**Solution 2** : Exécuter le SQL manuellement dans Supabase

---

### Problème : Webhook non déclenché

**Vérifications** :
1. ✅ URL du webhook correcte dans FedaPay Dashboard
2. ✅ Événement `transaction.approved` sélectionné
3. ✅ Application déployée et accessible publiquement (pas localhost)
4. ✅ Tester l'endpoint : `GET https://votre-domaine.com/api/webhooks/fedapay`

---

### Problème : Code d'affiliation non stocké

**Solution** : Vérifier que `localStorage` est disponible
```javascript
if (typeof window !== 'undefined') {
  localStorage.setItem("affiliateRef", refCode);
}
```

---

## 📊 Prochaines Étapes

### Phase 2 : Paiement des Commissions

1. Créer une page admin `/admin/affiliation`
2. Lister toutes les commissions `PENDING`
3. Bouton pour marquer comme `PAID` après virement Mobile Money

### Phase 3 : Automatisation

1. Intégrer l'API FedaPay Payout
2. Programmer un cron job mensuel
3. Envoyer des notifications email aux parrains

---

## 📞 Support

- **Documentation complète** : `AFFILIATION_README.md`
- **Documentation FedaPay** : https://docs.fedapay.com
- **Support technique** : support@profile-app.com

---

✅ **Système opérationnel !** Vous pouvez maintenant :
1. Générer vos liens d'affiliation
2. Tracker les clics et conversions
3. Calculer automatiquement les commissions (10%)
4. Gérer les paiements mensuels

🎉 **Bon lancement !**
