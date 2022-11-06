const { SlashCommandBuilder, GuildMember, User } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tiktok")
    .setDescription("Use this command to fill in your tikok @")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Enter your tiktok username (PLEASE DO NOT ADD THE @)")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    if (interaction.member.moderatable == false)
      return await interaction.editReply({
        content: "I don't have permissions to do that.",
      });

    //nickname
    const newNick = interaction.options.getString("username");
    interaction.member.setNickname("@" + newNick);

    // role add
    let newRole = interaction.guild.roles.cache.find(
      (r) => r.name == "Verified"
    );

    interaction.member.roles.add(newRole);

    const newMessage = `You have been granted the verification role! You now have access to the server.`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
