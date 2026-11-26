const { BrevoClient } = require('@getbrevo/brevo')


const client = new BrevoClient({
    apikey:process.env.BREVO_API_KEY
})

const sendEmail = async(content)=>{
    try{
        await client.transactionalEmails.sendTransacEmail({
            sender:{
                name:"User onboarding",
                email:process.env.BREVO_EMAIL
            },
            to:[{
                name:content.name,
                email:content.email

            }],
            subject:content.subject,
            htmlContent:content.htmlContent
        })

        console.log('Email sent successfully: ', response.messageId)
    }catch(error){
        console.log('failure to send email: ', error)
    }

}

module.exports = sendEmail