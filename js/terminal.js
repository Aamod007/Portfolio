/**
 * Aamod Kumar Portfolio - Interactive Cloud-Native Terminal Emulator
 * Realistic Linux/Kubernetes CLI interface with interactive easter eggs.
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalChips = document.querySelectorAll('.terminal-chip');

  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: `
<span class="cyan-text font-bold">AVAILABLE COMMANDS:</span>
  <span class="text-code">whoami</span>       : Print engineer summary and current status
  <span class="text-code">cat bio</span>      : Read personal statement and technical background
  <span class="text-code">skills</span>       : List languages, cloud tools, frameworks & databases
  <span class="text-code">projects</span>     : Print flagship production projects with MTTR metrics
  <span class="text-code">experience</span>   : View open source contributions & internship history
  <span class="text-code">awards</span>       : List honors, certifications & education details
  <span class="text-code">kubectl get</span>  : [Easter Egg] Inspect active cloud cluster telemetry
  <span class="text-code">contact</span>      : Print direct contact details & social channels
  <span class="text-code">resume</span>       : Download or preview Profile.pdf
  <span class="text-code">clear</span>        : Clear the terminal console
`,

    whoami: `
<span class="cyan-text font-bold">Aamod Kumar</span>
ML Systems Engineer & CNCF Open Source Contributor
• Organization: <span class="cyan-text">Kubernetes SIGs (Headlamp)</span>
• Education: B.Tech Computer Science & Engineering @ Lovely Professional University (2024 - 2028)
• Location: Sitapur, UP / Punjab, India
• Status: <span style="color:#10b981;">● Open to Internships, Cloud-Native & ML Engineering Collaborations</span>
`,

    bio: `
<span class="cyan-text font-bold">ABOUT ME:</span>
"Computer Science student specializing in AI & Data Engineering, building systems at the
intersection of machine learning, distributed infrastructure, and developer tooling.
Active CNCF contributor with 5+ merged PRs in kubernetes-sigs/headlamp covering frontend reliability,
process security, and large-cluster performance. Built real-time Kubernetes GPU debuggers,
network intrusion detection systems with 97% accuracy, and enterprise Azure CI/CD pipelines."
`,

    skills: `
<span class="cyan-text font-bold">TECHNICAL SKILLS MATRIX:</span>
┌──────────────────────┬────────────────────────────────────────────────────────┐
│ <span class="text-code">Languages</span>            │ Go, Python, TypeScript, JavaScript, Java, SQL          │
│ <span class="text-code">Cloud & DevOps</span>       │ Kubernetes, Docker, Azure, Azure DevOps, CI/CD, Linux  │
│ <span class="text-code">AI / ML & Data</span>       │ PyTorch, Scikit-learn, XGBoost, Zeek, Pandas, NumPy   │
│ <span class="text-code">Web & Fullstack</span>      │ React, Next.js, Node.js, FastAPI, Flask, Electron, WS  │
│ <span class="text-code">Databases</span>            │ PostgreSQL, Redis                                      │
└──────────────────────┴────────────────────────────────────────────────────────┘
`,

    projects: `
<span class="cyan-text font-bold">FLAGSHIP PROJECTS:</span>
1. <span class="cyan-text font-bold">Kube Sched Lens</span> (Go, React, Kubernetes, DRA, WebSockets)
   • GPU debugger slashing MTTR by 75% (<2s vs 15m) correlating 4+ DRA objects.
   • Streams updates across 500+ pods in &lt;50ms, saves $20k+/mo in stalled ML compute.

2. <span class="cyan-text font-bold">Cyber Defence SOC NIDS</span> (Python, XGBoost, Zeek, WebSockets)
   • 97.15% intrusion detection accuracy on 82K+ UNSW-NB15 telemetry records.
   • MITRE ATT&CK mapping across 9+ vectors; reduces triage latency by 65%+.

3. <span class="cyan-text font-bold">Azure DevOps CI/CD Pipeline</span> (Azure Data Factory, ARM, PowerShell)
   • Multi-stage ADF automation across 3 environments; 100% hardcoded secrets eliminated.

4. <span class="cyan-text font-bold">Housing Price Prediction Pipeline</span> (Python, XGBoost, Scikit-learn)
   • R² 0.920, RMSE 0.106 on 2,930 records with 82 engineered features.
`,

    experience: `
<span class="cyan-text font-bold">WORK & OPEN SOURCE CONTRIBUTIONS:</span>
• <span class="cyan-text">Kubernetes SIGs (Headlamp)</span> | Open Source Contributor (Jul 2026 - Present)
  - 5+ merged PRs for Electron app security, process ownership validation, cluster polling.
• <span class="cyan-text">Futurense Technologies</span> | Junior Data Engineer Intern (Jun 2026 - Aug 2026)
  - Automated ARM templates via Azure DevOps, eliminating 100% hardcoded secrets.
• <span class="cyan-text">Community Mentorship</span>:
  - Elite Coders Mentor (Jul 2026 - Sep 2026)
  - GirlScript Summer of Code (GSSoC) Mentor (350+ contributors)
  - Social Winter of Code (SWOC) Mentor (2 Cohorts)
`,

    awards: `
<span class="cyan-text font-bold">HONORS, CERTIFICATIONS & EDUCATION:</span>
★ <span class="text-code">Amazon ML Summer School Scholar</span> (Jun - Jul 2026) - Selected nationwide for Amazon scientist ML program
★ <span class="text-code">Top 50 Performer</span> @ Elite Coders Winter of Code '26 (ECWOC '26)
★ <span class="text-code">Oracle Cloud Infrastructure 2025</span> Certified AI Foundations Associate
★ <span class="text-code">Google Cloud Badge Holder</span> - Hands-on Cloud & Generative AI pathways
★ <span class="text-code">Education</span>: Lovely Professional University - B.Tech CSE (2024 - 2028)
`,

    contact: `
<span class="cyan-text font-bold">GET IN TOUCH:</span>
• Email    : <a href="mailto:aamoddev23@gmail.com" class="cyan-text">aamoddev23@gmail.com</a> / <a href="mailto:aamodkumar2006@gmail.com" class="cyan-text">aamodkumar2006@gmail.com</a>
• Phone    : <span class="cyan-text">+91 6392945470</span>
• LinkedIn : <a href="https://www.linkedin.com/in/aamod-kumar" target="_blank" class="cyan-text">linkedin.com/in/aamod-kumar</a>
• GitHub   : <a href="https://github.com" target="_blank" class="cyan-text">github.com (aamodkumar)</a>
• Location : Punjab & Uttar Pradesh, India
`,

    resume: `
<span class="cyan-text">Downloading resume (Profile.pdf)...</span>
<script>window.open('Profile.pdf', '_blank');</script>
`,

    'kubectl get': `
NAME                                READY   STATUS    RESTARTS   AGE    GPU-ALLOCATION
kube-sched-lens-operator-7f4c       1/1     Running   0          42d    NVIDIA A100 (x8)
soc-zeek-streamer-89db              1/1     Running   0          18d    DRA-Attached
adf-synapse-pipeline-agent-4b       1/1     Running   0          12d    Standard_D4s_v5
ml-ames-ensemble-worker-91a         1/1     Running   0          7d     CUDA-12.2
`
  };

  // Aliases
  commands['cat bio'] = commands.bio;
  commands['kubectl'] = commands['kubectl get'];
  commands['kubectl get pods'] = commands['kubectl get'];
  commands['certifications'] = commands.awards;

  function handleCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to history
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Echo user line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-prompt">aamod@lpu-node:~$</span> <span class="terminal-cmd">${escapeHtml(trimmed)}</span>`;
    terminalBody.appendChild(userLine);

    const cmdLower = trimmed.toLowerCase();

    if (cmdLower === 'clear') {
      terminalBody.innerHTML = '';
    } else if (cmdLower === 'resume') {
      const respLine = document.createElement('div');
      respLine.className = 'terminal-output';
      respLine.innerHTML = `Opening resume in new window...`;
      terminalBody.appendChild(respLine);
      window.open('Profile.pdf', '_blank');
    } else if (commands[cmdLower]) {
      const respLine = document.createElement('div');
      respLine.className = 'terminal-output';
      respLine.innerHTML = commands[cmdLower];
      terminalBody.appendChild(respLine);
    } else {
      const errLine = document.createElement('div');
      errLine.className = 'terminal-output';
      errLine.innerHTML = `<span style="color:#ef4444;">zsh: command not found: ${escapeHtml(trimmed)}</span>. Type <span class="cyan-text font-bold">help</span> to view all commands.`;
      terminalBody.appendChild(errLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      const match = Object.keys(commands).find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  });

  // Handle clickable quick-action chips
  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  // Focus input when clicking anywhere inside terminal body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
});
