import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BEHAVIORS } from "@/lib/content/behaviors";
import type { Field, TableColumn } from "@/lib/content/types";
import { isAnswered, type ResponseMap } from "@/lib/responses";

type Props = {
  field: Field;
  responses: ResponseMap;
  onChange: (key: string, value: unknown) => void;
};

type TableRow = Record<string, string>;

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asRows(v: unknown): TableRow[] {
  return Array.isArray(v) ? (v as TableRow[]) : [];
}

function CarriedBadge() {
  return (
    <span className="ml-2 rounded-full bg-vault/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest">
      carried over
    </span>
  );
}

function FieldLabel({
  htmlFor,
  children,
  carried,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  carried?: boolean | undefined;
}) {
  return (
    <Label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold leading-snug text-ink">
      <span>{children}</span>
      {carried ? <CarriedBadge /> : null}
    </Label>
  );
}

export function WorkbookField({ field, responses, onChange }: Props) {
  const own = responses[field.key];
  const prefillKey = "prefillFrom" in field ? field.prefillFrom : undefined;
  const carriedValue = prefillKey ? responses[prefillKey] : undefined;
  const useCarried = !isAnswered(own) && isAnswered(carriedValue);
  const value = useCarried ? carriedValue : own;

  if (field.kind === "short") {
    return (
      <div>
        <FieldLabel htmlFor={field.key} carried={useCarried}>
          {field.label}
        </FieldLabel>
        <Input
          id={field.key}
          value={asString(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="bg-paper"
        />
      </div>
    );
  }

  if (field.kind === "long") {
    return (
      <div>
        <FieldLabel htmlFor={field.key} carried={useCarried}>
          {field.label}
        </FieldLabel>
        <Textarea
          id={field.key}
          rows={field.rows ?? 4}
          value={asString(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="bg-paper leading-relaxed"
        />
      </div>
    );
  }

  if (field.kind === "select") {
    return (
      <div>
        <FieldLabel carried={useCarried}>{field.label}</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {field.options.map((opt) => {
            const active = asString(value) === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(field.key, active ? "" : opt)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-forest bg-forest text-forest-foreground"
                    : "border-rule bg-paper text-ink hover:border-forest"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.kind === "checklist") {
    const current = Array.isArray(value) ? (value as string[]) : [];
    const known = new Set(field.options);
    const otherText = current.find((c) => !known.has(c)) ?? "";
    const toggle = (opt: string) => {
      const next = current.includes(opt)
        ? current.filter((c) => c !== opt)
        : [...current, opt];
      onChange(field.key, next);
    };
    return (
      <div>
        <FieldLabel carried={useCarried}>{field.label}</FieldLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {field.options.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-start gap-2 rounded-md border border-rule bg-paper px-3 py-2 text-sm"
            >
              <Checkbox
                checked={current.includes(opt)}
                onCheckedChange={() => toggle(opt)}
                className="mt-0.5"
              />
              <span className="leading-snug">{opt}</span>
            </label>
          ))}
        </div>
        {field.other ? (
          <Input
            className="mt-2 bg-paper"
            placeholder="Something else..."
            value={otherText}
            onChange={(e) => {
              const rest = current.filter((c) => known.has(c));
              onChange(field.key, e.target.value ? [...rest, e.target.value] : rest);
            }}
          />
        ) : null}
      </div>
    );
  }

  if (field.kind === "agree") {
    const current = (value ?? {}) as Record<string, string>;
    const choices = field.choices ?? (["Agree", "Disagree"] as [string, string]);
    const yesCount = field.statements.filter((_, i) => current[String(i)] === choices[0]).length;
    const answered = field.statements.filter((_, i) => current[String(i)]).length;
    const band = field.bands
      ? [...field.bands].sort((a, b) => b.min - a.min).find((b) => yesCount >= b.min)
      : undefined;

    return (
      <div>
        {field.label ? <FieldLabel>{field.label}</FieldLabel> : null}
        <div className="divide-y divide-rule overflow-hidden rounded-md border border-rule bg-paper">
          {field.statements.map((s, i) => {
            const key = String(i);
            const pick = current[key];
            return (
              <div
                key={key}
                className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm leading-snug">{s}</span>
                <div className="flex shrink-0 gap-1.5">
                  {choices.map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() =>
                        onChange(field.key, {
                          ...current,
                          [key]: pick === choice ? "" : choice,
                        })
                      }
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                        pick === choice
                          ? "border-forest bg-forest text-forest-foreground"
                          : "border-rule text-muted-foreground hover:border-forest"
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {field.score ? (
          <div className="mt-2 rounded-md border border-forest/25 bg-vault/15 px-4 py-3">
            <p className="text-sm font-semibold text-forest">
              {choices[0]}: {yesCount} of {field.statements.length}
              <span className="ml-2 font-normal text-muted-foreground">
                ({answered} of {field.statements.length} answered)
              </span>
            </p>
            {band ? (
              <p className="mt-1 text-sm leading-relaxed text-ink">
                <span className="font-semibold">{band.label}. </span>
                {band.text}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return <WorkbookTable field={field} value={value} onChange={onChange} carried={useCarried} />;
}


function WorkbookTable({
  field,
  value,
  onChange,
  carried,
}: {
  field: Extract<Field, { kind: "table" }>;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  carried?: boolean | undefined;
}) {
  const [showExamples, setShowExamples] = useState(false);
  const saved = asRows(value);
  const rowCount = Math.max(field.rows, saved.length);
  const rows: TableRow[] = Array.from({ length: rowCount }, (_, i) => saved[i] ?? {});

  const update = (rowIndex: number, colKey: string, cell: string) => {
    const next = rows.map((r, i) => (i === rowIndex ? { ...r, [colKey]: cell } : { ...r }));
    onChange(field.key, next);
  };

  const addRow = () => onChange(field.key, [...rows, {}]);
  const removeRow = (i: number) => onChange(field.key, rows.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <FieldLabel carried={carried}>{field.label}</FieldLabel>
        {field.examples?.length ? (
          <button
            type="button"
            onClick={() => setShowExamples((s) => !s)}
            className="text-xs font-semibold text-forest underline underline-offset-4"
          >
            {showExamples ? "Hide examples" : field.examplesTitle ?? "Show examples"}
          </button>
        ) : null}
      </div>

      {showExamples && field.examples ? (
        <div className="mb-3 space-y-2 rounded-md border border-dashed border-forest/40 bg-vault/10 p-3">
          {field.examples.map((ex) => (
            <p key={ex.label} className="text-xs leading-relaxed text-ink">
              <span className="font-semibold">{ex.label}: </span>
              {ex.text}
            </p>
          ))}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-md border border-rule bg-paper">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="bg-forest/5">
              {field.columns.map((c) => (
                <th
                  key={c.key}
                  className="border-b border-rule px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-forest"
                >
                  {c.label}
                </th>
              ))}
              <th className="w-8 border-b border-rule" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="align-top">
                {field.columns.map((c) => (
                  <td key={c.key} className="border-b border-rule/70 p-1.5">
                    <TableCell
                      column={c}
                      value={row[c.key] ?? ""}
                      onChange={(v) => update(i, c.key, v)}
                    />
                  </td>
                ))}
                <td className="border-b border-rule/70 p-1.5 text-center">
                  {rows.length > field.rows ? (
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      aria-label="Remove row"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {field.totalColumn ? <TableTotal field={field} rows={rows} /> : null}

      {field.addRows ? (
        <Button type="button" variant="ghost" size="sm" className="mt-2 text-forest" onClick={addRow}>
          <Plus className="mr-1 h-4 w-4" /> Add row
        </Button>
      ) : null}
    </div>
  );
}

function TableTotal({
  field,
  rows,
}: {
  field: Extract<Field, { kind: "table" }>;
  rows: TableRow[];
}) {
  const col = field.totalColumn!;
  const total = rows.reduce((sum, r) => {
    const n = Number.parseFloat((r[col] ?? "").replace(/[^0-9.]/g, ""));
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);
  const min = field.targetMin;
  const max = field.targetMax;
  const short = min !== undefined && total < min;
  const over = max !== undefined && total > max;

  return (
    <div
      className={`mt-2 flex flex-wrap items-baseline justify-between gap-2 rounded-md border px-4 py-3 ${
        short ? "border-destructive/40 bg-destructive/5" : "border-forest/25 bg-vault/15"
      }`}
    >
      <p className="text-sm font-semibold text-forest">
        {field.totalLabel ?? "Total"}: {Math.round(total * 10) / 10}
      </p>
      {min !== undefined ? (
        <p className="text-sm text-ink/80">
          {short
            ? `You are ${Math.round((min - total) * 10) / 10} short of the ${min}\u2013${max ?? min} hour standard. Find the hours \u2014 weekends included.`
            : over
              ? `Above the ${min}\u2013${max} hour range. Check that rest and family time are still protected.`
              : `On target for the ${min}\u2013${max ?? min} hour standard.`}
        </p>
      ) : null}
    </div>
  );
}


function TableCell({
  column,
  value,
  onChange,
}: {
  column: TableColumn;
  value: string;
  onChange: (v: string) => void;
}) {
  if (column.type === "behaviors") {
    const selected = value ? value.split("|") : [];
    return (
      <div className="flex flex-wrap gap-1">
        {BEHAVIORS.map((b) => {
          const active = selected.includes(b);
          return (
            <button
              key={b}
              type="button"
              onClick={() =>
                onChange(
                  (active ? selected.filter((s) => s !== b) : [...selected, b]).join("|"),
                )
              }
              className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                active
                  ? "border-forest bg-forest text-forest-foreground"
                  : "border-rule text-muted-foreground hover:border-forest"
              }`}
            >
              {b}
            </button>
          );
        })}
      </div>
    );
  }

  if (column.type === "long") {
    return (
      <Textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[3rem] resize-y border-0 bg-transparent px-2 py-1 text-sm shadow-none focus-visible:ring-1"
      />
    );
  }

  if (column.type === "number") {
    return (
      <Input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-20 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-1"
      />
    );
  }

  if (column.type === "date") {
    return (
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-1"
      />
    );
  }

  if (column.type === "check") {
    return (
      <div className="flex justify-center">
        <Checkbox
          checked={value === "yes"}
          onCheckedChange={(c) => onChange(c ? "yes" : "")}
          aria-label={column.label}
        />
      </div>
    );
  }

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-1"
    />
  );
}

