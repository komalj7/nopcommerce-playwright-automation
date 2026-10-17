function generateRandomEmail() {
  const timestamp = Date.now();
  return `testuser_${timestamp}@test.com`;
}

module.exports = { generateRandomEmail };
