import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

const UniversityFAQ = ({ faqSubtitle, university }) => {
  const [open, setOpen] = useState(1);

  const toggle = (id) => {
    setOpen(open === id ? null : String(id));
  };

  return (
    <>
      <section className="gellary-area py-5">
        <div className="container">
          <div className="sec-heading">
            <h3>Frequently Asked Questions</h3>
            <p>{faqSubtitle ? faqSubtitle : ''}</p>
          </div>
          <div className="faq-container">
            <Accordion className="accordion" open={open} toggle={toggle}>
              {university?.length > 0 ? (
                university.map((uni, index) => (
                  <AccordionItem
                    key={uni?.title}
                    className="custom-accordionwithicon-plus"
                  >
                    <AccordionHeader targetId={String(index + 1)}>
                      {uni?.title}
                    </AccordionHeader>
                    <AccordionBody accordionId={String(index + 1)}>
                      {uni?.description}
                    </AccordionBody>
                  </AccordionItem>
                ))
              ) : (
                <AccordionItem className="custom-accordionwithicon-plus">
                  <AccordionHeader targetId="1">
                    What is the process of doing dual-major?
                  </AccordionHeader>
                  <AccordionBody accordionId="1">
                    If the student wants to do duel-major he has to communicate
                    with the department office. The office will provide a
                    guideline for the student which he will follow during the
                    rest of the semesters. Because in order to do duel-major he
                    need to complete 1 elective course, 7 courses from the first
                    major, and 5 courses from the second major.
                  </AccordionBody>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversityFAQ;
