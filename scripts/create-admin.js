/* eslint-disable no-process-exit */
const config = require('../config');
const { Admin } = require('../src/infra/database/models');

const adminData = {
	email: config.ADMIN_EMAIL || 'admin123@gmail.com',
	password: config.ADMIN_PASSWORD || 'password'
}

class Script {
  static async run() {
   const data = await Admin.create(adminData);
  }
}

(async () => {
  try {
    console.log('Script run started!');
    await Script.run();
    console.log('Script run complete!');
    process.exit(0);
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
})();
