import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head>
        <title>Contact Form Submission</title>
      </Head>
      <Preview>New message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>New Contact Form Submission</Heading>
          </Section>
          <Section style={section}>
            <div style={fieldGroup}>
              <Text style={label}>From</Text>
              <Text style={value}>{name}</Text>
            </div>
            <div style={fieldGroup}>
              <Text style={label}>Email</Text>
              <Text style={value}>{email}</Text>
            </div>
            <div style={fieldGroup}>
              <Text style={label}>Phone</Text>
              <Text style={value}>{phone}</Text>
            </div>
            <div style={messageContainer}>
              <Text style={label}>Message</Text>
              <Text style={messageStyle}>{message}</Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f8fafc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '24px 0',
  borderRadius: '12px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  maxWidth: '600px',
};

const header = {
  borderBottom: '1px solid #e5e7eb',
  padding: '0 48px 24px',
};

const section = {
  padding: '24px 48px 0',
};

const h1 = {
  color: '#1a2b4b',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0',
  textAlign: 'center' as const,
};

const fieldGroup = {
  marginBottom: '24px',
};

const label = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '20px',
  margin: '0 0 4px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const value = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  fontWeight: '500',
};

const messageContainer = {
  marginBottom: '32px',
};

const messageStyle = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '8px',
  margin: '8px 0 0',
  whiteSpace: 'pre-wrap' as const,
};

export default ContactFormEmail;
