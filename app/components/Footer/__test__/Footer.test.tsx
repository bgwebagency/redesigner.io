import Footer from '../Footer'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Footer test', () => {
	test('Render all social media links', () => {
		render(<Footer />)

		const twitterLink = screen.getByLabelText(/twitter/i)
		const discordLink = screen.getByLabelText(/discord/i)
		const youtubeLink = screen.getByLabelText(/youtube/i)
		const websiteLink = screen.getByLabelText(/website/i)
		const tiktokLink = screen.getByLabelText(/tiktok/i)
		const instagramLink = screen.getByLabelText(/instagram/i)
		const linkedinLink = screen.getByLabelText(/linkedin/i)

		expect(twitterLink).toBeInTheDocument()
		expect(discordLink).toBeInTheDocument()
		expect(youtubeLink).toBeInTheDocument()
		expect(websiteLink).toBeInTheDocument()
		expect(tiktokLink).toBeInTheDocument()
		expect(instagramLink).toBeInTheDocument()
		expect(linkedinLink).toBeInTheDocument()
	})

	test('Open social media links in a new tab', () => {
		render(<Footer />)

		const links = screen.getAllByRole('link')

		links.forEach(link => {
			expect(link).toHaveAttribute('target', '_blank')
			expect(link).toHaveAttribute('rel', 'noreferrer')
		})
	})

	test('Apply hover effect on social media links', () => {
		render(<Footer />)

		const links = screen.getAllByRole('link')

		links.forEach(link => {
			userEvent.hover(link)
			expect(link).toHaveClass('hover:opacity-50')
		})
	})
})
