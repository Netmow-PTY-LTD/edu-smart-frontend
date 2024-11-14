// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'sd-frontend-v2',
      script: 'npm',
      args: 'start',
      max_memory_restart: '4G',
    },
  ],
};
