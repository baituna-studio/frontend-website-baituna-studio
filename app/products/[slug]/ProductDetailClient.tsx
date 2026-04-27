'use client';

import { Accordion, AccordionTab } from 'primereact/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function ProductDetailClient({ faqs }: Props) {
  return (
    <div className="card shadow-sm rounded-2xl bg-white overflow-hidden p-2 md:p-6 border border-surface-section">
      <Accordion multiple>
        {faqs.map((faq, index) => (
          <AccordionTab key={index} header={faq.question} headerClassName="font-semibold text-lg text-text-color">
            <p className="m-0 text-text-color-secondary leading-relaxed">{faq.answer}</p>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}
