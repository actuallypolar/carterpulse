const { SlashCommandBuilder, GuildMember } = require("discord.js");
const { execute } = require("../../events/client/ready");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removalsync")
    .setDescription(
      "Purge the members list for people who have been removed from the agency."
    ),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    if (interaction.member.id != "270693822088871937")
      return await interaction.editReply({
        content: "You don't have permissions to do that.",
      });

    let usernames;
    try {
      usernames = JSON.parse(
        fs.readFileSync("../pending_to_remove_secondary.json")
      );
    } catch (error) {
      console.error(`Error reading usernames.json: ${error}`);
      return;
    }

    const members = await interaction.guild.members.fetch({ force: true });
    const channel = await client.channels.fetch("1075186276191449148");

    // Loop through the list of usernames
    for (const username of usernames) {
      // Try to find a matching member in the server
      let member = members.find((member) =>
        member.displayName.includes(username)
      );

      // If a matching member was found, log their user ID
      if (member) {
        member.kick("Removed from the agency");
        channel.send({
          content: `**(${member.id})**, ${member.displayName} has been removed`,
        });
      } else {
        channel.send({
          content: `No user found with username **${username}**`,
        });
      }
    }

    await interaction.editReply({
      content: "Purge done!",
    });
  },
};
