import { test, expect } from '@playwright/test';

test('Get notifications for user', async ({ request }) => {

    const response = await request.get('/notification/user/2');

    expect(response.status()).toBe(200);

});