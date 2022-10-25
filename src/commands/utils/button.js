const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { execute } = require("../../events/client/ready");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Returns a button.'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setCustomId('nickname-change')
            .setLabel(`Test`)
            .setStyle(ButtonStyle.Success);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        })
    }
}