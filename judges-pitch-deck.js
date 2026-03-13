const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "FoodyePay Technology, Inc";
pptx.subject = "EmergencyAI 029 Judges Pitch";
pptx.title = "EmergencyAI 029";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};

const colors = {
  ink: "18222F",
  muted: "5A6573",
  blue: "1B5F86",
  navy: "18364C",
  amber: "F1A84A",
  amberDeep: "C97522",
  cream: "FBF4EA",
  paper: "FFF9F1",
  line: "D9D1C3",
  softBlue: "E8F0F5",
  softAmber: "F6E3C3",
  white: "FFFFFF",
};

const coverImage = path.join(__dirname, "output", "imagegen", "mom-i-am-here-devpost-safe.png");

function addBackground(slide) {
  slide.background = { color: colors.cream };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 7.5,
    line: { color: colors.cream, transparency: 100 },
    fill: { color: colors.cream },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.18,
    line: { color: colors.softAmber, transparency: 100 },
    fill: { color: colors.softAmber, transparency: 25 },
  });
}

function addHeader(slide, kicker, title, body) {
  slide.addText(kicker, {
    x: 0.7,
    y: 0.45,
    w: 3.6,
    h: 0.25,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: colors.blue,
    charSpace: 1.4,
    allCaps: true,
  });
  slide.addText(title, {
    x: 0.7,
    y: 0.82,
    w: 7.2,
    h: 1.1,
    fontFace: "Aptos Display",
    fontSize: 26,
    bold: true,
    color: colors.ink,
    margin: 0,
  });
  if (body) {
    slide.addText(body, {
      x: 0.7,
      y: 1.6,
      w: 7.1,
      h: 0.9,
      fontFace: "Aptos",
      fontSize: 13,
      color: colors.muted,
      breakLine: false,
      margin: 0,
      valign: "top",
    });
  }
}

function addFooter(slide, label = "EmergencyAI 029") {
  slide.addText(label, {
    x: 0.7,
    y: 7.05,
    w: 3.2,
    h: 0.2,
    fontSize: 9,
    color: colors.muted,
  });
  slide.addText("Amazon Nova AI Hackathon", {
    x: 10.2,
    y: 7.05,
    w: 2.4,
    h: 0.2,
    fontSize: 9,
    color: colors.muted,
    align: "right",
  });
}

function addCard(slide, opts) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    rectRadius: 0.12,
    line: { color: colors.line, transparency: 25, pt: 1 },
    fill: { color: opts.fill || colors.paper, transparency: opts.transparency ?? 0 },
  });
  if (opts.kicker) {
    slide.addText(opts.kicker, {
      x: opts.x + 0.2,
      y: opts.y + 0.16,
      w: opts.w - 0.4,
      h: 0.22,
      fontSize: 9,
      bold: true,
      color: colors.blue,
      allCaps: true,
      charSpace: 1.2,
    });
  }
  slide.addText(opts.title, {
    x: opts.x + 0.2,
    y: opts.y + (opts.kicker ? 0.42 : 0.2),
    w: opts.w - 0.4,
    h: 0.4,
    fontSize: opts.titleSize || 16,
    bold: true,
    color: colors.ink,
    margin: 0,
  });
  if (opts.body) {
    slide.addText(opts.body, {
      x: opts.x + 0.2,
      y: opts.y + (opts.kicker ? 0.8 : 0.62),
      w: opts.w - 0.4,
      h: opts.h - 0.92,
      fontSize: opts.bodySize || 11,
      color: colors.muted,
      margin: 0,
      valign: "top",
    });
  }
}

function addBulletList(slide, x, y, w, items, options = {}) {
  const runs = [];
  items.forEach((item) => {
    runs.push({
      text: item,
      options: {
        bullet: { indent: 14 },
        breakLine: true,
      },
    });
  });
  slide.addText(runs, {
    x,
    y,
    w,
    h: options.h || 1.9,
    fontSize: options.fontSize || 12,
    color: colors.muted,
    margin: 0,
    breakLine: false,
    paraSpaceAfterPt: 8,
  });
}

