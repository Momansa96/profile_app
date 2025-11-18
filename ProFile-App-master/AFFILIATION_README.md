# 🎁 Système d'Affiliation ProFile-App - Documentation Complète

## 📋 Vue d'Ensemble

Le système d'affiliation permet aux candidats de **partager ProFile-App** et de gagner **10% de cashback** sur chaque abonnement Premium acheté via leur lien unique.

### Offres Concernées
- **Offre Candidat** : 3000 FCFA/mois → **300 FCFA de cashback**
- **Offre Entreprise** : 5000 FCFA/mois → **500 FCFA de cashback**

---

## 🏗️ Architecture Technique

### Modèles de Données (Prisma)

#### `AffiliateLink` - Lien d'affiliation unique
- **code** : Code unique (ex: `JOHN2025ABC`)
- **clerkId** : ID Clerk du parrain
- **clicks** : Nombre de clics sur le lien
- **conversions** : Nombre d'achats via le lien
- **totalEarned** : Cashback total gagné (en FCFA)

#### `AffiliateTransaction` - Transaction d'affiliation
- **referredClerkId** : ID Clerk du filleul
- **subscriptionType** : Type d'abonnement (`CANDIDAT` ou `ENTREPRISE`)
- **amount** : Montant payé (en FCFA)
- **commission** : Commission 10% (en FCFA)
- **status** : `PENDING`, `PAID`, `CANCELLED`
- **fedapayTransactionId** : ID de transaction FedaPay

#### `Subscription` - Abonnement utilisateur
- **clerkId** : ID Clerk de l'abonné
- **type** : `CANDIDAT` ou `ENTREPRISE`
- **status** : `ACTIVE`, `CANCELLED`, `EXPIRED`
- **price** : Prix payé (en FCFA)
- **endDate** : Date d'expiration (30 jours)
- **referredBy** : Code d'affiliation utilisé (optionnel)

---

## 🚀 Fonctionnement du Système

### Étape 1 : Génération du Lien d'Affiliation

Quand un candidat accède à `/dashboard/candidat/parrainage` :

1. Un code unique est généré automatiquement (ex: `JOHN2025XYZ`)
2. Le lien complet est créé : `https://votre-domaine.com/sign-up?ref=JOHN2025XYZ`
3. Le candidat peut copier et partager ce lien

**Server Action utilisée** : `generateAffiliateLink(clerkId)`

---

### Étape 2 : Tracking du Clic

Quand quelqu'un clique sur le lien :

1. Le paramètre `?ref=JOHN2025XYZ` est détecté sur la page `/sign-up`
2. La fonction `trackAffiliateClick(code)` incrémente le compteur de clics
3. Le code est stocké dans `localStorage` pour persister après l'inscription

**Fichier** : `app/(auth)/sign-up/[[...sign-up]]/page.tsx`

```typescript
useEffect(() => {
  if (refCode) {
    trackAffiliateClick(refCode);
    localStorage.setItem("affiliateRef", refCode);
  }
}, [refCode]);
```

---

### Étape 3 : Inscription du Filleul

1. Le filleul s'inscrit normalement via Clerk
2. Le code d'affiliation reste stocké en `localStorage`
3. Une bannière verte confirme le code actif

---

### Étape 4 : Paiement FedaPay

#### Configuration des Métadonnées

Lors de la création de la transaction FedaPay, **vous devez inclure** ces métadonnées :

```javascript
// Exemple d'intégration FedaPay (côté client ou serveur)
const transaction = FedaPay.Transaction.create({
  amount: 3000, // Prix en FCFA
  currency: {
    iso: "XOF"
  },
  description: "Abonnement Candidat ProFile-App",
  customer: {
    email: userEmail,
    firstname: userFirstName,
    lastname: userLastName,
  },
  custom_metadata: {
    clerkId: user.id, // ⚠️ OBLIGATOIRE
    subscriptionType: "CANDIDAT", // ⚠️ OBLIGATOIRE ("CANDIDAT" ou "ENTREPRISE")
    referralCode: localStorage.getItem("affiliateRef") || null, // Code d'affiliation
  },
  callback_url: "https://votre-domaine.com/dashboard/candidat",
});
```

---

### Étape 5 : Webhook FedaPay

#### Configuration dans FedaPay Dashboard

1. Aller dans **Dashboard > Paramètres > Webhooks**
2. Ajouter cette URL : `https://votre-domaine.com/api/webhooks/fedapay`
3. Sélectionner l'événement : **`transaction.approved`**
4. Sauvegarder

#### Traitement du Webhook

