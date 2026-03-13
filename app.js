const baseStages = [
  {
    index: "01",
    id: "daily",
    name: "Daily Companion Mode",
    tagline: "Voice assistance before any crisis signal exists.",
    description:
      "The system starts as a low-friction companion for reminders, appointments, family contact, and familiar reassurance. Nothing is disclosed. Nothing is broadcast.",
    bullets: [
      "Default state is zero disclosure",
      "Routine voice support keeps the interaction natural",
      "Emergency trust logic stays dormant until risk conditions appear",
    ],
    visualMode: "idle",
    logs: [
      {
        title: "STATUS: NORMAL",
        body: "Routine assistance is available locally and disclosure remains locked.",
      },
      {
        title: "DISCLOSURE POLICY",
        body: "No identity or medical information is shared in daily mode.",
      },
    ],
  },
  {
    index: "02",
    id: "trigger",
    name: "Emergency Mode Activation",
    tagline: "The device enters a read-only state when risk is detected.",
    description:
      "Emergency mode can be triggered by fall detection, loss of motion, abnormal biometrics, manual activation, or caregiver confirmation. Once active, the system becomes broadcast-only.",
    bullets: [
      "No pairing or interactive session is allowed",
      "The agent switches into read-only broadcast state",
      "The user does not need to complete a complex interaction",
    ],
    visualMode: "arming",
    logs: [
      {
        title: "TRIGGER RECEIVED",
        body: "Multiple risk signals exceeded the emergency threshold.",
      },
      {
        title: "MODE SHIFT",
        body: "Emergency Identity Agent entered protected, non-connective state.",
      },
    ],
  },
  {
    index: "03",
    id: "beacon",
    name: "Protected Beacon Broadcast",
    tagline: "A passive beacon is broadcast without opening an unsafe connection.",
    description:
      "The beacon exposes protocol metadata, nonce, region identifier, and public-key hash. It does not expose the user's full identity and does not accept inbound data exchange.",
    bullets: [
      "BLE-style low-power broadcast",
      "No inbound communication accepted",
      "Designed for replay, spoofing, and MITM resistance",
    ],
    visualMode: "broadcast",
    logs: [
      {
        title: "BEACON EMITTED",
        body: "Protocol version, region ID, agent type, time-bound nonce, and public-key hash transmitted.",
      },
      {
        title: "CONNECTION POLICY",
        body: "Inbound sessions remain disabled. Broadcast is one-way until authority is proven.",
      },
    ],
  },
  {
    index: "04",
    id: "verify",
    name: "Authority Verification",
    tagline: "The responder agent must prove who it is before anything useful is released.",
    description:
      "A police, EMT, or fire responder agent presents signed credentials, jurisdiction metadata, and time-bound authorization certificates. The system checks signature validity and issuing authority before disclosure.",
    bullets: [
      "No full session establishment is required",
      "Authority must match responder role and jurisdiction",
      "Only verified public service agents may proceed",
    ],
    visualMode: "verify",
    logs: [
      {
        title: "AUTHORITY PROOF RECEIVED",
        body: "Responder presented signed identity proof and operational certificate.",
      },
      {
        title: "VALIDATION PASSED",
        body: "Jurisdiction, issuer, and responder type match emergency policy rules.",
      },
    ],
  },
  {
    index: "05",
    id: "disclose",
    name: "Minimal Purpose-Bound Disclosure",
    tagline: "Only the minimum necessary information is revealed.",
    description:
      "The disclosure engine releases role-specific information based on the responder's function. Nothing beyond the purpose at hand is exposed.",
    bullets: [
      "Role-specific data packets",
      "Time-bound, purpose-limited release",
      "No full profile is ever transmitted",
    ],
    visualMode: "broadcast",
    logs: [
      {
        title: "DISCLOSURE ENGINE",
        body: "Responder role mapped to minimal data matrix. Full profile transmission blocked.",
      },
      {
        title: "AUDIT ENTRY",
        body: "Every release is logged locally with role, timestamp, and emergency condition.",
      },
    ],
  },
];

const baseResponders = [
  {
    id: "police",
    label: "Police AI",
    title: "Police AI Agent",
    summary: "Receives identity confirmation and emergency contact context for safe pickup and coordination.",
    data: [
      "Identity confirmation token",
      "Trusted emergency contact",
      "Last safe-location anchor",
      "Behavioral distress indicator",
    ],
    rules: [
      "No medication history",
      "No unrelated medical details",
      "Time-bound response window only",
    ],
  },
  {
    id: "emt",
    label: "EMT AI",
    title: "EMT / Medical AI Agent",
    summary: "Receives only the medical facts necessary to prevent harmful treatment decisions.",
    data: [
      "Allergies",
      "Current medications",
      "Critical conditions",
      "Emergency contact",
    ],
    rules: [
      "No full identity history",
      "No family profile disclosure",
      "Only medically necessary context is released",
    ],
  },
  {
    id: "fire",
    label: "Fire AI",
    title: "Fire Department AI Agent",
    summary: "Receives environmental and mobility constraints relevant to evacuation and response.",
    data: [
      "Mobility constraints",
      "Behavioral indicators",
      "Evacuation assistance flag",
      "Emergency contact token",
    ],
    rules: [
      "No unrelated health records",
      "No broad identity profile",
      "Only mission-specific context is available",
    ],
  },
];

