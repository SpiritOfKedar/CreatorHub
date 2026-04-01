import React from 'react';

const TERMS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Renown, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of the platform.'
  },
  {
    title: '2. Eligibility and Account Responsibility',
    body: 'You must provide accurate information during registration and keep your account credentials secure. You are responsible for all activity under your account.'
  },
  {
    title: '3. Wallet, Credits, and Payments',
    body: 'Wallet credits can be added through supported payment methods. Credits are used for eligible purchases on the platform and are subject to transaction validation and fraud checks.'
  },
  {
    title: '4. Purchases, Access, and Digital Content',
    body: 'After successful payment, access to purchased digital content is granted according to the creator’s offering. Access rights are personal and non-transferable unless explicitly stated.'
  },
  {
    title: '5. Refunds and Chargebacks',
    body: 'Refund requests are reviewed under our refund policy and applicable laws. Unauthorized chargebacks or abuse of refund workflows may lead to account restrictions.'
  },
  {
    title: '6. Prohibited Conduct',
    body: 'You agree not to misuse the platform, infringe intellectual property rights, attempt unauthorized access, or engage in abusive, fraudulent, or unlawful activity.'
  },
  {
    title: '7. Creator and User Content',
    body: 'Creators retain ownership of their content unless otherwise agreed. By uploading content, you grant Renown the rights needed to host, display, and deliver content through the platform.'
  },
  {
    title: '8. Service Availability',
    body: 'We aim to provide reliable service, but uninterrupted availability is not guaranteed. Maintenance, updates, or technical issues may temporarily affect access.'
  },
  {
    title: '9. Limitation of Liability',
    body: 'To the fullest extent permitted by law, Renown is not liable for indirect, incidental, or consequential damages arising from your use of the platform.'
  },
  {
    title: '10. Updates to Terms',
    body: 'We may update these Terms from time to time. Continued use of the platform after updates means you accept the revised Terms and Conditions.'
  }
];

export default function TermsAndConditionsContent() {
  return (
    <div className="flex w-full flex-col items-start px-[42px] py-[42px]">
      <h1 className="font-[family-name:var(--font-fjalla)] text-[40px] font-normal leading-[57.6px] tracking-[0.8px] text-[var(--heading,#1a1a1a)]">
        Terms and Conditions
      </h1>

      <p className="mt-[8px] max-w-[1116px] font-[family-name:var(--font-figtree)] text-[16px] font-medium leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)]">
        Effective date: April 2, 2026. Please read these terms carefully before using Renown. These terms govern your use of the platform, purchases, wallet credits, and access to digital content.
      </p>

      <div className="mt-[24px] w-full max-w-[1116px] rounded-[16px] border border-[var(--alt-sec,#e4ded2)] bg-[#fcfaf7] p-[24px]">
        <div className="space-y-[18px]">
          {TERMS_SECTIONS.map((section) => (
            <section key={section.title} className="rounded-[12px] border border-[#eee7dc] bg-[#faf8f5] p-[16px]">
              <h2 className="font-[family-name:var(--font-fjalla)] text-[24px] font-normal leading-[34px] tracking-[0.48px] text-[var(--heading,#1a1a1a)]">
                {section.title}
              </h2>
              <p className="mt-[6px] font-[family-name:var(--font-figtree)] text-[15px] font-medium leading-[24px] tracking-[0.3px] text-[var(--body,#5a5a5a)]">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-[20px] rounded-[12px] border border-[#f3d6d1] bg-[#fff3f2] p-[14px]">
          <p className="font-[family-name:var(--font-figtree)] text-[14px] font-semibold leading-[22px] tracking-[0.28px] text-[#8a3b34]">
            For legal or billing support, contact us at support@yourdomain.com.
          </p>
        </div>
      </div>
    </div>
  );
}
