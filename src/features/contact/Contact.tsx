import styled from 'styled-components';
import { useLanguage } from '../../hooks/useLocalization';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { contactConfig, isContactConfigured } from '../../config/contact';
import { CONTACT_COOLDOWN_MS, isValidContact } from './validation';
import {
  Section as Container,
  SectionContent as Wrapper,
  SectionDescription as Desc,
  SectionTitle as Title,
} from '../../styles/sectionStyles';

const ContactForm = styled.form`
  width: min(100%, 640px);
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(17, 25, 40, 0.78)),
    rgba(17, 25, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactLabel = styled.label`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.875rem;
  font-weight: 500;
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: ${({ theme }) => theme.primary};
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const ContactDescription = styled(Desc)`
  margin-bottom: 40px;
`;

const Contact = () => {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);

  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState('');
  const inFlight = useRef(false);
  const lastAttempt = useRef(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const element = form.current;
    if (!element || inFlight.current || !isContactConfigured) return;
    if (!isValidContact(new FormData(element))) {
      setStatus(t('contact.invalid'));
      return;
    }
    if (Date.now() - lastAttempt.current < CONTACT_COOLDOWN_MS) {
      setStatus(t('contact.wait'));
      return;
    }
    inFlight.current = true;
    lastAttempt.current = Date.now();
    setPending(true);
    setStatus('');
    try {
      await emailjs.sendForm(contactConfig.serviceId, contactConfig.templateId, element, {
        publicKey: contactConfig.publicKey,
        limitRate: { id: 'portfolio-contact', throttle: CONTACT_COOLDOWN_MS },
      });
      setStatus(t('contact.message_sent'));
      element.reset();
    } catch {
      setStatus(t('contact.error'));
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  };
  return (
    <Container id="Contact">
      <Wrapper>
        <Title>{t('contact.title')}</Title>
        <ContactDescription>{t('contact.subtitle')}</ContactDescription>
        <ContactForm
          ref={form}
          onSubmit={handleSubmit}
          aria-busy={pending}
          data-aos="zoom-out-down"
        >
          <ContactTitle>{t('contact.form_title')}</ContactTitle>
          <ContactLabel htmlFor="contact-email">{t('contact.email')}</ContactLabel>
          <ContactInput
            id="contact-email"
            type="email"
            placeholder={t('contact.email')}
            name="from_email"
            maxLength={254}
            autoComplete="email"
            required
          />
          <ContactLabel htmlFor="contact-name">{t('contact.name')}</ContactLabel>
          <ContactInput
            id="contact-name"
            placeholder={t('contact.name')}
            name="from_name"
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
          />
          <ContactLabel htmlFor="contact-subject">{t('contact.subject')}</ContactLabel>
          <ContactInput
            id="contact-subject"
            placeholder={t('contact.subject')}
            name="subject"
            minLength={2}
            maxLength={150}
            required
          />
          <ContactLabel htmlFor="contact-message">{t('contact.message')}</ContactLabel>
          <ContactInputMessage
            id="contact-message"
            placeholder={t('contact.message')}
            name="message"
            minLength={10}
            maxLength={5000}
            rows={4}
            required
          />
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <ContactButton
            type="submit"
            disabled={pending || !isContactConfigured}
            value={pending ? t('contact.sending') : t('contact.send')}
          />
          <p role="status" aria-live="polite" style={{ color: 'white' }}>
            {isContactConfigured ? status : t('contact.unavailable')}
          </p>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