// Slide 1
{
  const slide = pptx.addSlide();
  addBackground(slide);
  slide.addText("Authority-Gated Emergency Identity Disclosure", {
    x: 0.72,
    y: 0.55,
    w: 5.2,
    h: 0.35,
    fontSize: 11,
    bold: true,
    color: colors.blue,
    allCaps: true,
    charSpace: 1.2,
  });
  slide.addText("EmergencyAI 029", {
    x: 0.72,
    y: 1.0,
    w: 5.4,
    h: 0.6,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: colors.ink,
  });
  slide.addText("Safety without exposure.", {
    x: 0.72,
    y: 1.6,
    w: 5.4,
    h: 1.2,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: colors.navy,
  });
  slide.addText(
    "An Amazon Nova-powered emergency trust protocol for vulnerable individuals across senior safety, disability support, child protection, crash response, and anti-abduction scenarios.",
    {
      x: 0.72,
      y: 2.85,
      w: 5.3,
      h: 1.3,
      fontSize: 14,
      color: colors.muted,
      margin: 0,
    }
  );
  addCard(slide, {
    x: 0.72,
    y: 4.55,
    w: 5.2,
    h: 1.38,
    kicker: "Core Promise",
    title: "Help first. Verify first. Reveal less.",
    body: "029 enters protected emergency mode, broadcasts a one-way beacon, verifies responder authority, and discloses only the minimum information needed.",
  });
  slide.addImage({ path: coverImage, x: 7.45, y: 0.85, w: 4.95, h: 5.1, rounding: true });
  slide.addText("Live demo: aioos-67.github.io/AmazonNovaAIHackathon", {
    x: 7.55,
    y: 6.25,
    w: 4.2,
    h: 0.25,
    fontSize: 10,
    color: colors.blue,
  });
  slide.addText("Video: youtu.be/k-fRJgINd4k", {
    x: 7.55,
    y: 6.52,
    w: 3.2,
    h: 0.25,
    fontSize: 10,
    color: colors.blue,
  });
  addFooter(slide);
}

// Slide 2
{
  const slide = pptx.addSlide();
  addBackground(slide);
  addHeader(
    slide,
    "Problem",
    "Current emergency systems fail in the silent gap before visible crisis.",
    "Existing tools assume the user can still interact, consent, pair a device, or safely expose identity. In real emergencies, those assumptions break."
  );
  addCard(slide, {
    x: 0.72,
    y: 2.35,
    w: 5.8,
    h: 3.45,
    kicker: "Why current solutions fail",
    title: "Conventional safety products",
    body:
      "Depend on app sessions or live connectivity\nRequire active user interaction during distress\nExpose personal information too early\nDo not verify responder authority before access\nBreak down for disoriented, unconscious, or vulnerable users",
  });
  addCard(slide, {
    x: 6.8,
    y: 2.35,
    w: 5.8,
    h: 3.45,
    kicker: "What 029 changes",
    title: "A protocol, not just an app",
    body:
      "One-way protected beaconing\nNo inbound session establishment\nAuthority-gated disclosure\nRole-specific minimal payloads\nOffline-friendly emergency operation",
    fill: colors.softBlue,
  });
  addFooter(slide);
}

// Slide 3
{
  const slide = pptx.addSlide();
  addBackground(slide);
  addHeader(
    slide,
    "Protocol Flow",
    "Five steps turn uncertainty into verified intervention.",
    "The product logic is simple enough to demo and strong enough to map to a defensible patent structure."
  );

  const steps = [
    ["01", "Detect risk", "Confusion, crash, panic, separation, or caregiver-confirmed distress"],
    ["02", "Enter emergency mode", "Protected read-only state with no open inbound session"],
    ["03", "Broadcast beacon", "Nonce, region, agent type, and public-key hash only"],
    ["04", "Verify authority", "Responder must prove role, issuer, and jurisdiction"],
    ["05", "Release minimum", "Only role-specific, purpose-bound emergency data is disclosed"],
  ];

  steps.forEach((step, idx) => {
    const x = 0.75 + idx * 2.45;
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 2.6,
      w: 2.05,
      h: 2.3,
      rectRadius: 0.12,
      line: { color: colors.line, transparency: 20, pt: 1 },
      fill: { color: idx === 2 ? colors.softAmber : colors.paper },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.18,
      y: 2.82,
      w: 0.42,
      h: 0.42,
      line: { color: colors.navy, transparency: 100 },
      fill: { color: colors.navy },
    });
    slide.addText(step[0], {
      x: x + 0.18,
      y: 2.9,
      w: 0.42,
      h: 0.16,
      align: "center",
      fontSize: 9,
      bold: true,
      color: colors.white,
      margin: 0,
    });
    slide.addText(step[1], {
      x: x + 0.18,
      y: 3.38,
      w: 1.66,
      h: 0.45,
      fontSize: 14,
      bold: true,
      color: colors.ink,
      margin: 0,
    });
    slide.addText(step[2], {
      x: x + 0.18,
      y: 3.9,
      w: 1.7,
      h: 0.8,
      fontSize: 10.5,
      color: colors.muted,
      margin: 0,
    });
    if (idx < steps.length - 1) {
      slide.addShape(pptx.ShapeType.chevron, {
        x: x + 2.0,
        y: 3.45,
        w: 0.28,
        h: 0.28,
        line: { color: colors.blue, transparency: 100 },
        fill: { color: colors.blue },
      });
    }
  });

  addFooter(slide);
}

