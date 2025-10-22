# Alpha Kappa Psi Beta Omicron Network Directory

Professional alumni network directory for the Beta Omicron Chapter of Alpha Kappa Psi at Wayne State University.

## Overview

A password-protected web application that allows Beta Omicron chapter members to search, filter, and connect with 179+ alumni across various industries and companies. Built with React and designed with Alpha Kappa Psi's official branding.

## Key Features

- Password Protection - Members-only access
- Advanced Search - Filter by name, pledge class, industry, graduation year, and employer
- Company Directory - Browse alumni by employer (147+ companies)
- Network Statistics - Visual analytics on industries, locations, and trends
- Responsive Design - Works on desktop, tablet, and mobile
- No Backend Required - Fully static, easy to host on Vercel

## Quick Start

### Prerequisites

- Node.js 16+ and npm installed
- Git (optional, for version control)

### Installation

## Clone or download the project
cd akpsi-network
## Install dependencies
npm install
## Generate data file (first time only)
python update_data.py
## Run development server
npm run dev

### How It Works

- Uses localStorage for session persistence
- No backend authentication server required
- Members stay logged in until they click "Logout"
- All routes are protected except /login

## Updating Alumni Data

### Method 1: Update CSV (Recommended)

1. Edit `alumni_lookup.csv` in Excel or Google Sheets
2. Save the file
3. Run the update script:
python update_data.py
4. Deploy (if hosted):
git add .
git commit -m “Update alumni data”
git push


### CSV Format

Required columns (in order):
1. Name
2. AKPSI Class (Alpha, Beta, Gamma, Delta, Epsilon, Zeta, Eta, Theta, Iota, Kappa, Lambda, Mu, Founding)
3. Graduation Year
4. Email
5. Phone Number
6. Major
7. Current Employer
8. Current Role
9. Past Employers
10. Current City, State
11. LinkedIn (full URL)
12. Secondary Education
13. Interested in being involved in AKPsi?
14. Industry

### Method 2: Direct JSON Edit (Quick Fixes)

For small changes (typos, phone numbers):
1. Open `public/akpsi_network_data.json`
2. Find the alumni record
3. Edit the value
4. Save and refresh browser

## Branding and Colors

The site uses Alpha Kappa Psi's official colors:

- Royal Blue: #002F6C (primary)
- Gold: #FFC72C (accent)

### Typography

- Headings: Montserrat (bold, 600-800 weight)
- Body: Open Sans (regular, 400-600 weight)

Features Breakdown
Home Page
	•	Overview statistics (total alumni, companies, industries)
	•	Top 10 employers list
	•	Quick links to other sections
Alumni Directory
	•	5 simultaneous filters:
	•	Name search (real-time)
	•	Pledge class dropdown
	•	Industry dropdown
	•	Graduation year dropdown
	•	Employer dropdown
	•	Results counter
	•	Clear filters button
	•	Grid view of alumni cards with full contact info
Company Directory
	•	Alphabetical list of 147+ companies
	•	Alumni count per company
	•	Click to view full list of alumni at each company
	•	Industry tags for each company
Statistics
	•	Network overview cards
  Top 15 employers with bar charts
	•	Industry distribution
	•	Pledge class breakdown
	•	Graduation year trends
	•	Top alumni locations
Tech Stack
	•	React 18 - UI framework
	•	React Router 6 - Navigation
	•	Vite 5 - Build tool and dev server
	•	CSS3 - Styling (no frameworks)
	•	Python - Data processing script
Maintenance
Regular Updates
	•	Monthly: Update alumni data from your master spreadsheet
	•	Quarterly: Verify contact information accuracy
	•	Annually: Full data audit and cleanup
Support
For technical issues or feature requests, contact the chapter webmaster.
License
Internal use only - Alpha Kappa Psi Beta Omicron Chapter, Wayne State University.
About Alpha Kappa Psi
Alpha Kappa Psi is the oldest and largest professional business fraternity. The Beta Omicron chapter at Wayne State University was established to develop principled business leaders through professional development, community service, and lifelong brotherhood.
Learn more: akpsi.org
Last Updated: October 2025 Version: 1.0.0 Maintained by: Beta Omicron Chapter

