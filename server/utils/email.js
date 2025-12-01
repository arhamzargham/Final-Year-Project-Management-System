import nodemailer from 'nodemailer';

// Email configuration (SW-4, SW-5, SW-6)
let transporter;

if (process.env.NODE_ENV === 'production') {
  // Use SendGrid or Mailgun in production
  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} else {
  // Use Gmail or local SMTP for development
  transporter = nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Send email with retry mechanism (FR-6.11)
export const sendEmail = async ({ to, subject, html, text }, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"FYP Management" <noreply@bu.edu.pk>',
        to,
        subject,
        text,
        html,
      });

      console.log(`✅ Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`❌ Email attempt ${attempt} failed:`, error.message);
      
      if (attempt === retries) {
        console.error(`Failed to send email to ${to} after ${retries} attempts`);
        return { success: false, error: error.message };
      }
      
      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
};

// Email templates (FR-6.10)
export const emailTemplates = {
  proposalApproved: (studentName, projectTitle) => ({
    subject: 'Project Proposal Approved! 🎉',
    html: `
      <h2>Congratulations ${studentName}!</h2>
      <p>Your project proposal "<strong>${projectTitle}</strong>" has been approved by your supervisor.</p>
      <p>You can now proceed to the next phase of your project.</p>
      <p>Login to your dashboard to view details and next steps.</p>
    `,
  }),

  logSigned: (studentName, logNumber) => ({
    subject: `Log #${logNumber} Signed`,
    html: `
      <h2>Weekly Log Signed</h2>
      <p>Hi ${studentName},</p>
      <p>Your supervisor has signed Log #${logNumber}.</p>
      <p>Progress: ${logNumber}/24 logs completed.</p>
    `,
  }),

  defenseScheduled: (studentName, projectTitle, date, time, room) => ({
    subject: 'Defense Scheduled 📅',
    html: `
      <h2>Your Defense has been Scheduled</h2>
      <p>Hi ${studentName},</p>
      <p>Your defense for project "<strong>${projectTitle}</strong>" is scheduled:</p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Room:</strong> ${room}</li>
      </ul>
      <p>Good luck!</p>
    `,
  }),

  reminderDeadline: (studentName, task, deadline) => ({
    subject: `Reminder: ${task} Due Soon`,
    html: `
      <h2>Deadline Reminder</h2>
      <p>Hi ${studentName},</p>
      <p>This is a reminder that "<strong>${task}</strong>" is due on <strong>${deadline}</strong>.</p>
      <p>Please complete it before the deadline.</p>
    `,
  }),
};

export default {
  sendEmail,
  emailTemplates,
};
