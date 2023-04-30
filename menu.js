const { Markup } = require('telegraf')
const lang = require('./lang.js')


class Menu {
    constructor() {
        this.menu = {
            'auth': {
                text: 'Регистрация',
                keyboard: Markup.keyboard([[
                    Markup.button.contactRequest('Зарегистрироваться')
                ]]).oneTime().resize()
            },
            'menu': {
                text: lang.description,
                keyboard: Markup.inlineKeyboard([[
                    Markup.button.callback(lang.promo_btn, 'promo'),
                    Markup.button.callback(lang.gift_btn, 'gift'),
                ],
                [
                    Markup.button.webApp('🍷Меню', 'https://keen-rugelach-795916.netlify.app/'),
                    Markup.button.webApp('❤️‍🔥Крейзи', 'https://bada-bing.ru/'),
                    Markup.button.webApp('🍍Кальян', 'https://cultlounge.ru/')
                ], [
                    Markup.button.callback(lang.about_btn, 'about'),
                    Markup.button.url(lang.vk_btn, lang.vk_url)
                ]])
            },
            // https://menu.restifyone.com/shalnaya_imperatrica
            // https://keen-rugelach-795916.netlify.app/
            'gift': {
                text: lang.gift_desc,
                keyboard: Markup.inlineKeyboard([[
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll')
                ], [
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll'),
                    Markup.button.callback(lang.gift_icon, 'gift_roll')
                ], [
                    Markup.button.callback(lang.back_btn, 'menu')
                ]])
            },

            'promo': {
                text: lang.promo_desc,
                keyboard: Markup.inlineKeyboard([[
                    Markup.button.callback(lang.back_btn, 'menu')
                ]])
            },

            'about': {
                text: lang.about_desc,
                keyboard: Markup.inlineKeyboard([[
                    Markup.button.callback(lang.back_btn, 'menu')
                ]])
            },

            'blank': {
                text: '-',
                keyboard: Markup.inlineKeyboard([[
                    Markup.button.callback(lang.back_btn, 'menu')
                ]])
            },
        }
    }

    get(ctx, slug, options = {}, del = true) {
        if (del) ctx.deleteMessage().catch(e => { })

        let menu = this.menu[slug]
        return ctx.reply(options?.text || menu.text, {
            parse_mode: 'HTML',
            ...options?.keyboard || menu.keyboard
        })
    }
}

module.exports = new Menu()