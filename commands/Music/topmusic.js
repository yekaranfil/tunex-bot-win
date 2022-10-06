const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const prettyMilliseconds = require("pretty-ms");
const qdb = require('quick.db');


module.exports = {
  name: "topmusic",
  description: "Saves the current song to your Direct Messages",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["t","top"],
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/

run: async (client, message, args, { GuildDB }) => {

  const embedreis1 = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setTitle(`${client.user.username} Topmusic Rol Paneli`)
  .addField("(!topmusic kaydet)Dostum, topmusic kullanmayı bilmiyorsan;","**topmusic yardım** yazmalısın")
  .setFooter(client.user.tag)
  if(!args[0]) return message.channel.send(embedreis1)
  if(args[0] === "ayarla"){
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için gerekli iznin yok');
  var kanal = message.mentions.channels.first();
  const embedreis2 = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setTitle(`${client.user.username} topmusic Paneli`)
  .setDescription("Dostum, bir kanal belirtmen gerekli!")
  .setFooter(client.user.tag)
    if(!kanal) return message.channel.send(embedreis2)
        const embedreis3 = new Discord.MessageEmbed()
  qdb.set(`topmusickanali_${message.guild.id}`, kanal.id)
      const embedreis4 = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setTitle(`${client.user.username} topmusic  Paneli`)
  .setDescription(`
  topmusic kanalı <#${kanal.id}> kanalına ayarlandı!
  `)
  .setFooter(client.user.tag)
    return message.channel.send(embedreis4)

    }

    if(args[0] === "sıfırla") {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için gerekli iznin yok');
    var kanal1 = qdb.fetch(`topmusickanali_${message.guild.id}`)
    if(kanal1) {var kanalMesaj = "*topmusic Kanalı Veri Tabanı Başarıyla Sıfırlandı!*"}
    if(!kanal1) {
      var kanalMesaj = "**topmusic Kanalı Zaten Ayarlanmamış!**"
    }
    
  const sıfırlama1 = new Discord.MessageEmbed()
    .setColor('BLACK')
  .setTitle(`${client.user.username} | Oto Rol Sistemi!`)  
  .setDescription(`${kanalMesaj} \n`)
     qdb.delete(`topmusickanali_${message.guild.id}`) 

  
  return message.channel.send(sıfırlama1)
    
    }
    if(args[0] === "yardım"){
        const embedimsi = new Discord.MessageEmbed()
      .setColor('#000000')
      .setAuthor(`${client.user.username} topmusic Paneli!`)
        .setDescription(`
      **topmusic kaydet **
     Ayarlanan kanala çalan şarkıyı kaydeder.

      **topmusic ayarla #kanal #rol**
      topmusic kanalını ve rolünü ayarlarsınız
      
      **topmusic sıfırla**
      topmusic veritabanını sıfırlarsınız 
      `)
      .setFooter(client.user.tag)
      message.channel.send(embedimsi)
  }
   

  if(args[0]==="kaydet"){
    kaydet();
  }
    
  async function kaydet() {
    var kanal = qdb.fetch(`topmusickanali_${message.guild.id}`);
    var kanalcik = message.guild.channels.cache.get(kanal)
    if (!kanalcik) return client.sendTime(message.channel, "❌ | **LÜTFEN ÖNCE BİR TOPMUSİC KANALI BELİRLEYİN !t yardım**");
    //console.log(kanalcik)
    let player = await client.Manager.get(message.guild.id);
    if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bir şey çalmak için bir ses kanalında olmalısınız!**");
          if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
     client.channels.cache.get(kanalcik.id).send(new MessageEmbed()
     .setAuthor(`KAYDEDİLEN ŞARKI :`, client.user.displayAvatarURL({
      dynamic: true
    }))
    .setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
    .setURL(player.queue.current.uri)
    .setColor("YELLOW")
    .setTitle(`**${player.queue.current.title}**`)
    .addField(`▶ Oynatma uzantısı(direk kopyalayın):`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
    }play ${player.queue.current.uri}\``)
    .addField(`🔎 Kaydedildiği kanal:`, `<#${message.channel.id}>`)
    .setFooter(`Ekleyen: ${player.queue.current.requester.tag} | Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
      dynamic: true
    }))
      ).catch(e=>{
        return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
        
    })
  
   client.sendTime(message.channel, `<a:SabitGif:821076744303935538> | **🎧⠂top-musics kanalınına ekledim kontrol etmeyi unutma!**`)
  
  }
  },
 


  SlashCommand: {
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/
  run: async (client, interaction, args, { GuildDB }) => {
    const guild = client.guilds.cache.get(interaction.guild_id);
    const user = client.users.cache.get(interaction.member.user.id);
    const member = guild.members.cache.get(interaction.member.user.id);
    let player = await client.Manager.get(interaction.guild_id);
    if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor ..**");
    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmanız gerekir.**");
    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
    try{
    let embed = new MessageEmbed()
      .setAuthor(`Saved Song: `, client.user.displayAvatarURL())
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor("RANDOM")
      .setTimestamp()
      .setTitle(`**${player.queue.current.title}**`)
      .addField(`⌛ Süre: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
      .addField(`🎵 Yazar: `, `\`${player.queue.current.author}\``, true)
      .addField(`▶ Oynatılan:`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
        }play ${player.queue.current.uri}\``)
      .addField(`🔎 Kaydedildi:`, `<#${interaction.channel_id}>`)
      .setFooter(`İsteyen: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      }))
      user.send(embed);
    }catch(e) {
      return client.sendTime(interaction, "**:x: Dm'lerin devredışı*")
    }

    client.sendTime(interaction, "✅ | **DM'lerini kontrol et yolladım!**")
  },
  },
};