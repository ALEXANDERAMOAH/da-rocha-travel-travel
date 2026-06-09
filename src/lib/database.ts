import { supabase } from './supabase'

export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactMessage(data: ContactMessage) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { error } = await supabase.from('contact_messages').insert({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    subject: data.subject,
    message: data.message,
  })

  if (error) throw error
}

export async function subscribeNewsletter(email: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email,
  })

  if (error) throw error
}