Quand le paiement est **approuvé**, le webhook :

1. Vérifie que `status === "approved"`
2. Extrait les métadonnées (`clerkId`, `subscriptionType`, `referralCode`)
3. Crée l'abonnement dans la base de données
4. **Si code d'affiliation présent** :
   - Calcule la commission (10%)
   - Crée une `AffiliateTransaction` avec `status: "PENDING"`
   - Met à jour les stats du parrain (conversions, totalEarned)

**Fichier** : `app/api/webhooks/fedapay/route.ts`

---

## 📊 Interface Candidat

### Page de Parrainage (`/dashboard/candidat/parrainage`)

#### Statistiques Affichées

- **Clics** : Nombre de personnes ayant cliqué sur le lien
- **Conversions** : Nombre d'abonnements vendus
- **Cashback Total** : Montant total gagné (en FCFA)
- **En Attente** : Montant des commissions `status: PENDING`

#### Historique des Transactions

Tableau affichant :
- Date de la vente
- Nom et email du filleul
- Type d'abonnement acheté
- Montant payé par le filleul
- Commission gagnée (10%)
- Statut (`PENDING`, `PAID`, `CANCELLED`)

---

## 💰 Système de Paiement du Cashback

### Statuts des Commissions

1. **PENDING** : Commission enregistrée, en attente de paiement
2. **PAID** : Commission versée au parrain
3. **CANCELLED** : Commission annulée (remboursement, fraude, etc.)

### Processus de Paiement Mensuel

#### Option 1 : Manuel (recommandé pour MVP)

1. **Fin de chaque mois**, exporter toutes les commissions `PENDING`
2. Vérifier la liste et valider les paiements
3. Effectuer les virements Mobile Money manuellement
4. Mettre à jour les statuts en `PAID` :

```sql
UPDATE "AffiliateTransaction"
SET status = 'PAID', "paidAt" = NOW()
WHERE id IN (...);
```

#### Option 2 : Automatique (avancé)

Utiliser l'API FedaPay pour automatiser les paiements :

```typescript
// Server Action pour payer les commissions
export async function payAffiliateCommissions() {
  const pendingTransactions = await prisma.affiliateTransaction.findMany({
    where: { status: "PENDING" },
    include: {
      affiliateLink: {
        include: { user: true }
      }
    }
  });

  for (const transaction of pendingTransactions) {
    // Créer un payout FedaPay
    const payout = await FedaPay.Payout.create({
      amount: transaction.commission * 100, // Convertir en centimes
      currency: { iso: "XOF" },
      recipient: {
        phone_number: transaction.affiliateLink.user.phone,
      },
      description: `Cashback Affiliation - ${transaction.id}`,
    });

    // Mettre à jour le statut
    await prisma.affiliateTransaction.update({
      where: { id: transaction.id },
      data: { status: "PAID", paidAt: new Date() },
    });
  }
}
```

---

## 🔧 Migration de la Base de Données

### Commandes à Exécuter

```bash
# 1. Générer la migration
npx prisma migrate dev --name add_affiliate_system

# 2. Appliquer la migration
npx prisma migrate deploy

# 3. Générer le client Prisma
npx prisma generate
```

---

## 🧪 Tests du Système

### Test 1 : Génération du Lien

1. Se connecter en tant que candidat
2. Aller sur `/dashboard/candidat/parrainage`
3. Vérifier que le lien est généré avec un code unique
4. Copier le lien

### Test 2 : Tracking des Clics

1. Ouvrir le lien en navigation privée
2. Vérifier que la bannière verte s'affiche
3. Vérifier dans la console : `✅ Code de parrainage détecté : XXXX`
4. Retourner sur la page de parrainage du parrain
5. Vérifier que les clics ont augmenté de 1

### Test 3 : Inscription et Paiement

1. S'inscrire avec un nouveau compte
2. Effectuer un paiement FedaPay de **test** avec les métadonnées :
   ```json
   {
     "clerkId": "user_xxxxx",
     "subscriptionType": "CANDIDAT",
     "referralCode": "JOHN2025XYZ"
   }
   ```
3. Approuver la transaction dans FedaPay Dashboard (mode test)
4. Vérifier que le webhook a été déclenché
5. Vérifier que l'abonnement est créé
6. Vérifier que la commission apparaît sur la page de parrainage

### Test 4 : Calcul de la Commission

- Abonnement Candidat (3000 FCFA) → Commission = **300 FCFA** ✅
- Abonnement Entreprise (5000 FCFA) → Commission = **500 FCFA** ✅

---

## 📞 Intégration FedaPay Complète

