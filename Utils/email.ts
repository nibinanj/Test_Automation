import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
 
dotenv.config();
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendReport() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || smtpUser;
  const to = process.env.EMAIL_TO;
 
  if (!smtpHost || !smtpUser || !smtpPass || !to) {
    console.error('Missing SMTP config in env (SMTP_HOST, SMTP_USER, SMTP_PASS, EMAIL_TO).');
    process.exit(1);
  }
 
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for others
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
 
  // Find HTML report
  const reportPath = path.join(__dirname, '../../reports/playwright-report/index.html');
  const htmlExists = fs.existsSync(reportPath);
 
  const attachments: { filename: string; path: string }[] = [];
 
  // Attach whole html report if exists
  if (htmlExists) {
    attachments.push({ filename: 'playwright-report.html', path: reportPath });
  }
 
  // Attach latest screenshots from reports/test-artifacts if any
  const artifactsDir = path.join(__dirname, '../../reports/test-artifacts');
  if (fs.existsSync(artifactsDir)) {
    const files = fs.readdirSync(artifactsDir);
    files.forEach(file => {
      const full = path.join(artifactsDir, file);
      // Attach screenshot files (png), and failure videos if you want (.webm)
      if (file.endsWith('.png') || file.endsWith('.webm') || file.endsWith('.mp4')) {
        attachments.push({ filename: file, path: full });
      }
    });
  }
 
  const subject = `Playwright Test Report - ${new Date().toISOString()}`;
  const html = htmlExists
    ? `<p>Playwright tests completed. See attached report or open <i>playwright-report/index.html</i> (attached).</p>`
    : `<p>Playwright tests completed. No HTML report found.</p>`;
 
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    attachments
  });
 
  console.log('Email sent:', info.messageId);
}
 
sendReport().catch(err => {
  console.error('Failed to send report:', err);
  process.exit(1);
});
 