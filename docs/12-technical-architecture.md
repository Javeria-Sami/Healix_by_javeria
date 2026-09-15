# 12 — Technical Architecture

## Frontend
React + Vite, React Router, Framer Motion, CSS/Tailwind.

## Backend
Node.js + Express where dynamic functionality is required.

## Frontend Structure
```text
src/
├── components/
├── layouts/
├── pages/
├── sections/
├── hooks/
├── services/
├── data/
├── constants/
├── utils/
├── animations/
├── routes/
└── styles/
```

## Backend Structure
```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
└── utils/
```

## Architecture Rule
Do not add state management, databases, or backend complexity without a real requirement.
