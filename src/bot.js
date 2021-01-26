import dotenv from 'dotenv'
import { Client } from 'discord.js'

dotenv.config()

const client = new Client({
    partials: ['MESSAGE','REACTION']
})
const PREFIX = '!'

client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`)
})

client.on('message', async(message) => {
    if (message.author.bot)
        return

    console.log(`${message.content} sent by ${message.author.tag}`)

    if (message.content.startsWith(PREFIX)) {
        const [ CMD_NAME, ...args ] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)
        //console.log(CMD_NAME)
        //console.log(args)

        if(CMD_NAME === 'kick') {
            if(!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You lack permission to use that command')
            if(args.length === 0)
                return message.reply('Please provide an ID')
                
            const member = message.guild.members.cache.get(args[0])
            //console.log(member)
            if(member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked`))  
                    .catch((err) => message.channel.send('I do not have permission'))
            }
            else {
                message.channel.send('No such member found!')
            }
        }

        else if(CMD_NAME === 'ban') {
            if(!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('You lack permission to use that command')

            if(args.length === 0)
                return message.reply('Please provide an ID')
            
            try {
                const user = await message.guild.members.ban(args[0])
                message.channel.send(`${user.tag} was banned successfully!`)
            } catch (error) {
                message.reply('An error occured, either i lack authority to ban the user or user does not exist')
            }
            
        }
    }

    if(message.content === 'hi')
        message.channel.send('hi')
})

client.on('messageReactionAdd', (reaction, user) => {

    console.log('Hello!')
    const { name } = reaction.emoji
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '803524719454322749')
        switch (name) {
            case '🧑‍⚕️':
                member.roles.add('803522965471100928')
                break;
            case '🧑‍💻':
                member.roles.add('803523075450339328')
                break;
            case '🧑':
                member.roles.add('803523306187653131')
                break;
            case '🧒':
                member.roles.add('803523648517832715')
                break;
        }
})

client.on('messageReactionRemove', (reaction, user) => {

    console.log('Hello!')
    const { name } = reaction.emoji
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '803524719454322749')
        switch (name) {
            case '🧑‍⚕️':
                member.roles.remove('803522965471100928')
                break;
            case '🧑‍💻':
                member.roles.remove('803523075450339328')
                break;
            case '🧑':
                member.roles.remove('803523306187653131')
                break;
            case '🧒':
                member.roles.remove('803523648517832715')
                break;
        }
})

client.login(process.env.DISCORD_BOT_TOKEN)
//client.login(process.env.DISCORD_BOT_TEMP)


