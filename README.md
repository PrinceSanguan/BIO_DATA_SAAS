# 📄 Resume AI Builder

**Resume AI Builder** is an intelligent resume creation platform that helps users generate professional, well-written, and ATS-friendly resumes using AI. The system takes user-inputted career information, enhances it using Google's Gemini API, and outputs a downloadable, beautifully formatted PDF resume.

---

## 🚀 Features

- ✍️ Easy-to-use form interface for entering resume details
- 🤖 AI-enhanced content via Gemini API for improved wording and clarity
- 📄 Auto-generated resume in professional PDF format
- 🧠 Smart formatting with pre-designed resume templates
- 💾 One-click PDF download functionality

---

## 🧩 Tech Stack

- **Frontend:** React / Next.js (TypeScript)
- **AI Processing:** Gemini Pro API
- **PDF Generation:** `pdf-lib` or `react-pdf` (templated)
- **Backend/API:** Node.js (API routes in Next.js)

---

## 🔁 Application Flow

1. **User Input:** Users fill out a form in `dashboard.tsx`.
2. **Data Transfer:** Form data is passed to `userDashboard.tsx` for review or preview.
3. **AI Enhancement:** Data is sent to Gemini API to enhance and optimize resume content.
4. **Content Handling:** The improved content is received and formatted.
5. **PDF Generation:** The final version is used to create a styled PDF using a predefined template.
6. **Download:** The PDF is served back to the user for download.

---
