const { SlashCommandBuilder, GuildMember } = require("discord.js");
const { execute } = require("../../events/client/ready");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the ping of the bot.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        const clientPing = message.createdTimestamp - interaction.createdTimestamp

        const newMessage = `**API Latency**: \`${client.ws.ping}ms\`\n**Client Latency:** \`${clientPing}ms\``
        await interaction.editReply({
            content: newMessage
        })
    }
}