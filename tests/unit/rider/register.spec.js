const { register } = require('../../../src/domain/rider');
// eslint-disable-next-line node/no-unpublished-require
const { expect } = require('chai');
const { Rider } = require('../../../src/infra/database/models');

describe('Rider Register', function () {
  afterEach(async () => {
   return await Rider.deleteMany({ name: 'Test' })
  });

    it('User/Rider Register by passing all valid values', async function () {
       const riderData = {
		   name: "Test",
		   email: `${parseInt(Math.random() * 1000, 10)}test@example.com`,
		   password: "password",
		   phoneNumber: "8699600850",
		   country: "India"
	   }
	   const rider = await register(riderData);
	   expect(rider).to.have.property('name').to.equal(riderData.name);
	   expect(rider).to.have.property('email').to.equal(riderData.email);
	   expect(rider).to.not.have.property('password')
	   expect(rider).to.have.property('phoneNumber').to.equal(riderData.phoneNumber);
	   expect(rider).to.have.property('country').to.equal(riderData.country);
    });

	it('Rider register by not passing name', async function () {
		try {
       const riderData = {
		   email: `${parseInt(Math.random() * 1000, 10)}test@example.com`,
		   password: "password",
		   phoneNumber: "8699600850",
		   country: "India"
	   }
	   await register(riderData);
	} catch(err) {
	    expect(err).to.be.an('error', err);
	}
    });

	it('Rider register by passing name as null', async function () {
		try {
       const riderData = {
		   name: null,
		   email: `${parseInt(Math.random() * 1000, 10)}test@example.com`,
		   password: "password",
		   phoneNumber: "8699600850",
		   country: "India"
	   }
	   await register(riderData);
	} catch(err) {
	    expect(err).to.be.an('error', err);
	}
    });

	it('Rider register by not passing a password', async function () {
		try {
       const riderData = {
		   name: null,
		   email: `${parseInt(Math.random() * 1000, 10)}test@example.com`,
		   phoneNumber: "8699600850",
		   country: "India"
	   }
	   await register(riderData);
	} catch(err) {
	    expect(err).to.be.an('error', err);
	}
    });

	it('Rider register by passing spaces at the end of name', async function () {
       const riderData = {
		   name: 'Test  ',
		   email: `${parseInt(Math.random() * 1000, 10)}test@example.com`,
		   password: "password",
		   phoneNumber: "8699600850",
		   country: "India"
	   }
	  const rider = await register(riderData);
	   expect(rider).to.have.property('name').to.equal(riderData.name.trim());
	   expect(rider).to.have.property('email').to.equal(riderData.email);
	   expect(rider).to.not.have.property('password')
	   expect(rider).to.have.property('phoneNumber').to.equal(riderData.phoneNumber);
	   expect(rider).to.have.property('country').to.equal(riderData.country);
    });
});
