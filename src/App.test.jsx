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
