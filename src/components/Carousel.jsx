import React from "react";

export default function Carousel() {
  return (
    <div>
      {/* <!-- Conteneur des slides --> */}
      {/* <div className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"> */}
      <div className="sm:w-[70%] xl:w-full xl:justify-center x:items-center mx-auto flex max-xl:hidden-x max-xl:overflow-x-scroll scrollbar-hide">
        {/* <!-- Slide 1 -->  */}
        <div className="bg-[var(--color-blanc-mauve)] w-[300px] flex-shrink-0 max-md:w-[85%] p-4 m-2 rounded">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-bleu-canard)]">
            Une nostalgie réinventée
          </h3>

          <p className="md:text-lg mb-2">
            Les adultes y trouveront un clin d’œil à leur enfance (Tamagotchi,
            Incollables…), mais revisité avec les codes d’aujourd’hui : éthique,
            éducatif, progressif.
          </p>
          <p className="md:text-lg mb-2">
            C’est une appli qui{" "}
            <strong>fait du bien à toute la famille !</strong>
          </p>
        </div>

        {/* <!-- Slide 2-->  */}
        <div className="bg-[var(--color-blanc-mauve)] w-[300px] flex-shrink-0 max-sm:w-[85%] p-4 m-2 rounded">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-bleu-canard)]">
            Des usages utiles, même à l’école
          </h3>

          <p className="md:text-lg mb-2">
            Pensée pour être utilisée aussi bien en autonomie qu'en
            accompagnement, l'application peut s'intégrer{" "}
            <strong>en classNamee ou en atelier périscolaire</strong> : repérage
            des émotions, petits défis, gestion d’un budget fictif…
          </p>
          <p className="md:text-lg mb-2">
            Des compétences transversales activées sans contrainte.
          </p>
        </div>

        {/* <!-- Slide 3 -->  */}
        <div className="bg-[var(--color-blanc-mauve)] w-[300px] flex-shrink-0 max-sm:w-[85%] p-4 m-2 rounded">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-bleu-canard)]">
            Adaptée, partagée, évolutive
          </h3>

          <p className="md:text-lg mb-2">
            Vous pouvez personnaliser l’expérience selon l’âge et les besoins de
            votre enfant.Des histoires, jeux et activités peuvent aussi être
            partagés avec un grand-parent ou un enseignant.
          </p>
          <p className="md:text-lg mb-2">
            Un<strong> outil pédagogique numérique qui évolue</strong>
            avec les usages, sans jamais perdre de vue l’essentiel : le lien.
          </p>
        </div>

        {/* <!-- Slide 4 -->  */}
        <div className="bg-[var(--color-blanc-mauve)] w-[300px] flex-shrink-0 max-sm:w-[85%] p-4 m-2 rounded">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-bleu-canard)]">
            Vos retours font toute la différence.
          </h3>

          <p className="md:text-lg mb-2">
            Cette version bêta est une première étape : simple, fonctionnelle,
            et déjà pleine de promesses. Elle n’attend que vous : parents,
            enseignants ou curieux, pour grandir, s’améliorer, évoluer.
          </p>
          <p className="md:text-lg mb-2">
            En rejoignant l’aventure dès maintenant,
            <strong> vous devenez acteur </strong>d’un projet éducatif utile,
            bienveillant et accessible à tous.
          </p>
        </div>
      </div>
    </div>
  );
}
