"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import crest from "./assets/crest.png";
import logoWhite from "./assets/logo-white.png";
import stampBlue from "./assets/stamp-blue.png";
import danPhoto from "./assets/team/dan.jpeg";
import evelynPhoto from "./assets/team/evelyn.jpeg";
import louisPhoto from "./assets/team/louis.jpeg";
import rukasGuiPhoto from "./assets/team/rukas-gui.jpeg";
import velarisPhoto from "./assets/team/velaris.jpeg";

const INSTAGRAM_URL = "https://www.instagram.com/ocoletivosubsolo/";

const pillars = [
  {
    index: "01",
    title: "ENRAIZAR",
    subtitle: "Território, acesso e pertencimento",
    text: "Partimos de Itapevi e das pessoas que vivem aqui. Reconhecemos os símbolos do território e criamos condições para que diferentes identidades encontrem cultura e pertencimento sem precisar sair da própria cidade.",
  },
  {
    index: "02",
    title: "MOVIMENTAR",
    subtitle: "Cultura, pensamento crítico e valorização artística",
    text: "A cultura registra memória, disputa narrativas e muda a maneira como enxergamos a cidade. Valorizamos artistas, produtores e iniciativas locais por meio de circulação, formação, experimentação e reflexão.",
  },
  {
    index: "03",
    title: "SUSTENTAR",
    subtitle: "Cuidado, transformação e continuidade",
    text: "Uma cena permanece viva quando existe organização, segurança, acolhimento e responsabilidade coletiva. Construímos relações duradouras, redes de apoio e ações conectadas às necessidades da comunidade.",
  },
];

const fronts = [
  {
    number: "01",
    title: "EVENTOS E ENCONTROS",
    text: "Festas, apresentações, ocupações e experiências culturais com curadoria artística, identidade própria e participação de diferentes linguagens underground.",
    className: "front-card--blue",
  },
  {
    number: "02",
    title: "CIRCULAÇÃO E FORMAÇÃO",
    text: "Oportunidades para artistas, DJs, músicos, fotógrafos, designers, performers e produtores apresentarem trabalhos, trocarem conhecimentos e ampliarem suas redes.",
    className: "front-card--paper",
  },
  {
    number: "03",
    title: "COMUNICAÇÃO E MEMÓRIA",
    text: "Conteúdos, registros e arquivos que documentam pessoas, movimentos, espaços e acontecimentos da cena local. Registrar também é impedir que a história desapareça.",
    className: "front-card--acid",
  },
  {
    number: "04",
    title: "CUIDADO E AÇÃO SOCIAL",
    text: "Espaços mais seguros e acolhedores, pontos voluntários de arrecadação e parcerias com instituições e iniciativas sociais da região.",
    className: "front-card--red",
  },
];

const processSteps = [
  ["01", "DEFINIÇÃO", "Propósito, público, formato, viabilidade e impacto."],
  ["02", "PLANEJAMENTO", "Responsabilidades, orçamento, espaço, programação e segurança."],
  ["03", "MOBILIZAÇÃO", "Identidade, comunicação, artistas, parceiros e público."],
  ["04", "REALIZAÇÃO", "Produção, recepção, suporte, cuidado e registro."],
  ["05", "AVALIAÇÃO", "Resultados, escuta, aprendizados e continuidade."],
];

const team = [
  { name: "VELARIS", photo: velarisPhoto, className: "team-card--velaris" },
  { name: "EVELYN", photo: evelynPhoto, className: "team-card--evelyn" },
  { name: "RUKAS GUI", photo: rukasGuiPhoto, className: "team-card--rukas" },
  { name: "LOUIS", photo: louisPhoto, className: "team-card--louis" },
  { name: "DAN", photo: danPhoto, className: "team-card--dan" },
];

