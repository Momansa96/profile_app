import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/home_components/Footer';

export default function PolitiqueConfidentialite() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
            

            <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 font-sans space-y-6">
                <Navbar />
                <h1 className="text-3xl font-bold text-teal-700 mb-6">Politique de confidentialité</h1>

                <p>
                    Chez <strong>ProFile App</strong>, nous accordons une grande importance à la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre plateforme.
                </p>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">1. Données collectées</h2>
                    <p>Nous collectons les informations suivantes lors de l’utilisation de l’application :</p>
                    <ul className="list-disc pl-6">
                        <li>Nom, prénom, adresse e-mail et autres informations d’identification</li>
                        <li>Informations saisies dans le CV (expériences, formations, compétences...)</li>
                        <li>Données de connexion et de navigation (adresse IP, type de navigateur, etc.)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">2. Utilisation des données</h2>
                    <p>Les données collectées servent à :</p>
                    <ul className="list-disc pl-6">
                        <li>Permettre la création, la publication et le téléchargement de CV</li>
                        <li>Offrir une vitrine professionnelle aux utilisateurs</li>
                        <li>Mettre en relation les candidats et les recruteurs</li>
                        <li>Améliorer la qualité de nos services et de l’expérience utilisateur</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">3. Partage des données</h2>
                    <p>
                        Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Des recruteurs inscrits sur la plateforme, si vous avez publié votre CV</li>
                        <li>Des prestataires techniques (hébergement, messagerie, statistiques)</li>
                        <li>Les autorités compétentes en cas d’obligation légale</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">4. Sécurité</h2>
                    <p>
                        Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre l’accès non autorisé, la perte ou l’altération.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">5. Vos droits</h2>
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul className="list-disc pl-6">
                        <li>Droit d’accès, de rectification ou de suppression de vos données</li>
                        <li>Droit de retirer votre consentement</li>
                        <li>Droit à la portabilité de vos données</li>
                        <li>Droit d’opposition à certains traitements</li>
                    </ul>
                    <p>Pour exercer ces droits, veuillez nous contacter à : <strong>support@profile-app.com</strong>.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">6. Durée de conservation</h2>
                    <p>Vos données sont conservées aussi longtemps que votre compte est actif. Vous pouvez demander leur suppression à tout moment.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-teal-700 mt-6 mb-2">7. Modifications de la politique</h2>
                    <p>
                        Cette politique peut être mise à jour. Vous serez informé de tout changement majeur via votre tableau de bord ou par e-mail.
                    </p>
                </section>

                <p className="text-sm text-gray-500 mt-8">Dernière mise à jour : Avril 2025</p>
            </main>
            <Footer />
        </div>
    );
}
