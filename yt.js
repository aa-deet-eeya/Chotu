const discord = require('discord.js') ;
const axios = require('axios') ;
const querystring = require('querystring') ;
const client = new discord.Client() ;


const token = '' ;
const googleapi = '' ;


client.login(token); 

client.on('message', msg=>{
    if(msg.content === 'ping'){
        console.log('pong') ;
        msg.reply('pong') ;
    }
}) ;

client.on('message' , msg => {
    if( msg.content === 'yt.'){
        let search = {
            q: msg.content.split('yt.')[1] ,
            part: "snippet" ,
            maxResult : 30 ,
            key : googleapi 
        } ;

        axios.get('https://www.googleapis.com/youtube/v3/search?' + querystring.stringify(search))
                .then((res)=>{
                    var i = 0;

					if (typeof res.data.items[i] === 'undefined') {
						msg.channel.send(
							new discord.MessageEmbed().setColor('#0099ff').setTitle('404').setDescription('No video found')

						);
					}

					else {

						const yt = (i)=> {
							if(i < (res.data.items.length) ) {
								let link = ('https://www.youtube.com/watch?v=' + res.data.items[0].id.videoId);


								var ytembed = new discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle(res.data.items[i].snippet.title)
									.setURL(link)
									.setAuthor(res.data.items[i].snippet.channelTitle)
									.setDescription(res.data.items[i].snippet.description)
									.setImage(res.data.items[i].snippet.thumbnails.high.url);

							}
						
							else {
								var ytembed = new discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('No more Results')
									.setDescription('End of search results');
							}

						msg.channel.send(ytembed);
                        }
                        
                        yt(i) ;

						yt(i).then(()=>{
                            message.channel.awaitMessages(response => response.content === 'n' ,{
                                max : 1,
                                time : 15*1000,
                                errors: ['time'] ,
                            })
                            .then((collected)=>{
                                msg.channel.send('yes') ;
                                console.log('yes') ;
                            })
                            .catch((collected)=>{
                                msg.channel.send('no') ;
                                console.log('nope') ;
                            }) ;
                        });
                    }
                }) ;

    } ;

}) ;
