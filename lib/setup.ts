import { SlashCreator } from "slash-create";
import { commands, getSlashEnv } from "./common";

export async function handler() {
  // Sync all commands before publishing
  const creator = new SlashCreator(getSlashEnv());
  await creator.registerCommands(commands).syncCommandsAsync();
  return "Setup completed";
}

// Hack to allow us to execute this script directly, when developing
if (require.main === module) {
  handler();
}
