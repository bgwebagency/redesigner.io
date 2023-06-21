import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({
	path: `.env.local`,
})

const baseURL = process.env.BASE_URL as string

test('Has title', async ({ page }) => {
	await page.goto(baseURL)

	await expect
		.soft(page.getByRole('heading', { name: 'Redesign your home with AI' }))
		.toBeVisible()
})

test('Redesign Room Button Visible ', async ({ page }) => {
	await page.goto(baseURL)

	await expect(
		page.getByRole('button', { name: 'Redesign Room' }),
	).toBeVisible()
})

test('Redesign Building Button Visible ', async ({ page }) => {
	await page.goto(baseURL)

	await expect(
		page.getByRole('button', { name: 'Redesign Building' }),
	).toBeVisible()
})
