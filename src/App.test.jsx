/* @vitest-environment jsdom */

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

describe("abertura do elevador", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    document.body.className = "";
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("abre as duas portas e libera a página depois da transição", () => {
    render(<App />);

    const intro = screen.getByLabelText("Entrada animada do Coletivo Subsolo");
    const trigger = screen.getByRole("button", { name: "DESCER AO SUBSOLO" });

    expect(document.body.classList.contains("intro-locked")).toBe(true);
    expect(intro.classList.contains("elevator-intro--waiting")).toBe(true);
    expect(intro.getAttribute("aria-modal")).toBe("true");
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    expect(trigger.disabled).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1900);
    });

    expect(intro.classList.contains("elevator-intro--opening")).toBe(true);

    const leftDoor = document.querySelector(".elevator-door--left");
    fireEvent.transitionEnd(leftDoor, { propertyName: "transform" });

    expect(screen.queryByLabelText("Entrada animada do Coletivo Subsolo")).toBeNull();
    expect(document.body.classList.contains("intro-locked")).toBe(false);
  });

  it("permite pular a abertura sem deixar o scroll bloqueado", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "pular entrada" }));

    expect(screen.queryByLabelText("Entrada animada do Coletivo Subsolo")).toBeNull();
    expect(document.body.classList.contains("intro-locked")).toBe(false);
  });
});

describe("conteúdo institucional", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    document.body.className = "";
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("apresenta missão, visão, atuação, processo e formas de parceria", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "pular entrada" }));

    expect(screen.getByText("MISSÃO")).toBeTruthy();
    expect(screen.getByText("VISÃO")).toBeTruthy();
    expect(screen.getAllByText("EVENTOS E ENCONTROS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AVALIAÇÃO").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "FALAR COM O COLETIVO ↗" })).toBeTruthy();
  });

  it("identifica as cinco pessoas que organizam o coletivo", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "pular entrada" }));

    ["VELARIS", "EVELYN", "RUKAS GUI", "LOUIS", "DAN"].forEach((name) => {
      expect(screen.getByText(name)).toBeTruthy();
      expect(screen.getByAltText(`Retrato de ${name}`)).toBeTruthy();
    });
  });

  it("permite explorar pilares, frentes e o contra-fluxo sem expor blocos simultâneos", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "pular entrada" }));

    fireEvent.click(screen.getByRole("tab", { name: /02MOVIMENTAR/ }));
    expect(screen.getByRole("tabpanel", { name: /02MOVIMENTAR/ })).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: /03COMUNICAÇÃO E MEMÓRIA/ }));
    expect(screen.getByRole("tabpanel", { name: /03COMUNICAÇÃO E MEMÓRIA/ })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /INVERTER O FLUXO/ }));
    expect(screen.getByText("O ponto de partida também virou destino.")).toBeTruthy();
  });

  it("oferece um controle para pausar as animações contínuas", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "pular entrada" }));

    const toggle = screen.getByRole("button", { name: "MOVIMENTO: ATIVO" });
    fireEvent.click(toggle);

    expect(document.body.classList.contains("motion-paused")).toBe(true);
    expect(screen.getByRole("button", { name: "MOVIMENTO: PAUSADO" })).toBeTruthy();
  });
});