const scenarios = [
  {
    id: "senior",
    label: "Senior",
    tag: "Elder Care",
    title: "Disorientation and memory breakdown",
    body: "When an older adult becomes lost or confused, 029 can shift from calm guidance into verified emergency disclosure without exposing a full identity profile.",
    timeline: [
      "The older adult wanders off route and shows confusion outdoors.",
      "Emergency mode enters read-only broadcast state with no inbound session.",
      "A responder agent presents signed authority proof and jurisdiction metadata.",
      "The disclosure engine releases contact and medically relevant context by responder role.",
      "Nova Act can trigger caregiver, follow-up, and service workflows.",
    ],
    stageOverrides: {
      daily: {
        description:
          "The system starts as a gentle daily companion for reminders, appointments, familiar contacts, and reassuring voice interaction for aging users.",
      },
      trigger: {
        description:
          "Emergency mode may activate after wandering, route loops, missed return windows, fall detection, abnormal biometrics, or caregiver confirmation.",
        logs: [
          {
            title: "TRIGGER RECEIVED",
            body: "Route uncertainty, missed return window, and distress cues exceeded the senior-safety threshold.",
          },
          {
            title: "MODE SHIFT",
            body: "Emergency Identity Agent entered protected elder-response broadcast state.",
          },
        ],
      },
    },
    responderOverrides: {
      police: {
        summary: "Receives identity confirmation and trusted caregiver contact for safe recovery and pickup.",
      },
    },
  },
  {
    id: "disability",
    label: "Disability",
    tag: "Disability",
    title: "Communication barriers in urgent moments",
    body: "For users with cognitive, speech, mobility, or sensory limitations, the protocol reduces the need for complex interaction and lets verified responders obtain only the context they need.",
    timeline: [
      "A user cannot communicate clearly during a physical or sensory emergency.",
      "029 shifts into protected emergency mode without requiring complex interaction.",
      "Verified responders present authority proof matched to the accessibility support context.",
      "The system releases mobility, sensory, or medical constraints relevant to safe assistance.",
      "Nova Act can coordinate caregiver, transport, and access-support workflows.",
    ],
    stageOverrides: {
      daily: {
        description:
          "In disability-support mode, 029 acts as an accessibility-aware companion that preserves routines while learning communication limits and care context.",
      },
      trigger: {
        description:
          "Emergency mode may activate when speech becomes incoherent, mobility assistance fails, biometric stress spikes, or a support agent confirms distress.",
      },
      disclose: {
        description:
          "The disclosure engine prioritizes accessibility and safety constraints: mobility needs, sensory alerts, communication preferences, and only the minimum medical context needed.",
      },
    },
    responderOverrides: {
      fire: {
        summary: "Receives evacuation, mobility, sensory, and behavioral constraints required for safe extraction.",
        data: [
          "Mobility constraints",
          "Sensory trigger warnings",
          "Evacuation assistance flag",
          "Support contact token",
        ],
      },
    },
  },
  {
    id: "child",
    label: "Child",
    tag: "Child Safety",
    title: "Protected identity release for minors",
    body: "A child-focused implementation can disclose guardian contact, medical alerts, and safe pickup rules only to properly verified authorities.",
    timeline: [
      "A child becomes separated from guardians or enters a distress pattern in public.",
      "029 activates a protected child-safety beacon with no open inbound channel.",
      "Verified police or child-protection agents submit signed authority credentials.",
      "The engine releases guardian contact, medical alerts, and pickup rules only to the proper authority.",
      "Nova Act can initiate guardian notification and safe reunification workflows.",
    ],
    stageOverrides: {
      trigger: {
        description:
          "Emergency mode may activate through guardian-issued policy, location mismatch, panic signal, or distress detection during a separation event.",
      },
      verify: {
        description:
          "Responder verification is stricter for minors: signed authority, agency validity, jurisdiction, and child-protection policy all need to align before disclosure.",
      },
    },
    responderOverrides: {
      police: {
        summary: "Receives guardian contact, reunification instructions, and identity confirmation needed to protect and return a minor safely.",
        data: [
          "Guardian contact token",
          "Child identity confirmation",
          "Safe pickup rules",
          "Critical medical alerts",
        ],
      },
      emt: {
        summary: "Receives pediatric emergency alerts only when treatment context is medically necessary.",
      },
    },
  },
  {
    id: "crash",
    label: "Crash",
    tag: "Vehicle Crash",
    title: "Crash response without profile overexposure",
    body: "After an accident, EMT and police agents can receive role-specific emergency data while preventing unnecessary access to unrelated personal history.",
    timeline: [
      "A collision or sudden stop triggers protected emergency state.",
      "The device enters one-way broadcast mode even if the user is unconscious.",
      "Police and EMT responder agents present signed authority proof.",
      "The system splits disclosure: traffic-response facts to police, treatment facts to EMT.",
      "Nova Act can launch family notification, insurance, and follow-up workflows.",
    ],
    stageOverrides: {
      trigger: {
        description:
          "Emergency mode may activate after crash detection, abrupt deceleration, loss of consciousness, abnormal vitals, or external vehicle telemetry confirmation.",
      },
      beacon: {
        description:
          "The beacon remains connectionless even in high-stress accident response. It provides enough metadata for rapid responder recognition without exposing the user's broader profile.",
      },
    },
    responderOverrides: {
      police: {
        data: [
          "Identity confirmation token",
          "Emergency contact",
          "Vehicle incident flag",
          "Last known travel context",
        ],
      },
      emt: {
        data: [
          "Allergies",
          "Medications",
          "Critical trauma conditions",
          "Emergency contact",
        ],
      },
    },
  },
  {
    id: "anti-abduction",
    label: "Anti-Abduction",
    tag: "Anti-Abduction",
    title: "Authority-gated rescue signaling",
    body: "A constrained distress beacon can support anti-kidnapping workflows by broadcasting protected emergency markers without creating an inbound hijack surface.",
    timeline: [
      "A covert trigger or anomaly policy activates a constrained distress state.",
      "029 broadcasts a protected anti-abduction beacon without accepting any inbound session.",
      "Only verified law-enforcement agents can present rescue authority credentials.",
      "The system releases the smallest set of identity and distress markers compatible with rescue.",
      "Nova Act can coordinate guardian, legal, and safe-handoff workflows.",
    ],
    stageOverrides: {
      trigger: {
        description:
          "Emergency mode may activate through covert trigger gesture, route anomaly, forced movement pattern, caregiver override, or anti-abduction policy threshold.",
      },
      disclose: {
        description:
          "In anti-abduction mode, 029 releases the least possible information compatible with rescue. The goal is safe recovery without creating a surveillance or hijack vector.",
      },
    },
    responderOverrides: {
      police: {
        summary: "Receives rescue-specific identity confirmation, distress markers, and emergency contact context under the tightest disclosure controls.",
        rules: [
          "No full personal profile",
          "No unrelated medical records",
          "Only rescue-authorized payload is released",
        ],
      },
    },
  },
  {
    id: "public-safety",
    label: "Public Safety",
    tag: "Public Safety",
    title: "One protocol, many responder roles",
    body: "Police, EMT, fire, caregivers, and public-service agents can each receive a different minimal packet shaped by purpose, authority, and time limit.",
    timeline: [
      "A public-safety event creates a vulnerable-user emergency condition.",
      "029 enters protected broadcast mode using a common emergency trust protocol.",
      "Different responder agents present signed authority tied to their role and jurisdiction.",
      "Each responder receives a distinct minimal disclosure packet.",
      "Nova Act routes the downstream workflow to the right institutions and caregivers.",
    ],
  },
];

