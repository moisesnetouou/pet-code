"use client";

import { Heart } from "lucide-react";
import { aboutStyles } from "./styles";
import type { AboutProps } from "./types";

export function About({ info }: AboutProps) {
  const a = aboutStyles();

  return (
    <div className={a.container()}>
      <div className={a.header()}>
        <h3 className={a.title()}>
          <Heart className={a.titleIcon()} />
          Sobre o PetCode
        </h3>
      </div>

      <div className={a.content()}>
        <div className={a.infoRow()}>
          <span className={a.infoLabel()}>Versão</span>
          <span className={a.infoValue()}>v{info.version}</span>
        </div>
        <div className={a.infoRow()}>
          <span className={a.infoLabel()}>Data debuild</span>
          <span className={a.infoValue()}>{info.buildDate}</span>
        </div>
        <div className={a.infoRow()}>
          <span className={a.infoLabel()}>Node.js</span>
          <span className={a.infoValue()}>{info.nodeVersion}</span>
        </div>
        <div className={a.infoRow()}>
          <span className={a.infoLabel()}>Banco de dados</span>
          <span className={a.infoValue()}>{info.database}</span>
        </div>
      </div>

      <div className={a.footer()}>
        <p className={a.footerText()}>
          PetCode - Sistema de Gestão Clínica Veterinária
        </p>
        <p className={a.footerText()}>Feito com ❤️ para cuidar dos seus pets</p>
      </div>
    </div>
  );
}
