/**
 * ContentAI - AI Content Growth Agent SaaS
 * Quick Start Script
 *
 * Run: node start.js
 */

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  purple: "\x1b[35m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function log(msg, color = colors.reset) {
  console.log(`${color}${msg}${colors.reset}`);
}

function banner() {
  console.log();
  log("╔════════════════════════════════════════════════╗", colors.purple);
  log("║     ContentAI - AI Content Growth Agent        ║", colors.purple);
  log("║     Full-Stack Agentic SaaS Platform           ║", colors.purple);
  log("╚════════════════════════════════════════════════╝", colors.purple);
  console.log();
}

function checkEnv() {
  const envPath = path.join(__dirname, "backend", ".env");
  if (!fs.existsSync(envPath)) {
    log("⚠️  backend/.env not found. Copying from .env.example...", colors.yellow);
    const examplePath = path.join(__dirname, ".env.example");
    if (fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath);
    }
  }

  const env = fs.readFileSync(envPath, "utf8");
  if (env.includes("your_anthropic_api_key_here")) {
    log("⚠️  WARNING: Set your ANTHROPIC_API_KEY in backend/.env", colors.yellow);
    log("   Get your key at: https://console.anthropic.com", colors.yellow);
    console.log();
  }
}

function startProcess(name, command, args, cwd, color) {
  const proc = spawn(command, args, {
    cwd,
    shell: true,
    stdio: "pipe",
  });

  proc.stdout.on("data", (data) => {
    data
      .toString()
      .split("\n")
      .filter(Boolean)
      .forEach((line) => {
        process.stdout.write(`${color}[${name}]${colors.reset} ${line}\n`);
      });
  });

  proc.stderr.on("data", (data) => {
    data
      .toString()
      .split("\n")
      .filter(Boolean)
      .forEach((line) => {
        if (!line.includes("DeprecationWarning") && !line.includes("ExperimentalWarning")) {
          process.stdout.write(`${colors.red}[${name}]${colors.reset} ${line}\n`);
        }
      });
  });

  proc.on("close", (code) => {
    if (code !== 0) {
      log(`\n[${name}] Process exited with code ${code}`, colors.red);
    }
  });

  return proc;
}

banner();
checkEnv();

log("Starting ContentAI...\n", colors.bright);
log("  Backend API  → http://localhost:3001", colors.cyan);
log("  Frontend     → http://localhost:3000", colors.green);
log("  API Health   → http://localhost:3001/api/health", colors.cyan);
console.log();
log("Press Ctrl+C to stop all services\n", colors.yellow);
log("─".repeat(50), colors.purple);
console.log();

const backendDir = path.join(__dirname, "backend");
const frontendDir = path.join(__dirname, "frontend");

const backend = startProcess(
  "API",
  "node",
  ["src/index.js"],
  backendDir,
  colors.cyan
);

// Small delay before starting frontend
setTimeout(() => {
  const frontend = startProcess(
    "UI ",
    "npx",
    ["next", "dev", "-p", "3000"],
    frontendDir,
    colors.green
  );

  process.on("SIGINT", () => {
    log("\n\nShutting down ContentAI...", colors.yellow);
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}, 1000);
