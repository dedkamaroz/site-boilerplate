import Footer from "../components/Footer"

const C = { bg: "#0D0D0D", surface: "#161616", border: "#2A2A2A", text: "#F0F0F0", muted: "#888888" }

const s = {
  h1: {
    color: C.text, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
    letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.5rem",
  },
  meta: { color: C.muted, fontSize: "0.78rem", letterSpacing: "0.04em", marginBottom: "0.4rem" },
  intro: { color: C.muted, fontSize: "0.92rem", lineHeight: 1.8, margin: "2rem 0" },
  h2: {
    color: C.text, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase", margin: "2.5rem 0 1rem",
  },
  p:  { color: C.muted, fontSize: "0.92rem", lineHeight: 1.8, margin: "0 0 0.5rem" },
  hr: { border: "none", borderTop: `1px solid ${C.border}`, margin: "2rem 0" },
}

const Clause = ({ n, children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "2rem 1fr", gap: "0 0.75rem", marginBottom: "0.6rem" }}>
    <span style={{ color: "#3A3A3A", fontSize: "0.85rem", fontFamily: '"Inter", sans-serif', paddingTop: "0.05rem" }}>{n}.</span>
    <p style={s.p}>{children}</p>
  </div>
)

export default function TermsConditions() {
  return (
    <>
      <div style={{ background: C.bg, fontFamily: '"Inter", sans-serif' }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "calc(72px + 4rem) 2rem 6rem" }}>

          <h1 style={s.h1}>Terms & Conditions</h1>
          <p style={s.meta}>DISTRO 3D &nbsp;·&nbsp; ABN 49 838 083 890</p>
          <p style={s.meta}>Jurisdiction: New South Wales, Australia &nbsp;·&nbsp; Effective 2025</p>

          <hr style={s.hr} />

          <p style={s.intro}>
            These Terms and Conditions ("Terms") govern the provision of creative services by DISTRO 3D
            ("Studio", "we", "us") to clients ("Client", "you"). By accepting a quote, paying a deposit,
            or instructing the Studio to commence work, you agree to be bound by these Terms.
          </p>

          <h2 style={s.h2}>1. Definitions</h2>
          <Clause n={1}>"Project" means the scope of creative services described in the applicable quote or brief.</Clause>
          <Clause n={2}>"Deliverables" means the final files, renders, animations, or other outputs produced by the Studio for the Client.</Clause>
          <Clause n={3}>"Revision" means a round of consolidated Client feedback applied to Deliverables already presented. A Revision is not a change of creative direction or scope.</Clause>
          <Clause n={4}>"Intellectual Property" or "IP" means all copyright, design rights, and related rights subsisting in the Deliverables.</Clause>
          <Clause n={5}>"Working Files" means source files, project files, scene files, 3D assets, and other intermediate materials used to produce Deliverables.</Clause>

          <h2 style={s.h2}>2. Quotes and Engagement</h2>
          <Clause n={6}>All quotes are valid for 30 days from the date of issue. The Studio reserves the right to withdraw or revise a quote after this period.</Clause>
          <Clause n={7}>A quote constitutes an offer only. Engagement commences when the Client accepts the quote in writing (including by email) or pays a deposit, whichever occurs first.</Clause>
          <Clause n={8}>Any material change to the Project scope after engagement commences may require a revised quote. The Studio will notify the Client before proceeding with out-of-scope work.</Clause>

          <h2 style={s.h2}>3. Deposit and Payment</h2>
          <Clause n={9}>For Projects with a total value exceeding $3,000 (AUD), the Studio requires a non-refundable deposit of 20% of the quoted total before work commences.</Clause>
          <Clause n={10}>Invoices are due and payable within 7 days of the invoice date.</Clause>
          <Clause n={11}>Payment may be made by bank transfer (EFT) or such other methods as stated on the invoice.</Clause>
          <Clause n={12}>The Studio reserves the right to suspend work on any Project where payment is overdue. Suspension does not constitute a breach by the Studio and does not affect the Client's payment obligations.</Clause>
          <Clause n={13}>Overdue invoices may attract interest at the rate of 10% per annum, calculated daily from the due date until the date of payment.</Clause>
          <Clause n={14}>The Studio reserves the right to engage a debt recovery service for invoices outstanding beyond 30 days. Reasonable recovery costs will be passed to the Client.</Clause>

          <h2 style={s.h2}>4. Revisions</h2>
          <Clause n={15}>Each Project includes three (3) rounds of Revisions at no additional charge, unless otherwise stated in the quote.</Clause>
          <Clause n={16}>A Revision round is defined as one consolidated set of feedback provided by the Client on a presented version of the Deliverables. The Studio encourages Clients to review all presented content thoroughly before submitting Revision feedback, so that each round is used effectively.</Clause>
          <Clause n={17}>Revisions requested after the three included rounds, or requests that constitute a change of creative direction, scope, or brief, will be quoted separately and invoiced accordingly.</Clause>
          <Clause n={18}>Revision requests must be submitted in writing. Verbal feedback not confirmed in writing will not be acted upon.</Clause>
          <Clause n={19}>The Studio will use reasonable skill and care to incorporate Revision feedback. Minor variations in the interpretation of subjective feedback do not constitute grounds for additional Revisions at no charge.</Clause>

          <h2 style={s.h2}>5. Intellectual Property and Ownership</h2>
          <Clause n={20}>Upon receipt of full payment of all amounts due, the Studio assigns to the Client all Intellectual Property rights in the final Deliverables produced specifically for the Project.</Clause>
          <Clause n={21}>IP in Deliverables does not transfer until all outstanding invoices, including any variation invoices, are paid in full.</Clause>
          <Clause n={22}>Working Files remain the property of the Studio and are not included in the assignment of IP unless explicitly agreed in writing. Requests for Working Files will be quoted separately.</Clause>
          <Clause n={23}>The Studio retains a perpetual, royalty-free licence to display the Deliverables in its portfolio, on its website, and in promotional materials, unless the Client requests otherwise in writing prior to commencement.</Clause>
          <Clause n={24}>The Client warrants that any materials, references, logos, or assets supplied to the Studio for use in the Project do not infringe any third-party rights. The Client indemnifies the Studio against any claim arising from Client-supplied materials.</Clause>
          <Clause n={25}>Third-party assets (stock footage, fonts, plugins, music) used in Deliverables remain subject to their respective third-party licences. The Studio will advise the Client where such assets are used.</Clause>

          <h2 style={s.h2}>6. Client Responsibilities</h2>
          <Clause n={26}>The Client is responsible for providing a complete and accurate brief prior to commencement. Delays or costs arising from an incomplete or changing brief are the Client's responsibility.</Clause>
          <Clause n={27}>The Client must provide timely feedback and approvals. Where the Client causes delays exceeding 14 days without prior agreement, the Studio may reschedule the Project and cannot guarantee the original delivery timeline.</Clause>
          <Clause n={28}>The Client is responsible for proofreading and approving all text, data, and final content before delivery. The Studio is not liable for errors in Client-approved content.</Clause>
          <Clause n={29}>The Client must ensure they hold all necessary rights to any materials supplied to the Studio for use in the Project.</Clause>

          <h2 style={s.h2}>7. Delivery and Acceptance</h2>
          <Clause n={30}>Delivery timelines stated in quotes are estimates only and are subject to timely receipt of Client materials, feedback, and approvals.</Clause>
          <Clause n={31}>Deliverables are presented to the Client for review and approval. Written approval (including by email) constitutes acceptance. Where no written objection is received within 7 days of presentation, Deliverables are deemed accepted.</Clause>
          <Clause n={32}>Once accepted, the Studio's obligations in respect of that stage of the Project are complete, subject to any remaining Revision rounds.</Clause>

          <h2 style={s.h2}>8. Cancellation</h2>
          <Clause n={33}>Either party may cancel a Project by written notice.</Clause>
          <Clause n={34}>Where the Client cancels a Project after commencement, the Client is liable for all work completed to the date of cancellation, invoiced at the quoted rate on a pro-rata basis. Any deposit paid is non-refundable and will be applied against this amount.</Clause>
          <Clause n={35}>Where the Studio cancels a Project without cause, the Studio will refund any deposit paid less the value of work completed to that date.</Clause>
          <Clause n={36}>Cancellation does not affect any rights or obligations that have already accrued under these Terms.</Clause>

          <h2 style={s.h2}>9. Limitation of Liability</h2>
          <Clause n={37}>To the maximum extent permitted by law, the Studio's total liability to the Client for any claim arising out of or in connection with a Project is limited to the total amount paid by the Client for that Project.</Clause>
          <Clause n={38}>The Studio is not liable for any indirect, consequential, special, or incidental loss or damage, including loss of profit, loss of revenue, or loss of business opportunity.</Clause>
          <Clause n={39}>Nothing in these Terms excludes, restricts, or modifies any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the Australian Consumer Law where it cannot lawfully be excluded.</Clause>

          <h2 style={s.h2}>10. Confidentiality</h2>
          <Clause n={40}>Each party agrees to keep confidential all non-public information received from the other party in connection with a Project, and not to disclose it to any third party without prior written consent.</Clause>
          <Clause n={41}>This obligation does not apply to information that is or becomes publicly available through no fault of the receiving party, or that is required to be disclosed by law.</Clause>

          <h2 style={s.h2}>11. Governing Law</h2>
          <Clause n={42}>These Terms are governed by the laws of New South Wales, Australia. Each party submits to the non-exclusive jurisdiction of the courts of New South Wales.</Clause>
          <Clause n={43}>Where a dispute arises, the parties agree to first attempt resolution in good faith before commencing legal proceedings.</Clause>

          <h2 style={s.h2}>12. General</h2>
          <Clause n={44}>These Terms represent the entire agreement between the parties in respect of the subject matter and supersede all prior representations, discussions, and agreements.</Clause>
          <Clause n={45}>If any provision of these Terms is found to be unenforceable, it will be severed and the remaining provisions will continue in full force.</Clause>
          <Clause n={46}>Failure by the Studio to enforce any provision of these Terms does not constitute a waiver of that provision.</Clause>
          <Clause n={47}>The Studio may update these Terms from time to time. The Terms in force at the time a quote is accepted apply to that Project.</Clause>

        </div>
      </div>
      <Footer logoSrc="/assets/logo/logo.webp" />
    </>
  )
}