function ElevatorIntro() {
  const [phase, setPhase] = useState("waiting");
  const [floor, setFloor] = useState("08");
  const fallbackRef = useRef(null);

  const finish = useCallback(() => {
    window.clearTimeout(fallbackRef.current);
    setPhase("finished");
    document.body.classList.remove("intro-locked");
  }, []);

  const descend = useCallback(() => {
    if (phase !== "waiting") return;
    setPhase("descending");

    const floors = ["08", "04", "01", "00", "−01", "−02"];
    let index = 0;
    const counter = window.setInterval(() => {
      index += 1;
      setFloor(floors[Math.min(index, floors.length - 1)]);
      if (index >= floors.length - 1) {
        window.clearInterval(counter);
        window.setTimeout(() => setPhase("opening"), 380);
      }
    }, 260);

    fallbackRef.current = window.setTimeout(finish, 4200);
  }, [finish, phase]);

  useEffect(() => {
    document.body.classList.add("intro-locked");
    return () => {
      document.body.classList.remove("intro-locked");
      window.clearTimeout(fallbackRef.current);
    };
  }, []);

  if (phase === "finished") return null;

  return (
    <div
      className={`elevator-intro elevator-intro--${phase}`}
      aria-label="Entrada animada do Coletivo Subsolo"
      aria-modal="true"
      role="dialog"
    >
      <div className="elevator-reveal" aria-hidden="true">
        <img src={logoWhite} alt="" />
        <p>A CENA ABAIXO DA SUPERFÍCIE</p>
      </div>

      <div
        className="elevator-door elevator-door--left"
        onTransitionEnd={(event) => {
          if (phase === "opening" && event.propertyName === "transform") finish();
        }}
        aria-hidden="true"
      >
        <span className="door-scratch door-scratch--one" />
        <span className="door-scratch door-scratch--two" />
      </div>
      <div className="elevator-door elevator-door--right" aria-hidden="true">
        <span className="door-scratch door-scratch--three" />
        <span className="door-scratch door-scratch--four" />
      </div>

      <div className="elevator-console">
        <span className="console-kicker">LINHA 8–DIAMANTE / ITAPEVI</span>
        <div className="floor-display" aria-live="polite">
          <span className="floor-arrow">↓</span>
          <strong>{floor}</strong>
        </div>
        <p>
          {phase === "waiting"
            ? "uma descida para dentro da cidade"
            : phase === "opening"
              ? "portas abrindo"
              : "destino: subsolo"}
        </p>
        <button type="button" onClick={descend} disabled={phase !== "waiting"} autoFocus>
          {phase === "waiting" ? "DESCER AO SUBSOLO" : "EM MOVIMENTO"}
        </button>
        <button type="button" className="skip-intro" onClick={finish}>
          pular entrada
        </button>
      </div>
    </div>
  );
}

