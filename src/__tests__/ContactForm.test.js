import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ContactForm from '@/components/ContactForm.vue'

describe('ContactForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ContactForm)
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Contactez-nous')
    expect(wrapper.find('label[for="nom"]').exists()).toBe(true)
    expect(wrapper.find('label[for="email"]').exists()).toBe(true)
    expect(wrapper.find('label[for="message"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('disables submit button when form is invalid', async () => {
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })

  it('enables submit button when form is valid', async () => {
    await wrapper.find('#nom').setValue('Test User')
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#message').setValue('This is a test message with enough characters')

    // Trigger validation
    await wrapper.find('#nom').trigger('input')
    await wrapper.find('#email').trigger('input')
    await wrapper.find('#message').trigger('input')

    await flushPromises()

    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined()
  })

  it('displays error for empty name field', async () => {
    const nomInput = wrapper.find('#nom')
    await nomInput.setValue('')
    await nomInput.trigger('blur')
    await nomInput.trigger('input')

    await flushPromises()

    const errorMsg = wrapper.find('div.text-red-500')
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toBe('Le nom est requis')
  })

  it('displays error for invalid email format', async () => {
    await wrapper.find('#nom').setValue('Test Name')
    await wrapper.find('#nom').trigger('input')

    const emailInput = wrapper.find('#email')
    await emailInput.setValue('invalid-email')
    await emailInput.trigger('blur')
    await emailInput.trigger('input')

    await flushPromises()

    const errorMsg = wrapper.find('input#email + div.text-red-500')
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toBe('Veuillez entrer un email valide')
  })

  it('displays error for too short message', async () => {
    await wrapper.find('#nom').setValue('Test Name')
    await wrapper.find('#nom').trigger('input')
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#email').trigger('input')

    const messageInput = wrapper.find('#message')
    await messageInput.setValue('Short')
    await messageInput.trigger('blur')
    await messageInput.trigger('input')

    await flushPromises()

    const errorMsg = wrapper.find('textarea#message + div.text-red-500')
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toContain('Le message doit contenir au moins 10 caractères')
  })

  it('submits the form successfully when all fields are valid', async () => {
    const consoleSpy = vi.spyOn(console, 'log')

    await wrapper.find('#nom').setValue('Test User')
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#message').setValue('This is a test message with enough characters')

    await wrapper.find('#nom').trigger('input')
    await wrapper.find('#email').trigger('input')
    await wrapper.find('#message').trigger('input')

    await flushPromises()

    await wrapper.find('form').trigger('submit')

    await flushPromises()

    expect(consoleSpy).toHaveBeenCalledWith('Formulaire soumis:', {
      nom: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message with enough characters',
    })
  })
})
