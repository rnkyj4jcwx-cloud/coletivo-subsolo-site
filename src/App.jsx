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

const questions = [
  { index: "01", label: "DISTÂNCIA", title: "POR QUE É PRECISO PARTIR?", text: "Quem vive culturas alternativas em Itapevi aprendeu a transformar o trem, o custo da saída, a volta tarde e o cansaço em parte obrigatória da experiência cultural." },
  { index: "02", label: "DISPERSÃO", title: "E SE A CENA JÁ ESTIVER AQUI?", text: "Artistas, produtores, criadores e comunidades continuam surgindo no território. A cultura não está ausente: precisa de conexão, estrutura e continuidade para ser reconhecida." },
  { index: "03", label: "CONTRA-FLUXO", title: "E SE ITAPEVI TAMBÉM FOR DESTINO?", text: "O Subsolo existe para aproximar o que estava disperso e ampliar o mapa cultural da região — sem esperar validação da capital e sem apagar as cenas que vieram antes." },
];

const statements = [
  { label: "MISSÃO", title: "CRIAR E SUSTENTAR EXPERIÊNCIAS CULTURAIS EM ITAPEVI.", text: "Conectar públicos, artistas e iniciativas da cena alternativa por meio de eventos, comunicação, formação, memória, acolhimento e ações coletivas com organização e continuidade." },
  { label: "VISÃO", title: "FAZER DE ITAPEVI UM TERRITÓRIO DE CIRCULAÇÃO E PERMANÊNCIA.", text: "Contribuir para que culturas alternativas possam nascer, circular e permanecer aqui, consolidando o Subsolo como referência independente de articulação cultural na Zona Oeste de São Paulo." },
];

const pillars = [
  { index: "01", title: "ENRAIZAR", subtitle: "Território, acesso e pertencimento", text: "Partimos de Itapevi e das pessoas que vivem aqui. Reconhecemos os símbolos do território e criamos condições para que diferentes identidades encontrem cultura e pertencimento sem precisar sair da própria cidade." },
  { index: "02", title: "MOVIMENTAR", subtitle: "Cultura, pensamento crítico e valorização artística", text: "A cultura registra memória, disputa narrativas e muda a maneira como enxergamos a cidade. Valorizamos artistas, produtores e iniciativas locais por meio de circulação, formação, experimentação e reflexão." },
  { index: "03", title: "SUSTENTAR", subtitle: "Cuidado, transformação e continuidade", text: "Uma cena permanece viva quando existe organização, segurança, acolhimento e responsabilidade coletiva. Construímos relações duradouras, redes de apoio e ações conectadas às necessidades da comunidade." },
];

const fronts = [
  { number: "01", title: "EVENTOS E ENCONTROS", text: "Festas, apresentações, ocupações e experiências culturais com curadoria artística, identidade própria e participação de diferentes linguagens underground." },
  { number: "02", title: "CIRCULAÇÃO E FORMAÇÃO", text: "Oportunidades para artistas, DJs, músicos, fotógrafos, designers, performers e produtores apresentarem trabalhos, trocarem conhecimentos e ampliarem suas redes." },
  { number: "03", title: "COMUNICAÇÃO E MEMÓRIA", text: "Conteúdos, registros e arquivos que documentam pessoas, movimentos, espaços e acontecimentos da cena local. Registrar também é impedir que a história desapareça." },
  { number: "04", title: "CUIDADO E AÇÃO SOCIAL", text: "Espaços mais seguros e acolhedores, pontos voluntários de arrecadação e parcerias com instituições e iniciativas sociais da região." },
];

const processSteps = [
  ["01", "DEFINIÇÃO", "Propósito, público, formato, viabilidade e impacto."],
  ["02", "PLANEJAMENTO", "Responsabilidades, orçamento, espaço, programação e segurança."],
  ["03", "MOBILIZAÇÃO", "Identidade, comunicação, artistas, parceiros e público."],
  ["04", "REALIZAÇÃO", "Produção, recepção, suporte, cuidado e registro."],
  ["05", "AVALIAÇÃO", "Resultados, escuta, aprendizados e continuidade."],
];

