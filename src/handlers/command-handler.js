import { readdirSync } from 'fs';
import { bot } from '../index.js';

export class CommandHandler {
  commands = new Map();
  async init() {
    const fileNames = readdirSync('./src/handlers/commands');
    for (const name of fileNames) {
      const { default: Command } = await import(`./commands/${name}`);
      const command = new Command();
      if (!command.name) continue;

      this.commands.set(command.name, command);
    }
  }
  async handle(prefix, msg) {
    try {
      const words = msg.content.slice(prefix.length).split(' ');

      await this.commands.get(words[0]).execute(msg, ...words.slice(1));
    } catch (error) {
      await msg.reply(`⚡`);
    }
    console.log(`${fileName.length - 1} commands were loaded.`);
  }
}
