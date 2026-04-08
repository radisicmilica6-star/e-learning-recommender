const { userHistory, userInterests, courses } = require("./data");

// Hybrid preporuka
// Sistem trenutno kombinuje:
// - istoriju korisnika (prethodne pretrage/gledanja)
// - interesovanja korisnika (kategorije kurseva)
// Može se proširiti sa: pregledanim materijalima, rezultatima kvizova i sl.
function recommendHybrid(userName) {
  const viewed = userHistory[userName] || [];
  const interests = userInterests[userName] || [];

  let cfScores = {};
  Object.entries(userHistory).forEach(([otherUser, otherCourses]) => {
    if (otherUser !== userName) {
      const common = otherCourses.filter(id => viewed.includes(id)).length;
      if (common > 0) {
        otherCourses.forEach(id => {
          if (!viewed.includes(id)) {
            cfScores[id] = (cfScores[id] || 0) + common;
          }
        });
      }
    }
  });

  // Content-based bonus
  courses.forEach(course => {
    if (!viewed.includes(course.id) && interests.includes(course.category)) {
      cfScores[course.id] = (cfScores[course.id] || 0) + 1;
    }
  });

  const recommendedIds = Object.entries(cfScores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => parseInt(id));

  return recommendedIds.map(id => courses.find(c => c.id === id));
}