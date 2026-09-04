// Generates public/resume.pdf — a one-page placeholder CV.
// Replace with the real CV when available.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public");
mkdirSync(outDir, { recursive: true });

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const lines = [
  [24, 700, "Umesh Santhusha"],
  [12, 400, "UI/UX Developer - Frontend Developer - Creative Coder"],
  [11, 400, "santhushaumesh2@gmail.com | 071 5346 057 | Matara, Sri Lanka"],
  [11, 400, "github.com/umeshsanthusha | linkedin.com/in/umesh-santhusha"],
  [14, 600, "Profile"],
  [11, 400, "IT undergraduate and UI/UX developer crafting responsive, user-centric"],
  [11, 400, "web experiences that blend aesthetics with functionality."],
  [14, 600, "Experience"],
  [12, 600, "IT Data Entry Intern - Chathura Enterprises PVT LTD (Jan 2024 - Jun 2024)"],
  [11, 400, "Real-time ERP systems, database management, network troubleshooting,"],
  [11, 400, "Windows systems support, hardware diagnostics."],
  [14, 600, "Education"],
  [12, 600, "Higher National Diploma in IT - SLIATE Galle (2024 - Present)"],
  [11, 400, "Advanced Level - Athuraliya National School (2022)"],
  [11, 400, "Ordinary Level - Athuraliya National School (2017)"],
  [14, 600, "Skills"],
  [11, 400, "React, TypeScript, Tailwind CSS, Node.js, Express, MySQL, Supabase,"],
  [11, 400, "Firebase, JWT, REST APIs - plus pencil sketching and digital illustration."],
];

const contentLines = ["BT"];
let y = 780;
for (const [size, weight, text] of lines) {
  contentLines.push(`/${weight === 600 ? "F2" : "F1"} ${size} Tf`, `1 0 0 1 56 ${y} Tm`, `(${esc(text)}) Tj`);
  y -= size >= 14 ? 30 : size >= 12 ? 24 : 17;
}
contentLines.push("ET");
const stream = contentLines.join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

writeFileSync(join(outDir, "resume.pdf"), pdf, "latin1");
console.log("Wrote public/resume.pdf");
