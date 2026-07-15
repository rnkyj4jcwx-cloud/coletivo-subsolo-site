"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import crest from "./assets/crest.png";
import logoWhite from "./assets/logo-white.png";
import stampBlue from "./assets/stamp-blue.png";

const INSTAGRAM_URL = "https://www.instagram.com/ocoletivosubsolo/";

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
    "EVENTOS MUSICAIS  ✦  EXPOSITORES  ✦  OFICINAS CRIATIVAS  ✦  ITAPEVI TEM SUBSOLO  ✦  ";
  return (
    <div className="marquee" aria-label="Eventos musicais, expositores e oficinas criativas">
      <div className="marquee__track" aria-hidden="true">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}

const fronts = [
  {
    number: "01",
    title: "EVENTOS MUSICAIS",
    text: "Noites construídas com curadoria musical, pista, identidade visual e encontros entre diferentes vertentes da cena dark e alternativa.",
    className: "front-card--blue",
  },
  {
    number: "02",
    title: "EXPOSITORES",
    text: "Espaço para criações independentes, arte, moda, impressos, acessórios e trabalhos que circulam fora dos caminhos previsíveis.",
    className: "front-card--paper",
  },
  {
    number: "03",
    title: "OFICINAS CRIATIVAS",
    text: "Experiências de troca, prática e produção coletiva para aprender fazendo e aproximar pessoas que ainda não se encontraram.",
    className: "front-card--acid",
  },
];

export default function Home() {
  return (
    <>
      <ElevatorIntro />

      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Coletivo Subsolo, início">
          <img src={logoWhite} alt="Coletivo Subsolo" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#por-que">por que</a>
          <a href="#vem-ai">vem aí</a>
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
            <span>COLETIVO DARK E ALTERNATIVO</span>
            <span>ITAPEVI / SP</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">TRANSMISSÃO EM FORMAÇÃO / 001</p>
            <h1>
              A CENA NÃO ESTÁ AUSENTE.
              <span>ESTÁ SUBTERRÂNEA.</span>
            </h1>
            <p className="hero-description">
              Um coletivo nascido em Itapevi para criar eventos musicais, receber expositores e
              promover oficinas criativas. Um ponto de encontro para uma cena que não precisa
              sempre partir para existir.
            </p>
            <a className="button-link" href="#vem-ai">
              VER O QUE VEM AÍ <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-rail">
            <span>LINHA 8–DIAMANTE</span>
            <span>A NOITE TAMBÉM É NOSSA</span>
            <span>ÚLTIMA ESTAÇÃO: FUTURO</span>
          </div>
        </section>

        <Marquee />

        <section className="why-section" id="por-que">
          <div className="section-index">
            <span>01 / POR QUE EXISTIMOS</span>
            <span>MANIFESTO EM 30 SEGUNDOS</span>
          </div>
          <h2>POR QUE A CENA DA NOSSA CIDADE PRECISA SEMPRE PARTIR PARA EXISTIR?</h2>
          <div className="why-layout">
            <div className="body-copy">
              <p>
                Para quem vive longe da capital, ser underground quase nunca começa no rolê.
                Começa no cálculo até a estação, no horário de volta, na grana contada e no
                cansaço transformado em parte do ritual.
              </p>
              <p>
                O Subsolo nasce para contestar essa lógica e reunir quem já vive essa música,
                essa estética, essa noite e esse deslocamento todos os dias.
              </p>
            </div>
            <blockquote>
              ITAPEVI NÃO É UM VAZIO CULTURAL ESPERANDO VALIDAÇÃO DA CAPITAL.
            </blockquote>
          </div>
        </section>

        <section className="coming-section" id="vem-ai">
          <div className="section-index section-index--light">
            <span>02 / O QUE VEM AÍ</span>
            <span>PRIMEIRA DESCIDA</span>
          </div>
          <div className="coming-heading">
            <h2>NÃO ESTAMOS ANUNCIANDO SÓ UMA FESTA.</h2>
            <p>Estamos preparando um ponto de encontro.</p>
          </div>
          <div className="front-grid">
            {fronts.map((front) => (
              <article className={`front-card ${front.className}`} key={front.number}>
                <span className="front-number">{front.number}</span>
                <h3>{front.title}</h3>
                <p>{front.text}</p>
                <span className="front-status">EM CONSTRUÇÃO ↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="territory-section">
          <div className="territory-copy">
            <p className="eyebrow">03 / NOSSO TERRITÓRIO</p>
            <h2>ITAPEVI PRIMEIRO. ZONA OESTE NO HORIZONTE.</h2>
            <p>
              O Coletivo Subsolo nasce em Itapevi para fortalecer uma cena local ainda dispersa.
              Nossa visão é crescer a partir daqui e construir conexões por todo o eixo oeste da
              Grande São Paulo, sem transformar a região em mera passagem até a capital.
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

        <section className="manifesto-section" id="manifesto">
          <img className="crest" src={crest} alt="Brasão do Coletivo Subsolo" />
          <div className="manifesto-copy">
            <p className="eyebrow">04 / MANIFESTO</p>
            <h2>PERTENCIMENTO NASCE QUANDO ALGUÉM OLHA PARA ESTA CIDADE E DIZ: ISTO TAMBÉM FALA COMIGO.</h2>
            <p>
              O Subsolo é uma descida para dentro de Itapevi, uma pista para quem sempre
              atravessou longe demais e uma promessa de continuidade. Existe noite, ruído e
              futuro aqui.
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

        <section className="ticket-section">
          <div className="ticket-code" aria-hidden="true">
            871523
          </div>
          <div className="ticket-main">
            <p className="eyebrow">EMBARQUE #00666 / CHAMADAS EM BREVE</p>
            <h2>NÓS QUEREMOS VOCÊ.</h2>
            <p>
              DJs, expositores, oficineiros, artistas e pessoas interessadas em construir o
              Subsolo: fiquem atentos. A convocação ainda não começou, mas as portas já estão
              sendo preparadas.
            </p>
            <a className="button-link button-link--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              ACOMPANHAR A CONVOCAÇÃO ↗
            </a>
          </div>
          <div className="ticket-data" aria-label="Dados simbólicos do embarque">
            <span>DESTINO</span>
            <strong>COLETIVO SUBSOLO</strong>
            <span>LINHA</span>
            <strong>8–DIAMANTE</strong>
            <span>PORTÃO</span>
            <strong>ITAPEVI</strong>
            <span>STATUS</span>
            <strong>VEM AÍ</strong>
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
