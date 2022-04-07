import emailjs from 'emailjs-com'

const serviceId = 'service_1s5sr7r'
const templateId = 'default'
const userId = '0tddVW-WIOMnOHjpe'

export const sendEmail = async (name, email, message) => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      { name, email, message },
      userId,
    )

    if (response.status === 200) {
      console.log('Successfully sent message.')
    }
  } catch (error) {
    console.error('Failed to send email. Error: ', error)
  }
}
