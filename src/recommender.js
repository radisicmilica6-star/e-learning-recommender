// src/recommender.js

// Lista kurseva sa kategorijama i popularnošću
const courses = [
  { id: 1, title: "JavaScript Basics", category: "Programming", popularity: 95 },
  { id: 2, title: "Python for Data Science", category: "Data Science", popularity: 120 },
  { id: 3, title: "Introduction to SQL", category: "Databases", popularity: 80 },
  { id: 4, title: "React for Beginners", category: "Programming", popularity: 90 },
  { id: 5, title: "Machine Learning 101", category: "Data Science", popularity: 100 },
  { id: 6, title: "Advanced CSS", category: "Programming", popularity: 70 },
];

// Funkcija koja preporučuje kurseve po više interesovanja
function recommend(userInterests) {
  // Filterujemo kurseve koji odgovaraju interesovanjima
  const filtered = courses.filter(course => userInterests.includes(course.category));
  
  // Sortiramo po popularnosti (opadajuće)
  const sorted = filtered.sort((a, b) => b.popularity - a.popularity);
  
  return sorted;
}

// Primer korisnikovih interesovanja
const userInterests = ["Programming", "Data Science"];
const recommendations = recommend(userInterests);

console.log("Preporučeni kursevi za tvoje interesovanje:");
recommendations.forEach((course, index) => {
  console.log(`${index + 1}. ${course.title} (${course.category}) - Popularnost: ${course.popularity}`);
});