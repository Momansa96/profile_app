import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/home_components/Footer";

export default function MentionsLegales() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
            
            <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 font-sans space-y-6">
            <Navbar />
            <h1 className="text-3xl font-bold text-teal-700 mb-6">Mentions légales</h1>
                <p className="mb-4">
                    Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, nous vous informons que le site <strong>ProFile App</strong> est édité par la société ProFile App, dont le siège social est situé à [Godomey, Abomey-Calavi, Benin].
                    <br />
                    Le directeur de la publication est Mohamed Gnahoui, en qualité de Responsable de la publication.
                    <br />
                    Le site est hébergé par Vercel, dont le siège social est situé à [Serveur decentralise, USA].
                    <br />
                    En accédant à ce site, vous acceptez les présentes mentions légales. Si vous n’acceptez pas ces conditions, nous vous prions de ne pas utiliser ce site.
                </p>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">1. Éditeur du site</h2>
                    <p>
                        Le présent site est édité par :<br />
                        <strong>ProFile App</strong><br />
                        Responsable de la publication : Mohamed Gnahoui<br />
                        Contact : <a href="mailto:mohamedgnahoui@gmail.com" className="text-blue-600">mohamedgnahoui@gmail.com</a><br />
                        Adresse : [Godomey, Abomey-Calavi, Benin]
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">2. Hébergement</h2>
                    <p>
                        Le site est hébergé par :<br />
                        <strong>Vercel</strong><br />
                        Adresse : Serveur decentralise, USA<br />
                        Site web : <a href="https://www.profile-app.app" className="text-blue-600" target="_blank" rel="noopener noreferrer">profile-app.app</a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">3. Propriété intellectuelle</h2>
                    <p>
                        L’ensemble du contenu du site (textes, images, graphismes, logo, icônes, logiciels, etc.) est la propriété exclusive de ProFile App, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">4. Données personnelles</h2>
                    <p>
                        ProFile App collecte et traite les données personnelles des utilisateurs dans le respect du Règlement Général sur la Protection des Données (RGPD).
                        Conformément à la loi n°78-17 du 6 janvier 1978 modifiée, chaque utilisateur dispose d’un droit d’accès, de rectification, de suppression, d’opposition et de portabilité de ses données.
                        Vous pouvez exercer ces droits en nous contactant à l’adresse suivante :<br />


                    </p>
                    <p>
                        Les données collectées ne sont jamais cédées ni vendues à des tiers sans votre consentement explicite.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
                    <p>
                        Le site utilise des cookies afin d’améliorer l’expérience utilisateur et de mesurer l’audience. Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies.
                        Un bandeau d’information est affiché lors de votre première visite afin d’obtenir votre consentement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">6. Responsabilité</h2>
                    <p>
                        ProFile App ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l’utilisateur, lors de l’accès au site.
                        Des liens hypertextes peuvent renvoyer vers d’autres sites ; ProFile App n’assume aucune responsabilité quant au contenu de ces sites tiers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">7. Droit applicable</h2>
                    <p>
                        Le présent site est soumis au droit français. En cas de litige, la juridiction compétente sera celle du ressort du siège de l’éditeur, sauf disposition contraire.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
                    <p>
                        Pour toute question, vous pouvez nous contacter à l’adresse suivante :<br />
                        📧 <a href="mailto:mohamedgnahoui@gmail.com" className="text-blue-600">mohamedgnahoui@gmailcom</a>
                    </p>
                </section>
            </main>
            <div className="flex-grow"></div>

            <Footer />

        </div>
    );
}
