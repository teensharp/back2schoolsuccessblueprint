export type CalendarEvent = {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  description?: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDate(value: string | undefined): value is string {
  return Boolean(value && DATE_RE.test(value.trim()));
}

function escape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function stamp(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function nextDay(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Builds an all-day .ics feed the student can import into Google Calendar. */
export function buildIcs(events: CalendarEvent[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TeenSHARP//Back-to-School Blueprint//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:My Back-to-School Blueprint",
  ];

  events.forEach((event, i) => {
    const compact = event.date.replace(/-/g, "");
    lines.push(
      "BEGIN:VEVENT",
      `UID:blueprint-${i}-${compact}@teensharp`,
      `DTSTAMP:${stamp()}`,
      `DTSTART;VALUE=DATE:${compact}`,
      `DTEND;VALUE=DATE:${nextDay(event.date).replace(/-/g, "")}`,
      `SUMMARY:${escape(event.title)}`,
      ...(event.description ? [`DESCRIPTION:${escape(event.description)}`] : []),
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(events: CalendarEvent[], filename = "my-blueprint.ics") {
  const blob = new Blob([buildIcs(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