const architecture = [
  {
    title: "Nova 2 Sonic",
    body: "Handles natural spoken reassurance, low-cognitive-load prompts, and real-time voice interaction when the user is anxious or confused.",
    bullets: ["Speech-first reassurance", "Reduced panic through calm phrasing", "Voice continuity during escalation"],
  },
  {
    title: "Nova 2 Lite",
    body: "Evaluates risk state, mode changes, disclosure thresholds, and next-best actions across routine, confusion, and emergency conditions.",
    bullets: ["Risk assessment", "Escalation logic", "Policy selection"],
  },
  {
    title: "Nova Multimodal Embeddings",
    body: "Retrieves medication labels, IDs, care plans, family photos, and memory anchors so the agent has context without exposing everything.",
    bullets: ["Document retrieval", "Medication and ID context", "Memory anchor lookup"],
  },
  {
    title: "Nova Act",
    body: "Automates caregiver notifications, appointment follow-ups, public-service forms, and responder workflows after verified escalation.",
    bullets: ["Care portal automation", "Follow-up scheduling", "Service workflow execution"],
  },
];

const modeSelector = document.querySelector("#mode-selector");
const responderTabs = document.querySelector("#responder-tabs");
const architectureGrid = document.querySelector("#architecture-grid");
const scenarioGrid = document.querySelector("#scenario-grid");
const scenarioSwitcher = document.querySelector("#scenario-switcher");
const timeline = document.querySelector("#timeline");

