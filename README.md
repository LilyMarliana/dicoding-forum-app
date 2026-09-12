# Forum Diskusi (Dicoding Forum App)

Aplikasi forum diskusi yang dibangun sebagai submission akhir kelas **"Menjadi React Web Developer Expert"** dari Dicoding. Melanjutkan proyek Forum Diskusi dari submission sebelumnya, dengan tambahan Automation Testing, CI/CD, dan React Ecosystem.

## Tech Stack

- React 19 + Vite
- Redux Toolkit + React Redux
- React Router DOM
- React Bootstrap
- Axios

## Fitur

- Registrasi & login pengguna
- Membuat, melihat, dan berdiskusi di thread
- Vote (upvote/downvote) pada thread
- Leaderboard pengguna
- Filter thread berdasarkan kategori

## Menjalankan Proyek

```bash
npm install
npm run dev
```

## Menjalankan Pengujian

Unit & integration test (Vitest + React Testing Library):

```bash
npm test
```

End-to-end test (Cypress):

```bash
npm run e2e
```

## Deployment

Aplikasi ini di-deploy otomatis ke Vercel setiap ada perubahan ke branch `master`, melalui pipeline CI/CD dengan GitHub Actions untuk pengujian otomatis dan Vercel untuk continuous deployment.

**URL Vercel**: _(akan diisi setelah proses deploy)_