const { SlashCommandBuilder, GuildMember } = require("discord.js");
const { execute } = require("../../events/client/ready");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flushverified")
    .setDescription("Flush the verified members list."),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    if (interaction.member.id != "270693822088871937")
      return await interaction.editReply({
        content: "You don't have permissions to do that.",
      });

    const members = await interaction.guild.members.fetch({ force: true });

    let verifiedRole = interaction.guild.roles.cache.find(
      (r) => r.name == "Verified"
    );

    const filterMembers = members.filter((m) => !m.displayName.includes("@"));
    filterMembers.forEach((element) => element.roles.remove(verifiedRole));

    await interaction.editReply({
      content: "Non-verified members flushed successfully!",
    });
  },
};
