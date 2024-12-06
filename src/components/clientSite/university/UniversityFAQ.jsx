import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

const UniversityFAQ = () => {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <>
      <section className="gellary-area py-5">
        <div className="container">
          <div className="sec-heading">
            <h3>Frequently Asked Questions</h3>
            <p>
              Malaysia started focusing on the development of telecommunication,
              Telekom Malaysia Berhad (TM) took a leap of faith by establishing
              the first private-owned higher learning institute.
            </p>
          </div>
          <div className="faq-container">
            <Accordion className="accordion" open={open} toggle={toggle}>
              <AccordionItem className="custom-accordionwithicon-plus">
                <AccordionHeader targetId="1">
                  What is the process of doing dual-major?
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  If the student wants to do duel-major he has to communicate
                  with the department office. The office will provide a
                  guideline for the student which he will follow during the rest
                  of the semesters. Because in order to do duel-major he need to
                  complete 1 elective course, 7 course from the first major and
                  5 courses from the second major.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="custom-accordionwithicon-plus">
                <AccordionHeader
                  className="custom-accordionwithicon"
                  targetId="2"
                >
                  What is the process for applying at online?
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  If the student wants to do duel-major he has to communicate
                  with the department office. The office will provide a
                  guideline for the student which he will follow during the rest
                  of the semesters. Because in order to do duel-major he need to
                  complete 1 elective course, 7 course from the first major and
                  5 courses from the second major.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="custom-accordionwithicon-plus">
                <AccordionHeader
                  className="custom-accordionwithicon"
                  targetId="3"
                >
                  How can I Change/ Add/Drop course after the registration?
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  If the student wants to do duel-major he has to communicate
                  with the department office. The office will provide a
                  guideline for the student which he will follow during the rest
                  of the semesters. Because in order to do duel-major he need to
                  complete 1 elective course, 7 course from the first major and
                  5 courses from the second major.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="custom-accordionwithicon-plus">
                <AccordionHeader
                  className="custom-accordionwithicon"
                  targetId="4"
                >
                  What are the tuition fees?
                </AccordionHeader>
                <AccordionBody accordionId="4">
                  If the student wants to do duel-major he has to communicate
                  with the department office. The office will provide a
                  guideline for the student which he will follow during the rest
                  of the semesters. Because in order to do duel-major he need to
                  complete 1 elective course, 7 course from the first major and
                  5 courses from the second major.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="custom-accordionwithicon-plus">
                <AccordionHeader
                  className="custom-accordionwithicon"
                  targetId="5"
                >
                  How can I complete my course registration in the semester?
                </AccordionHeader>
                <AccordionBody accordionId="5">
                  If the student wants to do duel-major he has to communicate
                  with the department office. The office will provide a
                  guideline for the student which he will follow during the rest
                  of the semesters. Because in order to do duel-major he need to
                  complete 1 elective course, 7 course from the first major and
                  5 courses from the second major.
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversityFAQ;