const stageIndex = document.querySelector("#stage-index");
const stageTitle = document.querySelector("#stage-title");
const stageTagline = document.querySelector("#stage-tagline");
const stageDescription = document.querySelector("#stage-description");
const stageBullets = document.querySelector("#stage-bullets");
const signalVisual = document.querySelector("#signal-visual");
const logList = document.querySelector("#log-list");

const responderTitle = document.querySelector("#responder-title");
const responderSummary = document.querySelector("#responder-summary");
const responderData = document.querySelector("#responder-data");
const responderRules = document.querySelector("#responder-rules");

let activeScenario = scenarios[0].id;
let activeStage = baseStages[0].id;
let activeResponder = baseResponders[0].id;

function getScenario() {
  return scenarios.find((item) => item.id === activeScenario) || scenarios[0];
}

function getStage(stageId) {
  const base = baseStages.find((item) => item.id === stageId);
  const overrides = getScenario().stageOverrides?.[stageId] || {};
  return { ...base, ...overrides };
}

function getResponder(responderId) {
  const base = baseResponders.find((item) => item.id === responderId);
  const overrides = getScenario().responderOverrides?.[responderId] || {};
  return { ...base, ...overrides };
}

function renderScenarioSwitcher() {
  scenarioSwitcher.innerHTML = "";

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scenario-button${scenario.id === activeScenario ? " active" : ""}`;
    button.innerHTML = `<strong>${scenario.label}</strong><span>${scenario.tag}</span>`;
    button.addEventListener("click", () => {
      activeScenario = scenario.id;
      renderScenarioSwitcher();
      renderScenarios();
      renderStage();
      renderResponder();
      renderTimeline();
    });
    scenarioSwitcher.appendChild(button);
  });
}

function renderStageButtons() {
  modeSelector.innerHTML = "";

  baseStages.forEach((stage) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-button${stage.id === activeStage ? " active" : ""}`;
    button.textContent = stage.name;
    button.addEventListener("click", () => {
      activeStage = stage.id;
      renderStageButtons();
      renderStage();
    });
    modeSelector.appendChild(button);
  });
}

function renderStage() {
  const stage = getStage(activeStage);
  if (!stage) return;

  stageIndex.textContent = stage.index;
  stageTitle.textContent = stage.name;
  stageTagline.textContent = stage.tagline;
  stageDescription.textContent = stage.description;
  stageBullets.innerHTML = stage.bullets.map((item) => `<li>${item}</li>`).join("");

  signalVisual.classList.remove("broadcast", "arming", "verify");
  if (stage.visualMode === "broadcast" || stage.visualMode === "arming" || stage.visualMode === "verify") {
    signalVisual.classList.add("broadcast");
  }

  logList.innerHTML = stage.logs
    .map(
      (log) => `
        <article class="log-item">
          <strong>${log.title}</strong>
          <p>${log.body}</p>
        </article>
      `
    )
    .join("");
}

function renderResponderTabs() {
  responderTabs.innerHTML = "";

  baseResponders.forEach((responder) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `responder-button${responder.id === activeResponder ? " active" : ""}`;
    button.textContent = responder.label;
    button.addEventListener("click", () => {
      activeResponder = responder.id;
      renderResponderTabs();
      renderResponder();
    });
    responderTabs.appendChild(button);
  });
}

function renderResponder() {
  const responder = getResponder(activeResponder);
  if (!responder) return;

  responderTitle.textContent = responder.title;
  responderSummary.textContent = responder.summary;
  responderData.innerHTML = responder.data.map((item) => `<li>${item}</li>`).join("");
  responderRules.innerHTML = responder.rules.map((item) => `<li>${item}</li>`).join("");
}

function renderArchitecture() {
  architectureGrid.innerHTML = architecture
    .map(
      (item) => `
        <article class="architecture-card glass-card">
          <h3>${item.title}</h3>
          <p>${item.body}</p>
          <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderScenarios() {
  scenarioGrid.innerHTML = scenarios
    .map(
      (item) => `
        <article class="scenario-card glass-card${item.id === activeScenario ? " active-scenario" : ""}">
          <span>${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `
    )
    .join("");
}

function renderTimeline() {
  timeline.innerHTML = getScenario().timeline
    .map(
      (step, index) => `
        <div class="timeline-step">
          <span>${index + 1}</span>
          <p>${step}</p>
        </div>
      `
    )
    .join("");
}

renderScenarioSwitcher();
renderStageButtons();
renderStage();
renderResponderTabs();
renderResponder();
renderArchitecture();
renderScenarios();
renderTimeline();
