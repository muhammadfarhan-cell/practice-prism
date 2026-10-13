import './FAQ.css'

const questions = [
  {
    question: 'Do I need QuickBooks?',
    answer: 'No. You can upload statements from other accounting software.',
  },
  {
    question: 'Which EHRs can I connect?',
    answer: 'ChiroHD supports a direct connection. Other EHRs can use CSV templates.',
  },
  {
    question: 'What can I ask The Prism?',
    answer: 'Ask general practice questions with Basic, or questions grounded in your connected practice data with Premium.',
  },
  {
    question: 'How do expert sessions work?',
    answer: 'Choose an expert, pick a time, share your goals, and meet on video.',
  },
  {
    question: 'Can I add my team?',
    answer: 'Premium includes 3 additional users free. Further users are $9.99 each. Basic users are $9.99/month each.',
  },
]

export function FAQ() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__inner">
        <div className="faq-section__intro">
          <span>A LITTLE MORE CLARITY</span>
          <h2 id="faq-title">Questions?<br />Start here.</h2>
          <p>A few things to know before you connect your practice.</p>
        </div>
        <div className="faq-section__questions">
          {questions.map(({ question, answer }) => (
            <article className="faq-section__item" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
