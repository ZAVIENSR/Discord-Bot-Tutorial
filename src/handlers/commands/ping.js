import Command from './command.js';

export default class extends Command {
  name = 'ping';

  async execute(msg, ...args) {
    await msg.reply('pong');
  }
}
