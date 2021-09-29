import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Banner from "../../assets/banner.png";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "scroll"
  },
  banner: {
    height: 200,
    background: `url(${Banner}) no-repeat center center`,
    backgroundSize: "cover"
  },
  content: {
    padding: theme.spacing(2),
    textAlign: "justify"
  }
}));

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.banner} />
      <div className={classes.content}>
        <Typography variant="h6">À propos du projet et de l'auteur</Typography>
        <Typography variant="body1">
          Redfish OS a vu le jour en septembre 2021, je souhaitais présenter mes
          projets et mes compétences de manière plus interactive qu'un simple CV
          ou profil Linkedin.
          <br />
          <br />
          "Redfish" fait référence à mon pseudo GitHub et "OS" comme{" "}
          <i>operating system</i> car ce projet a pour vocation de permettre
          l'exécution de plusieurs projets et applications.
          <br />
          Il est écrit en javascript et utilise le framework React de Facebook
          et Redux comme gestionnaire d'état.
          <br />
          <br />
          Ingénieur en informatique diplômé de Télécom Nancy en 2014, spécialité
          ingénierie du logiciel, j'ai commencé ma carrière chez Deloitte
          Luxembourg pour développer et mettre en place un datawarehouse pour
          une grande assurance du Luxembourg (Oracle, PL/SQL, C#). J'ai ensuite
          changé de domaine pour me spécialiser dans les technologies mobiles
          Android, iOS et React Native (+10K téléchargements).
          <br />
          <br />
          Début 2020 je me lance dans une nouvelle aventure: le développement
          d'un logiciel de gestion d'entreprise pour tous les professionnels du
          bâtiment. Ce dernier permettra d’éditer des devis, fiches de travail,
          contrats de maintenance, factures, relances de paiement, ... et de
          faciliter le traitement des documents fournisseurs (commandes,
          livraisons, factures, ...).
          <br />
          <br />
          Bonne navigation sur Redfish OS et n'hésitez pas à me faire part de
          vos remarques et idées d'améliorations.
        </Typography>
      </div>
    </div>
  );
}

export default About;
