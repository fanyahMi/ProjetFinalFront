import React from 'react';
import SousDescription from './SousDescription';
import DetailVoiture from './DetailVoiture';
const Description = ({ annonce }) => {
  console.log(annonce);
  return (
    <>
      <SousDescription
        auteur_id={annonce.auteur_id}
        auteur={annonce.auteur}
        prixVente={annonce.prix_vente}
        lieu={annonce.lieu}
        dateAnnonce={annonce.date_annonce}
      />
      <DetailVoiture
        detailvoiture={annonce.detailvoiture}
        proprietes={annonce.proprietes}
        description={annonce.description}
        model={annonce.model}
      />
    </>
  );
};

export default Description;