function Marquee() {
  const line =
    "CULTURA  ✦  TERRITÓRIO  ✦  PERTENCIMENTO  ✦  MEMÓRIA  ✦  CONTINUIDADE  ✦  ITAPEVI TEM SUBSOLO  ✦  ";
  return (
    <div className="marquee" aria-label="Cultura, território, pertencimento, memória e continuidade">
      <div className="marquee__track" aria-hidden="true">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}

function SectionIndex({ children, light = false }) {
  return <div className={`section-index${light ? " section-index--light" : ""}`}>{children}</div>;
}

export default function App() {
  return (
    <>
      <ElevatorIntro />

      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Coletivo Subsolo, início">
          <img src={logoWhite} alt="Coletivo Subsolo" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#coletivo">o coletivo</a>
          <a href="#atuacao">atuação</a>
          <a href="#organizacao">organização</a>
          <a href="#manifesto">manifesto</a>
        </nav>
        <a className="header-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          @ocoletivosubsolo
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <img className="hero-stamp" src={stampBlue} alt="" />

          <div className="hero-meta">
            <span>COLETIVO CULTURAL UNDERGROUND</span>
            <span>ITAPEVI / SP</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">A CENA ABAIXO DA SUPERFÍCIE</p>
            <h1>
              A CENA NÃO ESTÁ AUSENTE.
              <span>ESTÁ SUBTERRÂNEA.</span>
            </h1>
            <p className="hero-description">
              Uma rede criada em Itapevi para conectar pessoas, artistas, espaços e iniciativas,
              fortalecer culturas alternativas e transformar encontros dispersos em continuidade.
            </p>
            <div className="hero-actions">
              <a className="button-link" href="#coletivo">
                CONHECER O COLETIVO <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link text-link--hero" href="#parcerias">
                CONSTRUIR COM A GENTE ↗
              </a>
            </div>
          </div>

          <div className="hero-rail">
            <span>LINHA 8–DIAMANTE</span>
            <span>A NOITE TAMBÉM É NOSSA</span>
            <span>ÚLTIMA ESTAÇÃO: FUTURO</span>
          </div>
        </section>

        <Marquee />

        <section className="why-section" id="por-que">
          <SectionIndex>
            <span>01 / POR QUE EXISTIMOS</span>
            <span>O TERRITÓRIO COMO PONTO DE PARTIDA</span>
          </SectionIndex>
          <h2>POR QUE A CENA DA NOSSA CIDADE PRECISA SEMPRE PARTIR PARA EXISTIR?</h2>
          <div className="why-layout">
            <div className="body-copy">
              <p>
                Durante muito tempo, quem mora em Itapevi e vive culturas alternativas aprendeu a
                transformar o deslocamento em parte obrigatória da experiência. O trem, o custo da
                saída, a volta tarde e o cansaço foram naturalizados como se a cidade servisse apenas
                como ponto de partida.
              </p>
              <p>
                Enquanto isso, artistas, produtores, criadores e diferentes comunidades continuaram
                surgindo de maneira dispersa. A cultura já estava aqui. O que faltava era conexão,
                estrutura e continuidade para que ela fosse reconhecida como parte viva do território.
              </p>
            </div>
            <blockquote>
              ITAPEVI NÃO É UM VAZIO CULTURAL ESPERANDO VALIDAÇÃO DA CAPITAL.
            </blockquote>
          </div>
        </section>

        <section className="collective-section" id="coletivo">
          <SectionIndex light>
            <span>02 / O COLETIVO</span>
            <span>QUEM SOMOS E PARA ONDE VAMOS</span>
          </SectionIndex>

          <div className="collective-intro">
            <h2>RECONHECER, CONECTAR E FORTALECER O QUE JÁ EXISTE.</h2>
            <div>
              <p>
                Somos um coletivo cultural underground independente, criado em Itapevi para reunir
                pessoas, artistas, produtores, espaços e iniciativas que movimentam as culturas
                alternativas da cidade e da Zona Oeste.
              </p>
              <p>
                Organizamos eventos, ações culturais e redes de colaboração com curadoria,
                comunicação, memória, segurança, acolhimento e valorização de quem produz cultura no
                próprio território. O Subsolo dá forma, circulação e permanência ao que já existe
                abaixo da superfície.
              </p>
            </div>
          </div>

          <div className="mission-grid">
            <article>
              <span>MISSÃO</span>
              <h3>CRIAR E SUSTENTAR EXPERIÊNCIAS CULTURAIS EM ITAPEVI.</h3>
              <p>
                Conectar públicos, artistas e iniciativas da cena alternativa por meio de eventos,
                comunicação, formação, memória, acolhimento e ações coletivas com organização e
                continuidade.
              </p>
            </article>
            <article>
              <span>VISÃO</span>
              <h3>FAZER DE ITAPEVI UM TERRITÓRIO DE CIRCULAÇÃO E PERMANÊNCIA.</h3>
              <p>
                Contribuir para que culturas alternativas possam nascer, circular e permanecer aqui,
                consolidando o Subsolo como referência independente de articulação cultural na Zona
                Oeste de São Paulo.
              </p>
            </article>
          </div>
        </section>

        <section className="pillars-section">
          <SectionIndex>
            <span>03 / NOSSOS PILARES</span>
            <span>O QUE SUSTENTA O SUBSOLO</span>
          </SectionIndex>
          <div className="pillars-heading">
            <h2>TRÊS MOVIMENTOS PARA CONSTRUIR CONTINUIDADE.</h2>
            <p>
              Nossos valores aparecem nas decisões práticas do coletivo: em quem participa, como o
              público é recebido, quais histórias registramos e que relações escolhemos construir.
            </p>
          </div>
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title}>
                <span className="pillar-index">{pillar.index}</span>
                <h3>{pillar.title}</h3>
                <strong>{pillar.subtitle}</strong>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
          <p className="values-line">
            PERTENCIMENTO · ACESSO · PENSAMENTO CRÍTICO · INDEPENDÊNCIA · VALORIZAÇÃO ARTÍSTICA ·
            SEGURANÇA · ACOLHIMENTO · SOLIDARIEDADE · COMPROMISSO · CONTINUIDADE
          </p>
        </section>

        <section className="fronts-section" id="atuacao">
          <SectionIndex light>
            <span>04 / NOSSA ATUAÇÃO</span>
            <span>DA PISTA AO ARQUIVO</span>
          </SectionIndex>
          <div className="fronts-heading">
            <h2>O EVENTO É A PARTE VISÍVEL.</h2>
            <p>
              Por trás dele existe um coletivo organizado para fortalecer artistas, registrar a
              memória da cena, criar espaços mais seguros e transformar encontros isolados em uma
              programação cultural com continuidade.
            </p>
          </div>
          <div className="front-grid">
            {fronts.map((front) => (
              <article className={`front-card ${front.className}`} key={front.number}>
                <span className="front-number">{front.number}</span>
                <h3>{front.title}</h3>
                <p>{front.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section">
          <SectionIndex>
            <span>05 / COMO FAZEMOS</span>
            <span>IDEIA, ORGANIZAÇÃO E AVALIAÇÃO</span>
          </SectionIndex>
          <div className="process-heading">
            <h2>INDEPENDÊNCIA TAMBÉM EXIGE MÉTODO.</h2>
            <p>
              Cada ação passa por um processo coletivo que distribui responsabilidades, antecipa
              riscos e transforma aprendizados em decisões melhores para o próximo projeto.
            </p>
          </div>
          <ol className="process-grid">
            {processSteps.map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="territory-section">
          <div className="territory-copy">
            <p className="eyebrow">06 / NOSSO TERRITÓRIO</p>
            <h2>ITAPEVI PRIMEIRO. ZONA OESTE NO HORIZONTE.</h2>
            <p>
              Nosso contra-fluxo amplia o mapa cultural da região. Queremos que Itapevi também seja
              lugar de circulação, encontro e permanência, sem diminuir a importância dos projetos da
              capital nem disputar com outras cenas.
            </p>
            <p>
              Quando artistas encontram estrutura, o público encontra pertencimento e a cidade passa
              a produzir memória, o território deixa de ser visto apenas como passagem. Ele também se
              torna destino.
            </p>
          </div>
          <div className="line-eight" aria-label="Linha 8-Diamante: da capital até Itapevi">
            <span className="line-eight__label">LINHA 8–DIAMANTE</span>
            <div className="line-eight__route">
              <span>CAPITAL</span>
              <i />
              <span>ZONA OESTE</span>
              <i />
              <strong>ITAPEVI</strong>
            </div>
            <p>O ponto de chegada também pode ser destino.</p>
          </div>
        </section>

        <section className="team-section" id="organizacao">
          <SectionIndex light>
            <span>07 / QUEM ORGANIZA</span>
            <span>NÚCLEO DO COLETIVO</span>
          </SectionIndex>
          <div className="team-heading">
            <h2>O SUBSOLO É CONSTRUÍDO POR PESSOAS.</h2>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <figure className={`team-card ${member.className}`} key={member.name}>
                <img src={member.photo} alt={`Retrato de ${member.name}`} loading="lazy" />
                <figcaption>{member.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="manifesto-section" id="manifesto">
          <img className="crest" src={crest} alt="Brasão do Coletivo Subsolo" />
          <div className="manifesto-copy">
            <p className="eyebrow">08 / MANIFESTO</p>
            <h2>PERTENCIMENTO NASCE QUANDO ALGUÉM OLHA PARA ESTA CIDADE E DIZ: ISTO TAMBÉM FALA COMIGO.</h2>
            <p>
              O Subsolo é uma descida para dentro de Itapevi, uma pista para quem sempre atravessou
              longe demais e uma promessa de continuidade. Existe noite, ruído, cultura e futuro aqui.
            </p>
            <a
              className="text-link"
              href={`${import.meta.env.BASE_URL}manifesto-coletivo-subsolo.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              LER O MANIFESTO COMPLETO ↗
            </a>
          </div>
        </section>

        <section className="partnership-section" id="parcerias">
          <div className="partnership-code" aria-hidden="true">
            871523
          </div>
          <div className="partnership-main">
            <p className="eyebrow">09 / CONSTRUA COM O SUBSOLO</p>
            <h2>UMA REDE CRESCE QUANDO ENCONTRA QUEM QUEIRA SUSTENTÁ-LA.</h2>
            <p>
              Construímos com artistas, produtores, espaços culturais, bares, comércios, marcas,
              instituições e iniciativas sociais. Buscamos relações transparentes, com responsabilidades
              e contrapartidas claras, capazes de oferecer estrutura, conhecimento, acesso ou circulação
              sem esvaziar a identidade do projeto.
            </p>
            <a className="button-link button-link--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              FALAR COM O COLETIVO ↗
            </a>
          </div>
          <div className="partnership-data" aria-label="Formas de construir com o Coletivo Subsolo">
            <span>ARTISTAS</span>
            <strong>CIRCULAÇÃO</strong>
            <span>ESPAÇOS</span>
            <strong>ESTRUTURA</strong>
            <span>INICIATIVAS</span>
            <strong>COLABORAÇÃO</strong>
            <span>TERRITÓRIO</span>
            <strong>CONTINUIDADE</strong>
          </div>
        </section>
      </main>

      <footer>
        <img src={logoWhite} alt="Coletivo Subsolo" />
        <p>ITAPEVI / ZONA OESTE DE SÃO PAULO</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          @ocoletivosubsolo ↗
        </a>
      </footer>
    </>
  );
}
