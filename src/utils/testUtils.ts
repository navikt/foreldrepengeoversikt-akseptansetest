import { Selector, ClientFunction } from 'testcafe';
import { config } from '../../config';
import LoginPage from '../pages/LoginPage';


const loginPage = new LoginPage();

const getPath = ClientFunction(() => document.location.pathname);

const getHost = ClientFunction(() => document.location.host);

const waitForInitialDataLoaded = ClientFunction(() => {
    return new Promise((resolve) => {
        window.setInterval(() => {
            if (document.location.pathname === '/') {
                resolve();
            }
        }, 100);
    });
});

const login = async (t: TestController, cnt: number) => {
    await t.navigateTo(config.url);

    const host = await TestUtils.getHost();
    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(config.fnr));
    }

    await TestUtils.waitForInitialDataLoaded();
    await t.wait(1000); // Wait for redirect if user has temporary storage

    const path: string = await TestUtils.getPath();
    await t.expect(path).eql('/');
};

const setParent = async (t: TestController, fnr: string) => {
    if (config.skipLogin) {
        return;
    }

    await t.useRole(loginPage.login(fnr));
    const host = await TestUtils.getHost();

    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(fnr));
    }
};

const TestUtils = {
    getPath,
    getHost,
    waitForInitialDataLoaded,
    login,
    setParent
};

export default TestUtils;
