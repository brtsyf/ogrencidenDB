module.exports = {
  apps: [
    {
      name: "ogrenciden-api",
      script: "./src/index.ts",
      interpreter: "./node_modules/.bin/tsx",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
