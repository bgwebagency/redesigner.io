import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header component', () => {
	test('renders the title', () => {
		render(<Header />)
		const titleElement = screen.getByText('redesigner.io')
		expect(titleElement).toBeInTheDocument()
	})

	test('renders the Github link', () => {
		render(<Header />)
		const githubLink = screen.getByLabelText('Github')
		expect(githubLink).toBeInTheDocument()
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/bgwebagency/redesigner.io',
		)
		expect(githubLink).toHaveAttribute('target', '_blank')
	})

	test('changes theme to light mode when sun icon is clicked', () => {
		render(<Header />)
		const moonIcon = screen.getByLabelText('moon')

		fireEvent.click(moonIcon)

		const sunIcon = screen.getByLabelText('sun')

		fireEvent.click(sunIcon)

		expect(document.body.classList.contains('dark')).toBe(false)
	})

	test('changes theme to dark mode when moon icon is clicked', () => {
		render(<Header />)
		const sunIcon = screen.queryByLabelText('sun')

		expect(sunIcon).toBeNull()

		const moonIcon = screen.getByLabelText('moon')

		fireEvent.click(moonIcon)

		expect(document.body.classList.contains('dark')).toBe(true)
	})
})
