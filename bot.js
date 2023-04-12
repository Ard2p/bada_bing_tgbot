const { Telegraf, session, Scenes: { Stage } } = require('telegraf')
const moment = require('moment'); 

const DB = require('./models')
const Menu = require('./menu')
const lang = require('./lang.js')

const bot = new Telegraf(process.env.TOKEN_TG)

bot.start(ctx => {
  return Menu.get(ctx, 'menu')
})

bot.action('menu', ctx => {
  return Menu.get(ctx, 'menu')
})

bot.action('promo', ctx => {
  return Menu.get(ctx, 'promo')
})

bot.action('about', ctx => {
  return Menu.get(ctx, 'about')
})

bot.action('gift', async ctx => {
  let tg_id = ctx.update.callback_query.message.chat.id
  let giftDB = await DB.gift.findOne({
    where: {
      tg_id: tg_id,
      createdAt: { [DB.Sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) }
    }
  })

  if (giftDB) {
    let date = moment(giftDB.createdAt).add(1, 'd').format('DD.MM HH:mm МСК') 
    let gift = giftDB.gift
    return Menu.get(ctx, 'blank', { text: replaceVar(lang.gift_give, { date, gift }) })
  } else return Menu.get(ctx, 'gift')
})

bot.action('gift_roll', async ctx => {
  ctx.deleteMessage().catch(e => { })

  let tg_id = ctx.update.callback_query.message.chat.id
  let gift = lang.gifts[Math.floor(Math.random() * lang.gifts.length)]

  await DB.gift.create({
    tg_id: tg_id,
    gift: gift
  }).then(async () => {
    let date = moment().add(1, 'd').format('DD.MM HH:mm МСК') 
    await Menu.get(ctx, 'blank', { text: replaceVar(lang.gift_give, { date, gift }) })
  }).catch(async err => {
    console.log(err)
    await ctx.reply('Ой, что то пошло не так!')
  })
})

function replaceVar(text, data) {
  var regex = new RegExp('{(' + Object.keys(data).join('|') + ')}', 'g')
  return text.replace(regex, (m, $1) => data[$1] || m)
}

module.exports = bot //44