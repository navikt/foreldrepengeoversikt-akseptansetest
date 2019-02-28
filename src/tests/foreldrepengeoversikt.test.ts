
import { config } from '../../config';
import TestUtils from '../utils/testUtils';
import ForeldrepengeoversiktPage from '../pages/Foreldrepengeoversikt';

fixture(`foreldrepengeoversikt`);

const foreldrepengeoversiktPage = new ForeldrepengeoversiktPage();

test.before(async (t: TestController) => TestUtils.setParent(t, config.fnr))('foreldrepengeoversikt page', async (t) => {
    await TestUtils.login(t,0);
    await foreldrepengeoversiktPage.hasRenderedCorrectly(t);
});
