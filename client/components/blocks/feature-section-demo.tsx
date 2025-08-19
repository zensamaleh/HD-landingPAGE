import { FeatureSteps } from "@/components/blocks/feature-section"

const features = [
  {
    step: "Module 1",
    title: "Correction de Libellés",
    content: "Normalisation intelligente et automatique de vos libellés. Suppression des caractères spéciaux. Gestion des grammages. Formatage standardisé MARQUE – NOM – GRAMMAGE.",
    image: "https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop",
    cta: "Essayer maintenant"
  },
  {
    step: "Module 2",
    title: "Classification",
    content: "Classification avancée avec Cyrus IA, adaptée à votre organisation. Structuration automatique selon vos propres référentiels. Hiérarchie personnalisée : Secteur → Rayon → Famille → Sous-famille. Gain de temps et précision grâce à l’IA.",
    image: "https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop",
    cta: "Classer maintenant"
  },
]

export function FeatureStepsDemo() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Nos Services Intelligents</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Deux modules puissants pour optimiser la gestion de vos produits, combinant intelligence artificielle et vos données métier.
        </p>
      </div>
      <FeatureSteps
        features={features}
        title=""
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
    </div>
  )
}
