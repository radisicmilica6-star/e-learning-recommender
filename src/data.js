// Podaci o korisnicima i kursevima
// Možemo proširiti sa rezultatima testova, pregledanim materijalima itd.
const userHistory = {
  "Milica": [1, 3], // ID kurseva koje je pregledala
  "Marko": [2, 3, 5],
  "Jovana": [1, 4],
  "Ana": [2, 5],
  "Petar": [1, 2, 5]
};

// Interesovanja korisnika (kategorije koje vole)
const userInterests = {
  "Milica": ["Programming", "Data Science"],
  "Marko": ["Data Science", "Databases"],
  "Jovana": ["Programming"],
  "Ana": ["Data Science"],
  "Petar": ["Programming", "Data Science"]
};

// Lista kurseva
const courses = [
  { id: 1, title: "JavaScript Basics", category: "Programming" },
  { id: 2, title: "Python for Data Science", category: "Data Science" },
  { id: 3, title: "Introduction to SQL", category: "Databases" },
  { id: 4, title: "React for Beginners", category: "Programming" },
  { id: 5, title: "Machine Learning 101", category: "Data Science" },
  { id: 6, title: "Advanced CSS", category: "Programming" }
];

module.exports = { userHistory, userInterests, courses };