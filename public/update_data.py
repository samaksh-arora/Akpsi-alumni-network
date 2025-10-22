import pandas as pd
import json
import re

def clean_graduation_year(year_str):
    """Extract year from various date formats"""
    if pd.isna(year_str):
        return None
    
    year_str = str(year_str).strip()
    
    # Extract 4-digit year
    match = re.search(r'(20\d{2})', year_str)
    if match:
        return int(match.group(1))
    
    return None

def clean_pledge_class(class_str):
    """Standardize pledge class names"""
    if pd.isna(class_str):
        return "Unknown"
    
    class_str = str(class_str).strip().lower()
    
    # Remove extra spaces and emojis
    class_str = re.sub(r'\s+', ' ', class_str)
    class_str = re.sub(r'[^\w\s]', '', class_str)
    
    # Standardize names
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

print("Reading alumni_lookup.csv...")
alumni_df = pd.read_csv('alumni_lookup.csv', skiprows=1)

# Clean column names
alumni_df.columns = ['name', 'pledge_class', 'graduation_year', 'email', 
                    'phone', 'major', 'current_employer', 'current_role',
                    'past_employers', 'current_location', 'linkedin',
                    'secondary_education', 'interested_in_akpsi', 'industry']

# Apply cleaning
alumni_df['graduation_year'] = alumni_df['graduation_year'].apply(clean_graduation_year)
alumni_df['pledge_class'] = alumni_df['pledge_class'].apply(clean_pledge_class)
alumni_df['industry'] = alumni_df['industry'].str.strip() if 'industry' in alumni_df.columns else None

# Remove empty rows
alumni_df = alumni_df.dropna(subset=['name'])

# Convert NaN to None
for col in alumni_df.columns:
    alumni_df[col] = alumni_df[col].where(pd.notna(alumni_df[col]), None)

print(f"Processed {len(alumni_df)} alumni records")

# Create alumni records
alumni_records = []
for idx, row in alumni_df.iterrows():
    record = {
        "id": idx + 1,
        "name": row['name'],
        "pledgeClass": row['pledge_class'],
        "graduationYear": int(row['graduation_year']) if row['graduation_year'] else None,
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

# Generate statistics
stats = {
    "totalAlumni": len(alumni_df),
    "pledgeClasses": alumni_df['pledge_class'].value_counts().to_dict(),
    "industries": alumni_df['industry'].value_counts().to_dict(),
    "graduationYears": {int(k): v for k, v in alumni_df['graduation_year'].value_counts().to_dict().items() if k},
    "topEmployers": alumni_df['current_employer'].value_counts().head(15).to_dict(),
    "locations": alumni_df['current_location'].value_counts().head(15).to_dict()
}

# Create company directory
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

# Create master data
master_data = {
    "metadata": {
        "chapterName": "Alpha Kappa Psi - Beta Omicron Chapter",
        "university": "Wayne State University",
        "lastUpdated": "Winter 2024",
        "totalRecords": len(alumni_records)
    },
    "alumni": alumni_records,
    "statistics": stats,
    "companies": company_directory,
    "filters": {
        "pledgeClasses": sorted([pc for pc in alumni_df['pledge_class'].unique() if pc]),
        "industries": sorted([ind for ind in alumni_df['industry'].dropna().unique() if ind]),
        "graduationYears": sorted([int(y) for y in alumni_df['graduation_year'].dropna().unique()]),
        "employers": sorted([emp for emp in alumni_df['current_employer'].dropna().unique() if emp and emp != 'Unknown'])
    }
}

# Save to JSON
with open('public/akpsi_network_data.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully created public/akpsi_network_data.json")
print(f"   - {len(master_data['alumni'])} alumni")
print(f"   - {len(master_data['companies'])} companies")
print(f"   - {len(master_data['filters']['pledgeClasses'])} pledge classes")
print(f"   - {len(master_data['filters']['industries'])} industries")
print(f"\nData updated! Refresh your website to see changes.")
