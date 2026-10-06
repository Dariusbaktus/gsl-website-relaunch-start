import React from 'react'

export const metadata = {
  title: 'Team · Global Shipping & Logistics GmbH',
  description: 'Sieben Menschen in Bremen. Sie erreichen jede und jeden direkt — ohne Zentrale, ohne Weiterleitung.',
}

const TEAM_MEMBERS = [
  {
    name: 'Lars Elkjaer',
    role: 'Managing Partner',
    img: '/media/team-lars-elkjaer.jpg',
    phone: '+49 421 3606 340',
    mobile: '+49 162 1935 807',
    email: 'lars.elkjaer@gsl-germany.com',
  },
  {
    name: 'Cord Jürgens',
    role: 'Director Logistics',
    img: '/media/team-cord-juergens.jpg',
    phone: '+49 421 3606 344',
    mobile: '+49 172 1844 989',
    email: 'cord.juergens@gsl-germany.com',
  },
  {
    name: 'Kai Jühdes',
    role: 'Senior Chartering Manager Breakbulk',
    img: '/media/team-kai-juehdes.jpg',
    phone: '+49 421 3606 341',
    mobile: '+49 172 5179 836',
    email: 'kai.juehdes@gsl-germany.com',
  },
  {
    name: 'Maureen I. Kobe',
    role: 'Customer Service Breakbulk',
    img: '/media/team-maureen-kobe.jpg',
    phone: '+49 421 3606 350',
    mobile: '+49 172 4436 025',
    email: 'maureen.kobe@gsl-germany.com',
  },
  {
    name: 'Sabine Krüger',
    role: 'Customer Service Breakbulk',
    img: '/media/team-sabine-krueger.jpg',
    phone: '+49 421 3606 347',
    mobile: '+49 172 4193 036',
    email: 'sabine.krueger@gsl-germany.com',
  },
  {
    name: 'Matthis Osmers',
    role: 'Customer Service',
    img: '/media/team-matthis-osmers.jpg',
    phone: '+49 421 3606 343',
    mobile: null,
    email: 'matthis.osmers@gsl-germany.com',
  },
  {
    name: 'Uwe M. Albrecht',
    role: 'Port Services · Brake',
    img: '/media/team-uwe-albrecht.jpg',
    phone: '+49 421 3606 243',
    mobile: '+49 171 2863 562',
    email: 'uwe.albrecht@gsl-germany.com',
  },
]

export default function TeamPage() {
  return (
    <div className="page on" id="p-team">
      <section className="phead">
        <div className="wrap">
          <h1>Team</h1>
          <p>
            Sieben Menschen in Bremen. Sie erreichen jede und jeden direkt — ohne Zentrale, ohne
            Weiterleitung.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid3" style={{ gap: 18 }}>
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="person">
                <div className="ava hb">
                  <img
                    src={member.img}
                    alt={`${member.name}, ${member.role}`}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h4>{member.name}</h4>
                <div className="role">{member.role}</div>
                <div className="c">
                  {member.phone}
                  <br />
                  {member.mobile ? member.mobile : <span>&nbsp;</span>}
                  <br />
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
