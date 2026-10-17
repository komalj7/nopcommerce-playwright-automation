function generateRandomEmail() {
  const timestamp = Date.now();
  return `testuser_${timestamp}@example.com`;
}

module.exports = {
  generateRandomEmail,
};

