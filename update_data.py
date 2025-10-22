import pandas as pd
import json
import re

def clean_graduation_year(year_str):
    """Extract year from various date formats"""
    if pd.isna(year_str):
        return None
    
    year_str = str(year_str).strip()
    match = re.search(r'(20\d{2})', year_str)
    if match:
        return int(match.group(1))
    return None

def clean_pledge_class(class_str):
    """Standardize pledge class names"""
    if pd.isna(class_str):
        return "Unknown"
    
    class_str = str(class_str).strip().lower()
    class_str = re.sub(r'\s+', ' ', class_str)
    class_str = re.sub(r'[^\w\s]', '', class_str)
    
    if 'founding' in class_str:
        return "Founding"
    elif 'alpha' in class_str:
        return "Alpha"
    elif 'beta' in class_str and 'omicron' not in class_str:
        return "Beta"
    elif 'gamma' in class_str:
        return "Gamma"
    elif 'delta' in class_str:
        return "Delta"
    elif 'epsilon' in class_str:
        return "Epsilon"
    elif 'zeta' in class_str:
        return "Zeta"
    elif 'eta' in class_str:
        return "Eta"
    elif 'theta' in class_str:
        return "Theta"
    elif 'iota' in class_str:
        return "Iota"
    elif 'kappa' in class_str or 'kapa' in class_str:
        return "Kappa"
    elif 'lambda' in class_str:
        return "Lambda"
    elif 'mu' in class_str:
        return "Mu"
    elif class_str.isdigit():
        return f"Class of {class_str}"
    
    return class_str.title()

def clean_company_name(company_str):
    """Standardize company names to prevent duplicates"""
    if pd.isna(company_str):
        return None
    
    company_str = str(company_str).strip()
    company_str = re.sub(r'\s+', ' ', company_str)
    company_str = re.sub(r'[.,\s]+$', '', company_str)
    
    company_str = company_str.replace('Inc.', 'Inc')
    company_str = company_str.replace('LLC.', 'LLC')
    company_str = company_str.replace('Corp.', 'Corp')
    company_str = company_str.replace('Ltd.', 'Ltd')
    
    company_mapping = {
        'Ally': 'Ally Financial',
        'Ally Bank': 'Ally Financial',
        'GM': 'General Motors',
        'General Motors Company': 'General Motors',
        'Ford': 'Ford Motor Company',
        'Ford Motor': 'Ford Motor Company',
        'BCBS': 'Blue Cross Blue Shield',
        'Blue Cross': 'Blue Cross Blue Shield',
        'BlueCross BlueShield': 'Blue Cross Blue Shield',
        'Accenture PLC': 'Accenture',
        'Deloitte Consulting': 'Deloitte',
        'Deloitte & Touche': 'Deloitte',
        'PwC': 'PricewaterhouseCoopers',
        'PWC': 'PricewaterhouseCoopers',
        'PricewaterhouseCoopers LLP': 'PricewaterhouseCoopers',
        'EY': 'Ernst & Young',
        'Ernst and Young': 'Ernst & Young',
        'KPMG LLP': 'KPMG',
        'Rocket Mortgage': 'Rocket Companies',
        'Rocket Companies Inc': 'Rocket Companies',
    }
    
    if company_str in company_mapping:
        return company_mapping[company_str]
    
    return company_str if company_str else None

print("Reading alumni_lookup.csv...")
alumni_df = pd.read_csv('alumni_lookup.csv', skiprows=1)

alumni_df.columns = ['name', 'pledge_class', 'graduation_year', 'email', 
                    'phone', 'major', 'current_employer', 'current_role',
                    'past_employers', 'current_location', 'linkedin',
                    'secondary_education', 'interested_in_akpsi', 'industry']

alumni_df['graduation_year'] = alumni_df['graduation_year'].apply(clean_graduation_year)
alumni_df['pledge_class'] = alumni_df['pledge_class'].apply(clean_pledge_class)
alumni_df['current_employer'] = alumni_df['current_employer'].apply(clean_company_name)
alumni_df['industry'] = alumni_df['industry'].str.strip() if 'industry' in alumni_df.columns else None

