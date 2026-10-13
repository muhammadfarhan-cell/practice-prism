import './DashboardPreview.css'

const metrics = [
  ['Monthly Revenue', '$10k', '10%'],
  ['New Patients', '24', '10%'],
  ['Patient Visits', '12', '5%'],
  ['ROI', '15%', '10%'],
]

const navigation = ['Dashboard', 'AI Coach', 'Experts', 'Reports & Insights', 'Employee Management', 'User Management', 'Settings']

export function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-label="Illustrative Practice Prism clinic dashboard">
      <aside className="dashboard-preview__sidebar">
        <div className="dashboard-preview__logo"><img src="/practice-prism-logo.png" alt="Practice Prism" /></div>
        <div className="dashboard-preview__nav">{navigation.map((item, i) => <div className={i === 0 ? 'active' : ''} key={item}><span className="dashboard-preview__icon">{['▦','◇','♙','▤','♧','♧','⚙'][i]}</span>{item}</div>)}</div>
      </aside>
      <div className="dashboard-preview__body">
        <div className="dashboard-preview__topbar"><span>☰</span><span className="dashboard-preview__profile">● &nbsp; Clinic owner</span></div>
        <div className="dashboard-preview__content">
          <h3>Welcome Vanessa Helfrich</h3>
          <p>Let’s get your clinic insights up and running.</p>
          <div className="dashboard-preview__metrics">{metrics.map(([label, value, change]) => <div key={label} className="dashboard-preview__metric"><span>{label}</span><strong>{value}</strong><small>{change} <i>Vs last month</i></small></div>)}</div>
          <div className="dashboard-preview__bottom">
            <div className="dashboard-preview__chart-card">
              <div className="dashboard-preview__chart-heading"><div><strong>Revenue vs. Expenses</strong><small>Jun 1, 2024 – Dec 1, 2025</small></div><div><strong>$9,758.00</strong><small>Total Revenue</small></div></div>
              <svg viewBox="0 0 640 275" preserveAspectRatio="none" aria-hidden="true"><path className="grid" d="M 0 40 H 640 M 0 92 H 640 M 0 144 H 640 M 0 196 H 640 M 0 248 H 640" /><path className="revenue" d="M0 169 C20 178 30 150 48 162 S75 171 94 165 S119 182 140 161 S171 166 192 151 S218 160 240 138 S270 147 289 130 S318 145 337 123 S368 131 385 119 S412 136 434 113 S460 120 478 101 S504 113 527 97 S553 112 575 88 S606 98 640 72" /><path className="expense" d="M0 210 C32 203 53 215 78 209 S109 213 133 211 S158 230 185 210 S214 207 240 198 S275 210 295 196 S328 194 350 190 S380 199 403 189 S430 194 452 188 S484 199 506 189 S537 197 562 185 S593 192 640 176" /></svg>
              <div className="dashboard-preview__months">Jan &nbsp;&nbsp; Feb &nbsp;&nbsp; Mar &nbsp;&nbsp; Apr &nbsp;&nbsp; May &nbsp;&nbsp; Jun &nbsp;&nbsp; Jul &nbsp;&nbsp; Aug &nbsp;&nbsp; Sep &nbsp;&nbsp; Oct &nbsp;&nbsp; Nov &nbsp;&nbsp; Dec</div>
            </div>
            <div className="dashboard-preview__recommendations"><strong>AI Coach Recommendations</strong><p><b>Improve New Patient Conversion</b><small>Insights from your latest campaign show fewer conversions in the last 30 days.</small></p><p><b>Optimize Provider Scheduling</b><small>Your provider utilization rate is below the clinic average this quarter.</small></p><p><b>Payroll-to-Revenue Ratio Alert</b><small>Your payroll expenses represent 62 percent of monthly revenue.</small></p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
