"use strict";
const salesforceOptions_1 = require('../../lib/salesforceOptions');
function withValidSalesforceOptions() {
    let testOptions = {
        baseURL: 'https://baseurl/test/',
        clientID: 'testclientid',
        clientSecret: 'testclientsecret',
        refreshToken: 'arefreshtoken',
        apiVersion: 37,
        sfdcCommunityID: 'avalidcommunityid',
        authorizationServiceURL: 'https://baseurl2/test/authorize',
        authorizationResponseType: 'code',
        tokenServiceURL: 'https://baseurl3/test/token',
        revokeServiceURL: 'https://baseurl4/test/revoke',
        redirectUri: 'https://baseurl2/test/redirrrrect',
    };
    return testOptions;
}
exports.withValidSalesforceOptions = withValidSalesforceOptions;
function withRequiredSalesforceOptions() {
    let testOptions = {
        baseURL: 'https://baseurl/requiredtest/',
        clientID: 'testclientid',
        refreshToken: 'arefreshtoken',
    };
    return testOptions;
}
exports.withRequiredSalesforceOptions = withRequiredSalesforceOptions;
describe('withDefaults', () => {
    let testOptions;
    describe('withValidOptions', () => {
        beforeEach(() => {
            testOptions = withValidSalesforceOptions();
        });
        it('does not override existing api version', () => {
            let testOptionsWithDefaults = salesforceOptions_1.withDefaults(testOptions);
            expect(testOptionsWithDefaults.apiVersion).toBe(37);
        });
        it('does not override existing authorizationResponseType', () => {
            let testOptionsWithDefaults = salesforceOptions_1.withDefaults(testOptions);
            expect(testOptionsWithDefaults.authorizationResponseType).toBe('code');
        });
        it('does not override existing service URLS', () => {
            let testOptionsWithDefaults = salesforceOptions_1.withDefaults(testOptions);
            expect(testOptions.authorizationServiceURL).toBe('https://baseurl2/test/authorize');
            expect(testOptions.tokenServiceURL).toBe('https://baseurl3/test/token');
            expect(testOptions.revokeServiceURL).toBe('https://baseurl4/test/revoke');
        });
    });
    describe('withRequiredOptions', () => {
        beforeEach(() => {
            testOptions = withRequiredSalesforceOptions();
        });
        it('sets default api version', () => {
            let testOptionsWithDefaults = salesforceOptions_1.withDefaults(testOptions);
            expect(testOptionsWithDefaults.apiVersion).toBe(33);
        });
        it('sets default authorizationResponseType', () => {
            let testOptionsWithDefaults = salesforceOptions_1.withDefaults(testOptions);
            expect(testOptionsWithDefaults.authorizationResponseType).toBe('token');
        });
        it('does not override existing service URLS', () => {
            let testOptionsWithDefaults = salesforceOptions_1.withDefaults(testOptions);
            expect(testOptionsWithDefaults.authorizationServiceURL).toBe('https://baseurl/requiredtest/services/oauth2/authorize');
            expect(testOptionsWithDefaults.tokenServiceURL).toBe('https://baseurl/requiredtest/services/oauth2/token');
            expect(testOptionsWithDefaults.revokeServiceURL).toBe('https://baseurl/requiredtest/services/oauth2/revoke');
        });
    });
});
describe('formatApiVersion', () => {
    it('formats 33 as v33.0', () => {
        let formattedApiVersion = salesforceOptions_1.formatApiVersion(33);
        expect(formattedApiVersion).toBe('v33.0');
    });
});
//# sourceMappingURL=salesforceOptions.js.map