const team = [
  { name: "VELARIS", photo: velarisPhoto, position: "50% 25%" },
  { name: "EVELYN", photo: evelynPhoto, position: "50% 35%" },
  { name: "RUKAS GUI", photo: rukasGuiPhoto, position: "50% 28%" },
  { name: "LOUIS", photo: louisPhoto, position: "50% 24%" },
  { name: "DAN", photo: danPhoto, position: "50% 30%" },
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
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
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
    <div className={`elevator-intro elevator-intro--${phase}`} aria-label="Entrada animada do Coletivo Subsolo" aria-modal="true" role="dialog">
      <div className="elevator-reveal" aria-hidden="true"><img src={logoWhite} alt="" /><p>A CENA ABAIXO DA SUPERFÍCIE</p></div>
      <div className="elevator-door elevator-door--left" onTransitionEnd={(event) => { if (phase === "opening" && event.propertyName === "transform") finish(); }} aria-hidden="true" />
      <div className="elevator-door elevator-door--right" aria-hidden="true" />
      <div className="elevator-console">
        <span className="mono-label">LINHA 8–DIAMANTE / ITAPEVI</span>
        <div className="floor-display" aria-live="polite"><span>↓</span><strong>{floor}</strong></div>
        <p>{phase === "waiting" ? "uma descida para dentro da cidade" : phase === "opening" ? "portas abrindo" : "destino: subsolo"}</p>
        <button type="button" onClick={descend} disabled={phase !== "waiting"} autoFocus>{phase === "waiting" ? "DESCER AO SUBSOLO" : "EM MOVIMENTO"}</button>
        <button type="button" className="skip-intro" onClick={finish}>pular entrada</button>
      </div>
    </div>
  );
}

function Marquee({ children, reverse = false }) {
  const line = `${children}  ✦  ${children}  ✦  `;
  return <div className={`marquee${reverse ? " marquee--reverse" : ""}`} aria-label={children}><div className="marquee__track" aria-hidden="true"><span>{line}</span><span>{line}</span></div></div>;
}

function SectionIndex({ children, light = false }) {
  return <div className={`section-index${light ? " section-index--light" : ""}`} data-reveal>{children}</div>;
}

function TiltCard({ member }) {
  const move = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--tilt-x", `${y * -7}deg`);
    card.style.setProperty("--tilt-y", `${x * 9}deg`);
    card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };
  const reset = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };
  return (
    <figure className="team-card" onPointerMove={move} onPointerLeave={reset} data-reveal>
      <div className="team-card__inner"><img src={member.photo} alt={`Retrato de ${member.name}`} loading="lazy" style={{ objectPosition: member.position }} /><figcaption>{member.name}</figcaption></div>
    </figure>
  );
}