// Slide 4
{
  const slide = pptx.addSlide();
  addBackground(slide);
  addHeader(
    slide,
    "Use Cases",
    "One protocol supports multiple emergency contexts.",
    "029 is strong because the same trust logic carries across vulnerable-user scenarios without becoming a generic assistant."
  );
  const cards = [
    ["Senior safety", "Disorientation, wandering, memory breakdown, caregiver escalation"],
    ["Disability support", "Low-interaction emergencies, mobility and sensory constraints"],
    ["Child protection", "Separation, guardian notification, reunification workflows"],
    ["Crash response", "Unconscious users, split disclosure for EMT and police"],
    ["Anti-abduction", "Coercion-aware emergency signaling and restricted exposure"],
    ["Public safety", "Role-specific packets for police, fire, EMT, and service agents"],
  ];
  cards.forEach((card, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    addCard(slide, {
      x: 0.72 + col * 4.07,
      y: 2.28 + row * 1.75,
      w: 3.7,
      h: 1.42,
      kicker: row === 0 ? "Deployment" : "Scenario",
      title: card[0],
      body: card[1],
      bodySize: 10.5,
    });
  });
  addFooter(slide);
}

// Slide 5
{
  const slide = pptx.addSlide();
  addBackground(slide);
  addHeader(
    slide,
    "Amazon Nova Stack",
    "Four Nova capabilities make the patent feel like a real product.",
    "The judges should be able to see exactly why this is a Nova project rather than a generic model wrapper."
  );

  const stack = [
    ["Nova 2 Sonic", "Calm voice reassurance and low-cognitive-load interaction"],
    ["Nova 2 Lite", "Risk scoring, mode shifts, policy and escalation decisions"],
    ["Nova Multimodal Embeddings", "Retrieve IDs, medications, care plans, and memory anchors"],
    ["Nova Act", "Run caregiver, follow-up, and public-service workflows after verification"],
  ];

  stack.forEach((item, idx) => {
    addCard(slide, {
      x: 0.8,
      y: 2.2 + idx * 1.05,
      w: 5.2,
      h: 0.9,
      kicker: idx === 0 ? "Nova Capability" : undefined,
      title: item[0],
      body: item[1],
      titleSize: 15,
      bodySize: 10.5,
      fill: idx % 2 === 0 ? colors.paper : colors.softBlue,
    });
  });

  addCard(slide, {
    x: 6.55,
    y: 2.2,
    w: 5.85,
    h: 3.9,
    kicker: "Why this scores well",
    title: "Technical depth + impact + novelty",
    body:
      "Technical implementation:\nA clear multi-model operating chain with explicit protocol logic.\n\nEnterprise and community impact:\nApplicable across healthcare, public safety, caregivers, and vulnerable-user protection.\n\nCreativity:\nFrames AI as a verified emergency trust layer instead of another assistant.",
    fill: colors.softAmber,
  });
  addFooter(slide);
}

// Slide 6
{
  const slide = pptx.addSlide();
  addBackground(slide);
  addHeader(
    slide,
    "Closing",
    "EmergencyAI 029 is a protocol-driven safety product with a strong demo surface.",
    "It is memorable because the product promise is concrete: help can arrive without exposing everything."
  );
  addCard(slide, {
    x: 0.72,
    y: 2.3,
    w: 4.0,
    h: 2.5,
    kicker: "Core Claim",
    title: "Authority before disclosure",
    body: "029 only releases useful emergency data after responder identity, role, and jurisdiction have been verified.",
    fill: colors.softBlue,
  });
  addCard(slide, {
    x: 4.95,
    y: 2.3,
    w: 3.45,
    h: 2.5,
    kicker: "Demo Assets",
    title: "Ready for judges",
    body: "Interactive site\nConcept video\nVoiceover\nGitHub repo\nDevpost submission",
  });
  addCard(slide, {
    x: 8.65,
    y: 2.3,
    w: 3.95,
    h: 2.5,
    kicker: "Ask",
    title: "See the flow live",
    body: "Use the site to switch scenarios, inspect responder payloads, and understand the end-to-end disclosure chain in under a minute.",
    fill: colors.softAmber,
  });
  addBulletList(slide, 0.82, 5.3, 7.3, [
    "Patent framing: authority-gated, non-connective, minimal disclosure",
    "Product framing: emergency trust agent for vulnerable individuals",
    "Nova framing: voice, reasoning, multimodal retrieval, and action in one system",
  ], { h: 1.2, fontSize: 12 });
  slide.addText("Live site", {
    x: 8.7,
    y: 5.28,
    w: 1.2,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: colors.blue,
  });
  slide.addText("https://aioos-67.github.io/AmazonNovaAIHackathon/", {
    x: 8.7,
    y: 5.55,
    w: 3.2,
    h: 0.42,
    fontSize: 10.5,
    color: colors.navy,
  });
  slide.addText("Video", {
    x: 8.7,
    y: 6.08,
    w: 1.2,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: colors.blue,
  });
  slide.addText("https://youtu.be/k-fRJgINd4k", {
    x: 8.7,
    y: 6.34,
    w: 2.6,
    h: 0.2,
    fontSize: 10.5,
    color: colors.navy,
  });
  addFooter(slide);
}

const outPath = path.join(__dirname, "output", "EmergencyAI-029-judges-pitch.pptx");
pptx.writeFile({ fileName: outPath });
