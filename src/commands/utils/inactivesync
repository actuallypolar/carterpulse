const { SlashCommandBuilder, GuildMember } = require("discord.js");
const { execute } = require("../../events/client/ready");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inactivesync")
    .setDescription(
      "Tag creators who are inactive"
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
        fs.readFileSync("../pending_to_tag_inactive.json")
      );
    } catch (error) {
      console.error(`Error reading usernames.json: ${error}`);
      return;
    }

    const members = await interaction.guild.members.fetch({ force: true });
    const channel = await client.channels.fetch("1075186276191449148");

    // Get the role to add
    const roleToAdd = interaction.guild.roles.cache.find(
      // Role name to want to assign
      (r) => r.name === "INACTIVE_ROLE_NAME"
    );

    if (!roleToAdd) {
      return await interaction.editReply({
        content: "Role not found on this server.",
      });
    }

    // Loop through the list of usernames
    for (const username of usernames) {
      // Try to find a matching member in the server
      let member = members.find((member) =>
        member.displayName.toLowerCase().includes(username.toLowerCase())
      );

      // If a matching member was found, log their user ID and add role
      if (member) {
        await member.roles.add(roleToAdd).catch(console.error);
        channel.send({
          content: `**(${member.id})**, ${member.displayName} has been assigned the role **${roleToAdd.name}**`,
        });
      } else {
        channel.send({
          content: `No user found with username **${username}**`,
        });
      }
    }

    await interaction.editReply({
      content: "Role assignment complete!",
    });
  },
};
