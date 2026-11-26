"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type SelectProps = {
  id: string;
  name: string;
  options: readonly string[];
  placeholder: string;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange?: (value: string) => void;
};

/**
 * Themed, accessible dropdown (listbox pattern). Replaces the OS-drawn native <select>.
 * Keyboard: Enter/Space/Arrows open, Arrows/Home/End move, Enter/Space select, Esc closes, Tab closes.
 * A hidden input carries the value so it works inside regular <form> submissions.
 */
export function Select({ id, name, options, placeholder, defaultValue = "", invalid, describedBy, onChange }: SelectProps) {
  const listId = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Close when clicking/tapping outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function openMenu() {
    const i = options.indexOf(value);
    setActive(i >= 0 ? i : 0);
    setOpen(true);
  }

  function choose(v: string) {
    setValue(v);
    onChange?.(v);
    setOpen(false);
    button.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(options[active]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={root} className="relative mt-2">
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-left transition-colors hover:border-white/25 focus:border-brand-electric focus:outline-none aria-expanded:border-brand-electric aria-[invalid=true]:border-red-400"
      >
        <span className={value ? "text-white" : "text-slate-500"}>{value || placeholder}</span>
        <ChevronDown
          aria-hidden
          className={`size-4 shrink-0 text-brand-electric transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={placeholder}
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/10 bg-navy-900/95 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          {options.map((opt, i) => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(opt)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                  i === active ? "bg-brand-electric/15 text-white" : "text-slate-300"
                }`}
              >
                {opt}
                {selected && <Check aria-hidden className="size-4 text-brand-electric" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
