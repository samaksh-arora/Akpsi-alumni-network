export default function AlumniCard({ alumni }) {
  return (
    <div className="alumni-card">
      <h3>{alumni.name}</h3>
      <div className="alumni-details">
        <p>
          <strong>Pledge Class:</strong> {alumni.pledgeClass}
          {alumni.graduationYear && (
            <span className="badge badge-primary">{alumni.graduationYear}</span>
          )}
        </p>
        
        {alumni.currentEmployer && (
          <p><strong>Employer:</strong> {alumni.currentEmployer}</p>
        )}
        
        {alumni.currentRole && (
          <p><strong>Role:</strong> {alumni.currentRole}</p>
        )}
        
        {alumni.industry && (
          <p><strong>Industry:</strong> {alumni.industry}</p>
        )}
        
        {alumni.major && (
          <p><strong>Major:</strong> {alumni.major}</p>
        )}
        
        {alumni.location && (
          <p><strong>Location:</strong> {alumni.location}</p>
        )}
        
        {alumni.pastEmployers && (
          <p><strong>Past Employers:</strong> {alumni.pastEmployers}</p>
        )}

        <div className="contact-info">
          {alumni.email && (
            <p><strong>Email:</strong> {alumni.email}</p>
          )}
          
          {alumni.phone && (
            <p><strong>Phone:</strong> {alumni.phone}</p>
          )}
          
          {alumni.linkedin && (
            <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
              View LinkedIn Profile →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
