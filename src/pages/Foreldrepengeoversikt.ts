import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class ForeldrepengeoversiktPageModel {
    async hasRenderedCorrectly(t: TestController) {
        await t.expect(await TestUtils.getPath()).eql('/');
        await t.expect(Selector('body').textContent).contains('Dine foreldrepenger')
    }
}