### Installation du SDK FedaPay

```bash
npm install fedapay
```

### Exemple d'Intégration Complète

```typescript
"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function PaymentPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (subscriptionType: "CANDIDAT" | "ENTREPRISE") => {
    setLoading(true);

    const price = subscriptionType === "CANDIDAT" ? 3000 : 5000;
    const referralCode = localStorage.getItem("affiliateRef");

    try {
      // Créer la transaction FedaPay
      const response = await fetch("/api/create-fedapay-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          clerkId: user?.id,
          email: user?.emailAddresses[0].emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName,
          subscriptionType,
          referralCode,
        }),
      });

      const { checkoutUrl } = await response.json();

      // Rediriger vers FedaPay
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Erreur paiement:", error);
      alert("Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handlePayment("CANDIDAT")} disabled={loading}>
        Payer 3000 FCFA (Candidat)
      </button>
      <button onClick={() => handlePayment("ENTREPRISE")} disabled={loading}>
        Payer 5000 FCFA (Entreprise)
      </button>
    </div>
  );
}
```

### API Route pour Créer la Transaction

```typescript
// app/api/create-fedapay-transaction/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const FedaPay = require("fedapay");

  FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);
  FedaPay.setEnvironment(process.env.NODE_ENV === "production" ? "live" : "sandbox");

  const body = await req.json();
  const { amount, clerkId, email, firstName, lastName, subscriptionType, referralCode } = body;

  try {
    const transaction = await FedaPay.Transaction.create({
      amount: amount,
      currency: { iso: "XOF" },
      description: `Abonnement ${subscriptionType} ProFile-App`,
      customer: {
        email,
        firstname: firstName,
        lastname: lastName,
      },
      custom_metadata: {
        clerkId,
        subscriptionType,
        referralCode,
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/candidat`,
    });

    const token = await transaction.generateToken();

    return NextResponse.json({
      checkoutUrl: `https://checkout.fedapay.com/${token.token}`,
    });
  } catch (error) {
    console.error("Erreur FedaPay:", error);
    return NextResponse.json({ error: "Erreur création transaction" }, { status: 500 });
  }
}
```

---

## 🔒 Sécurité

### Protection contre la Fraude

1. **Vérification du parrain** : Un utilisateur ne peut pas se parrainer lui-même
   ```typescript
   if (affiliateLink.clerkId === buyerClerkId) {
     return { success: false, error: "Impossible de parrainer soi-même" };
   }
   ```

2. **Vérification des doublons** : Une transaction FedaPay ne peut être traitée qu'une seule fois
   ```typescript
   const existingSubscription = await prisma.subscription.findFirst({
     where: { fedapayTransactionId },
   });
   ```

3. **Validation des métadonnées** : Les champs obligatoires sont vérifiés
   ```typescript
   if (!clerkId || !subscriptionType) {
     return { error: "Métadonnées manquantes" };
   }
   ```

---

## 📈 Monitoring et Analytics

### Dashboard Admin (à créer)

Page `/admin/affiliation` pour :
- Voir toutes les affiliations actives
- Statistiques globales (total commissions, top parrains)
- Gérer les paiements mensuels
- Détecter les fraudes potentielles

### Requêtes Utiles

```typescript
// Top 10 parrains
const topAffiliates = await prisma.affiliateLink.findMany({
  orderBy: { totalEarned: "desc" },
  take: 10,
  include: { user: true },
});

// Commissions en attente de paiement
const pendingCommissions = await prisma.affiliateTransaction.findMany({
  where: { status: "PENDING" },
  include: { affiliateLink: { include: { user: true } } },
});

// Revenus totaux générés par affiliation
const totalRevenue = await prisma.affiliateTransaction.aggregate({
  _sum: { amount: true },
  where: { status: { not: "CANCELLED" } },
});
```

---

## 🎉 Résumé du Flux Complet

1. **Candidat crée son lien** → Code unique généré
2. **Partage le lien** → Tracking des clics
3. **Filleul clique** → Code stocké en localStorage
4. **Filleul s'inscrit** → Compte Clerk créé
5. **Filleul paie** → Transaction FedaPay avec métadonnées
6. **Webhook déclenché** → Abonnement + Commission créés
7. **Parrain voit la commission** → Statut PENDING
8. **Fin du mois** → Paiement manuel ou automatique → Statut PAID

---

## 📞 Support

Pour toute question sur le système d'affiliation :
- **Email** : support@profile-app.com
- **Documentation FedaPay** : https://docs.fedapay.com

---

✅ **Système d'affiliation prêt à l'emploi !** 🚀
