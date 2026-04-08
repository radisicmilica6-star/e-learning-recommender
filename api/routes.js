// api/routes.js
const express = require("express");
const router = express.Router();
const { userHistory, userInterests, courses } = require("../src/data");

// Funkcija za hybrid preporuke
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

// Ruta GET /recommend/:username
router.get("/recommend/:username", (req, res) => {
  const user = req.params.username;
  if (!userHistory[user]) return res.status(404).json({ error: "User not found" });

  const recommendations = recommendHybrid(user);
  res.json({ user, recommendations });
});

module.exports = router;