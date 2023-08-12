module.exports = {
  ci: {
    collect: {
      startServerCommand: "yarn start",
      startServerReadyPattern: "ready started server on",
      url: ["http://localhost:3000/", "https://jeremy.ng"],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
