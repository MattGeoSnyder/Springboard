const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

const db = require('../db.js');

const User = require('./user');
const ExpressError = require('../helpers/expressError');


let user;
beforeEach(async () => {
    user = {
        username: 'test',
        password: 'test123',
        first_name: 't',
        last_name: 'est',
        email: 'testuser@test.com',
        phone: '123-456-7890'
    }
});

afterEach(async () => {
    await db.query(`DELETE FROM users;`);
})

afterAll(async () => {
    await db.end();
})

describe('Testing Register', () => {
    test('works', async () => {
        let result = await User.register(user);
        
        delete user.password;
        delete result.password;

        expect(user).toEqual(result);
    });
    test('fails on duplicate', async () => {
        let result = await User.register(user)

        try {
            let fail = await User.register(user);
        } catch (error) {
            expect(error instanceof ExpressError);
            expect(error.status).toBe(400);
        }
    });
});

describe('Testing authenticate', () => {
    beforeEach(async () => {
        await User.register(user);
    });
    test('works', async () => {
        let result = await User.authenticate(user.username, user.password);

        expect(result.password).toBeTruthy();

        delete user.password
        delete result.password

        user.admin = false;

        expect(result).toEqual(user);
    });
    test('fails on invalid password', async () => {
        try {
            let result = await User.authenticate(user.username, 'bad');
        } catch (error) {
            expect(error instanceof ExpressError);
            expect(error.status).toBe(401);
        }
    });
    test('fails on invalid username', async () => {
        try {
            let result = await User.authenticate('none', user.password);
        } catch (error) {
            expect(error instanceof ExpressError);
            expect(error.status).toBe(401);
        }
    });
});

describe('Testing getAll', () => {
    beforeEach(async () => {
        await User.register(user);
    })
    test('works', async () => {
        let result = await User.getAll();
        let {username, first_name, last_name} = user;
        expect([{username, first_name, last_name}]).toEqual(result);
    });
});

describe('Testing get', () => {
    beforeEach(async () => {
        await User.register(user);
    });
    test('works', async () => {
        let result = await User.get(user.username);
        let {username, first_name, last_name, email, phone} = user;
        expect({username, first_name, last_name, email, phone}).toEqual(result);
    });
    test('fails on invalid user', async () => {
        try {
            let result = await User.get('none');
        } catch (error) {
            expect(error instanceof ExpressError).toBeTruthy();
            expect(error.status).toBe(404);
        }
    });
});

describe('Testing update', () => {
    beforeEach(async () => {
        await User.register(user);
    });
    test('works', async () => {
        let result = await User.update(user.username, { username: 'testuser'});
        
        expect(result.password).toBeTruthy();
        delete result.password;

        user.username = 'testuser';
        user.admin = false;
        delete user.password;

        expect(result).toEqual(user);
    });
    test('fails if user not found', async () => {
        try {
            let result = await User.update('nope', {username: 'testuser'});
        } catch (error) {
            expect(error instanceof ExpressError).toBeTruthy();
            expect(error.status).toBe(404);
        }
    });
});

describe('Delete user',  () => {
    beforeEach(async () => {
        await User.register(user);
    });
    test('works', async () => {
        let result = await User.delete(user.username);
        expect(result instanceof Boolean);
        expect(result).toBeTruthy();
    });
    test('fails is user not found', async () => {
        try {
            let result = await User.delete('nope');
        } catch (error) {   
            expect(error instanceof ExpressError).toBeTruthy();
            expect(error.status).toBe(404);
        }
    })
})