alumni_df = alumni_df.dropna(subset=['name'])

for col in alumni_df.columns:
    alumni_df[col] = alumni_df[col].where(pd.notna(alumni_df[col]), None)

print(f"Processed {len(alumni_df)} alumni records")
print("\nCompany name standardization:")
company_counts = alumni_df['current_employer'].value_counts()
print(f"Total unique companies: {len(company_counts)}")

# Create alumni records - FIXED SECTION
alumni_records = []
for idx, row in alumni_df.iterrows():
    # Safely handle graduation year conversion
    grad_year = None
    if pd.notna(row['graduation_year']) and row['graduation_year']:
        try:
            grad_year = int(row['graduation_year'])
        except (ValueError, TypeError):
            grad_year = None
    
    record = {
        "id": idx + 1,
        "name": row['name'],
        "pledgeClass": row['pledge_class'],
        "graduationYear": grad_year,
        "email": row['email'],
        "phone": row['phone'],
        "major": row['major'],
        "currentEmployer": row['current_employer'],
        "currentRole": row['current_role'],
        "pastEmployers": row['past_employers'],
        "location": row['current_location'],
        "linkedin": row['linkedin'],
        "secondaryEducation": row['secondary_education'],
        "interestedInAkpsi": row['interested_in_akpsi'],
        "industry": row['industry']
    }
    alumni_records.append(record)

# Generate statistics - ALSO FIXED
grad_years_dict = {}
for year in alumni_df['graduation_year'].dropna().unique():
    try:
        if pd.notna(year):
            year_int = int(year)
            count = len(alumni_df[alumni_df['graduation_year'] == year])
            grad_years_dict[year_int] = count
    except (ValueError, TypeError):
        pass

stats = {
    "totalAlumni": len(alumni_df),
    "pledgeClasses": alumni_df['pledge_class'].value_counts().to_dict(),
    "industries": alumni_df['industry'].value_counts().to_dict(),
    "graduationYears": grad_years_dict,
    "topEmployers": alumni_df['current_employer'].value_counts().head(15).to_dict(),
    "locations": alumni_df['current_location'].value_counts().head(15).to_dict()
}

company_directory = {}
for employer in alumni_df['current_employer'].dropna().unique():
    if employer and str(employer).strip() and employer != 'Unknown':
        company_alumni = alumni_df[alumni_df['current_employer'] == employer]
        
        company_directory[employer] = {
            "name": employer,
            "alumniCount": len(company_alumni),
            "alumni": company_alumni['name'].tolist(),
            "industries": company_alumni['industry'].dropna().unique().tolist()
        }

company_directory = dict(sorted(company_directory.items(), 
                                key=lambda x: x[1]['alumniCount'], 
                                reverse=True))

master_data = {
    "metadata": {
        "chapterName": "Alpha Kappa Psi - Beta Omicron Chapter",
        "university": "Wayne State University",
        "lastUpdated": "Fall 2025",
        "totalRecords": len(alumni_records)
    },
    "alumni": alumni_records,
    "statistics": stats,
    "companies": company_directory,
    "filters": {
        "pledgeClasses": sorted([pc for pc in alumni_df['pledge_class'].unique() if pc]),
        "industries": sorted([ind for ind in alumni_df['industry'].dropna().unique() if ind]),
        "graduationYears": sorted([int(y) for y in alumni_df['graduation_year'].dropna().unique() if pd.notna(y)]),
        "employers": sorted([emp for emp in alumni_df['current_employer'].dropna().unique() if emp and emp != 'Unknown'])
    }
}

with open('public/akpsi_network_data.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully created public/akpsi_network_data.json")
print(f"   - {len(master_data['alumni'])} alumni")
print(f"   - {len(master_data['companies'])} companies (deduplicated)")
print(f"   - {len(master_data['filters']['pledgeClasses'])} pledge classes")
print(f"   - {len(master_data['filters']['industries'])} industries")
print(f"\nTop 10 companies:")
for i, (company, count) in enumerate(list(company_directory.items())[:10], 1):
    print(f"   {i}. {company}: {count} alumni")
print(f"\nData updated! Refresh your website to see changes.")