export default function App() {
  const [openQuestion, setOpenQuestion] = useState(0);
  const [activeStatement, setActiveStatement] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
  const [activeFront, setActiveFront] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [routeReversed, setRouteReversed] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const updatePointer = (event) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", distance > 0 ? `${(window.scrollY / distance) * 100}%` : "0%");
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("motion-paused", motionPaused);
    return () => document.body.classList.remove("motion-paused");
  }, [motionPaused]);

  return (
    <>
      <ElevatorIntro />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-meter" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Coletivo Subsolo, início"><img src={logoWhite} alt="Coletivo Subsolo" /></a>
        <nav aria-label="Navegação principal"><a href="#coletivo">coletivo</a><a href="#atuacao">atuação</a><a href="#organizacao">organização</a><a href="#manifesto">manifesto</a></nav>
        <button className="motion-toggle" type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused((current) => !current)}>MOVIMENTO: {motionPaused ? "PAUSADO" : "ATIVO"}</button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true"><span>ITAPEVI</span><span>SUBSOLO</span><span>LINHA 8</span></div>
          <img className="hero-stamp" src={stampBlue} alt="" />
          <div className="hero-meta mono-label"><span>COLETIVO CULTURAL UNDERGROUND</span><span>ITAPEVI / SP</span></div>
          <div className="hero-copy">
            <p className="eyebrow" data-reveal>A CENA ABAIXO DA SUPERFÍCIE</p>
            <h1 aria-label="A cena não está ausente. Está subterrânea."><span className="hero-line" data-reveal>A CENA NÃO</span><span className="hero-line hero-line--cut" data-reveal>ESTÁ AUSENTE.</span><span className="hero-line hero-line--acid" data-reveal>ESTÁ SUBTERRÂNEA.</span></h1>
            <div className="hero-bottom" data-reveal><p>Uma rede criada em Itapevi para transformar encontros dispersos em continuidade cultural.</p><div className="hero-actions"><a className="button-link" href="#coletivo">ENTRAR NA REDE <span aria-hidden="true">↓</span></a><a className="text-link text-link--hero" href="#parcerias">CONSTRUIR COM A GENTE ↗</a></div></div>
          </div>
          <div className="hero-signal mono-label" aria-hidden="true"><span>SINAL</span><strong>08.71</strong><i /><span>TRANSMISSÃO LOCAL</span></div>
        </section>

        <Marquee>CULTURA · TERRITÓRIO · PERTENCIMENTO · MEMÓRIA · CONTINUIDADE · ITAPEVI TEM SUBSOLO</Marquee>

        <section className="why-section" id="por-que">
          <SectionIndex><span>01 / POR QUE EXISTIMOS</span><span>ABRA OS SINAIS</span></SectionIndex>
          <div className="why-heading"><h2 data-reveal>POR QUE A CENA DA NOSSA CIDADE PRECISA SEMPRE PARTIR PARA EXISTIR?</h2><div className="why-counter" aria-hidden="true" data-reveal>08<br />↓<br />−02</div></div>
          <div className="question-console" data-reveal>
            <div className="question-tabs" role="tablist" aria-label="Questões que movem o Subsolo">
              {questions.map((question, index) => <button key={question.index} type="button" role="tab" aria-selected={openQuestion === index} aria-controls={`question-${index}`} id={`question-tab-${index}`} onClick={() => setOpenQuestion(index)}><span>{question.index}</span><strong>{question.label}</strong><i aria-hidden="true">{openQuestion === index ? "×" : "+"}</i></button>)}
            </div>
            {questions.map((question, index) => <article key={question.index} className="question-panel" id={`question-${index}`} role="tabpanel" aria-labelledby={`question-tab-${index}`} hidden={openQuestion !== index}><span className="mono-label">SINAL {question.index} / ITAPEVI</span><h3>{question.title}</h3><p>{question.text}</p></article>)}
          </div>
          <blockquote data-reveal>ITAPEVI NÃO É UM VAZIO CULTURAL ESPERANDO VALIDAÇÃO DA CAPITAL.</blockquote>
        </section>

        <section className="collective-section" id="coletivo">
          <SectionIndex light><span>02 / O COLETIVO</span><span>RECONHECER · CONECTAR · FORTALECER</span></SectionIndex>
          <div className="collective-lead"><h2 data-reveal>O SUBSOLO DÁ FORMA AO QUE JÁ EXISTE ABAIXO DA SUPERFÍCIE.</h2><p data-reveal>Somos um coletivo cultural underground independente, criado em Itapevi para reunir pessoas, artistas, produtores, espaços e iniciativas que movimentam as culturas alternativas da cidade e da Zona Oeste.</p></div>
          <div className="statement-switcher" data-reveal>
            <div className="statement-buttons" role="tablist" aria-label="Missão e visão">{statements.map((statement, index) => <button key={statement.label} type="button" role="tab" aria-selected={activeStatement === index} aria-controls={`statement-${index}`} id={`statement-tab-${index}`} onClick={() => setActiveStatement(index)}>{statement.label}<span aria-hidden="true">↗</span></button>)}</div>
            {statements.map((statement, index) => <article key={statement.label} id={`statement-${index}`} role="tabpanel" aria-labelledby={`statement-tab-${index}`} hidden={activeStatement !== index}><span className="statement-watermark" aria-hidden="true">0{index + 1}</span><h3>{statement.title}</h3><p>{statement.text}</p></article>)}
          </div>
        </section>

        <section className="pillars-section">
          <SectionIndex><span>03 / NOSSOS PILARES</span><span>CLIQUE PARA MOVIMENTAR</span></SectionIndex>
          <div className="interactive-stage" data-reveal>
            <div className="stage-tabs" role="tablist" aria-label="Pilares do Coletivo Subsolo">{pillars.map((pillar, index) => <button key={pillar.title} type="button" role="tab" aria-selected={activePillar === index} aria-controls={`pillar-${index}`} id={`pillar-tab-${index}`} onClick={() => setActivePillar(index)}><span>{pillar.index}</span><strong>{pillar.title}</strong></button>)}</div>
            {pillars.map((pillar, index) => <article key={pillar.title} className="stage-panel" id={`pillar-${index}`} role="tabpanel" aria-labelledby={`pillar-tab-${index}`} hidden={activePillar !== index}><span className="stage-ghost" aria-hidden="true">{pillar.index}</span><p className="mono-label">{pillar.subtitle}</p><h3>{pillar.title}</h3><p>{pillar.text}</p></article>)}
          </div>
          <Marquee reverse>PERTENCIMENTO · ACESSO · PENSAMENTO CRÍTICO · INDEPENDÊNCIA · SEGURANÇA · ACOLHIMENTO · SOLIDARIEDADE</Marquee>
        </section>

        <section className="fronts-section" id="atuacao">
          <SectionIndex light><span>04 / NOSSA ATUAÇÃO</span><span>DA PISTA AO ARQUIVO</span></SectionIndex>
          <div className="fronts-lead"><h2 data-reveal>O EVENTO É A PARTE VISÍVEL.</h2><p data-reveal>Por trás dele existe curadoria, circulação, memória, cuidado e uma rede organizada para produzir continuidade.</p></div>
          <div className="front-deck" data-reveal>
            <div className="front-selector" role="tablist" aria-label="Frentes de atuação">{fronts.map((front, index) => <button key={front.number} type="button" role="tab" aria-selected={activeFront === index} aria-controls={`front-${index}`} id={`front-tab-${index}`} onClick={() => setActiveFront(index)}><span>{front.number}</span><strong>{front.title}</strong><i aria-hidden="true">↗</i></button>)}</div>
            <div className="front-panels">{fronts.map((front, index) => <article key={front.number} id={`front-${index}`} role="tabpanel" aria-labelledby={`front-tab-${index}`} hidden={activeFront !== index}><span className="front-giant" aria-hidden="true">{front.number}</span><h3>{front.title}</h3><p>{front.text}</p></article>)}</div>
          </div>
        </section>

        <section className="process-section">
          <SectionIndex><span>05 / COMO FAZEMOS</span><span>INDEPENDÊNCIA TAMBÉM EXIGE MÉTODO</span></SectionIndex>
          <div className="process-console" data-reveal>
            <div className="process-line" role="tablist" aria-label="Etapas do processo do coletivo">{processSteps.map(([number, title], index) => <button key={number} type="button" role="tab" aria-selected={activeProcess === index} aria-controls={`process-${index}`} id={`process-tab-${index}`} onClick={() => setActiveProcess(index)}><span>{number}</span><i /><strong>{title}</strong></button>)}</div>
            {processSteps.map(([number, title, text], index) => <article key={number} id={`process-${index}`} role="tabpanel" aria-labelledby={`process-tab-${index}`} hidden={activeProcess !== index}><span className="process-number">{number}</span><div><p className="mono-label">ETAPA ATIVA</p><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </section>

        <section className={`territory-section${routeReversed ? " is-reversed" : ""}`}>
          <div className="territory-copy" data-reveal><p className="eyebrow">06 / NOSSO TERRITÓRIO</p><h2>ITAPEVI PRIMEIRO. ZONA OESTE NO HORIZONTE.</h2><p>Nosso contra-fluxo amplia o mapa cultural da região. Quando artistas encontram estrutura, o público encontra pertencimento e a cidade produz memória, o território deixa de ser visto apenas como passagem.</p></div>
          <div className="route-machine" data-reveal><div className="route-screen mono-label"><span>LINHA 8–DIAMANTE</span><strong>{routeReversed ? "DESTINO: ITAPEVI" : "FLUXO HABITUAL"}</strong></div><div className="route-track" aria-hidden="true"><span>CAPITAL</span><i><b /></i><span>ITAPEVI</span></div><p aria-live="polite">{routeReversed ? "O ponto de partida também virou destino." : "A cena ainda é empurrada para o centro."}</p><button type="button" onClick={() => setRouteReversed((current) => !current)}>{routeReversed ? "RESTAURAR FLUXO" : "INVERTER O FLUXO"}<span aria-hidden="true">→</span></button></div>
        </section>

        <section className="team-section" id="organizacao">
          <SectionIndex light><span>07 / QUEM ORGANIZA</span><span>NÚCLEO DO COLETIVO</span></SectionIndex>
          <div className="team-heading"><h2 data-reveal>O SUBSOLO É CONSTRUÍDO POR PESSOAS.</h2><p className="mono-label" data-reveal>MOVA O CURSOR / TOQUE PARA VER</p></div>
          <div className="team-grid">{team.map((member) => <TiltCard member={member} key={member.name} />)}</div>
        </section>

        <section className="manifesto-section" id="manifesto">
          <img className="crest" src={crest} alt="Brasão do Coletivo Subsolo" data-reveal />
          <div className="manifesto-copy"><p className="eyebrow" data-reveal>08 / MANIFESTO</p><h2><span data-reveal>PERTENCIMENTO NASCE</span><span data-reveal>QUANDO ALGUÉM OLHA</span><span className="manifesto-acid" data-reveal>PARA ESTA CIDADE</span><span data-reveal>E DIZ: ISTO TAMBÉM</span><span data-reveal>FALA COMIGO.</span></h2><p data-reveal>O Subsolo é uma descida para dentro de Itapevi, uma pista para quem sempre atravessou longe demais e uma promessa de continuidade. Existe noite, ruído, cultura e futuro aqui.</p><a className="text-link" href={`${import.meta.env.BASE_URL}manifesto-coletivo-subsolo.pdf`} target="_blank" rel="noreferrer">LER O MANIFESTO COMPLETO ↗</a></div>
        </section>

        <section className="partnership-section" id="parcerias">
          <div className="partnership-code" aria-hidden="true">871523</div>
          <div className="partnership-main" data-reveal><p className="eyebrow">09 / CONSTRUA COM O SUBSOLO</p><h2>UMA REDE CRESCE QUANDO ENCONTRA QUEM QUEIRA SUSTENTÁ-LA.</h2><p>Construímos com artistas, produtores, espaços culturais, bares, comércios, marcas, instituições e iniciativas sociais — com responsabilidades e contrapartidas claras.</p><a className="button-link button-link--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">FALAR COM O COLETIVO ↗</a></div>
          <div className="partnership-data mono-label" data-reveal><span>ARTISTAS</span><strong>CIRCULAÇÃO</strong><span>ESPAÇOS</span><strong>ESTRUTURA</strong><span>INICIATIVAS</span><strong>COLABORAÇÃO</strong><span>TERRITÓRIO</span><strong>CONTINUIDADE</strong></div>
        </section>
      </main>

      <footer><img src={logoWhite} alt="Coletivo Subsolo" /><p>ITAPEVI / ZONA OESTE DE SÃO PAULO</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@ocoletivosubsolo ↗</a></footer>
    </>
  );
}
