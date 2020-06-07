const discord = require('discord.js');
const client = new discord.Client();
const shell = require('shelljs');
const querystring = require('querystring');
const axios = require('axios');
const token = 'NzA3OTc4NzQ2MzM3OTUxNzQ0.XsTQlg.2dQMj3otbSQb7szqq2mN_maaNzk';
const googleapi = 'AIzaSyDpHliP1QKd9r4vZssPid4jam4Pz5XxZ9w';


client.login(token);



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Set Status~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

client.on('ready', () => {
	console.log(`Bot up and Running as ${client.user.tag}!`);
	let act = ["WATCHING", "PLAYING", "STREAMING", "LISTENING"];
	let i = 0;
	let mum = ["your mum", "with your mum", "your mum", "to your mum whine"];

	client.user.setActivity(mum[i], { type: act[i] });

	setInterval(() => {
		if (i > act.length) { i = 0; }

		client.user.setActivity(mum[i], { type: act[i] });
		//console.log("i : " + i) ;             
		i++;
	}, 1000 * 1000 * 15);

});




//~~~~~~~~~~~~~~~~~~~~~~~~~~Start/Stop the Server~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

client.on('message', msg => {
	if (msg.content === 'chotu server chalu krr' || msg.content === 'server chalu krr bsdk' || msg.content === 'server chala' || msg.content === 'chotu server chala' || msg.content === 'server chalu karr bhosdi') {

		if (msg.member.roles.cache.has('707679480591810611')) {
			msg.reply('starting the server ji');
			shell.exec(__dirname + '/scripts/start.sh', { silent: true, async: true });
		}

		else {
			msg.reply('you has insufficient permission ji');
		}

	};

	if (msg.content === '--stop') {
		client.channels.cache.get('707676980127989940').send('stop');
	};
});




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Commands~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//yt.

client.on('message', msg => {
	if (msg.content.startsWith('yt.')) {
		if (!(msg.content === 'yt.' || msg.content === 'yt. ')) {
			let search = {
				q: msg.content.split('yt.')[1],
				part: 'snippet',
				maxResults: 30,
				key: googleapi
			}
			//console.log(msg.author.id) ;
			axios.get('https://www.googleapis.com/youtube/v3/search?' + querystring.stringify(search))
				.then((res) => {
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

						yt(i);

						const filter = (m) =>{
							/**m.author.id === msg.author.id &&**/ m.content === 'n'
						} ;

						/**const collector =**/ msg.channel.awaitMessages(filter,
															{
																max: 1, 
																time : 10*1000 ,
																errors : ['time']
															})
														.then((collected)=> {
															i++ ;
															yt(i) ;
														})
														.catch( (collected)=>{
															console.log('nope') ;
														});


					}	
				}).catch((err)=> {
					console.log(err);
				});

		
		

		
		}
	
		else {
			msg.channel.send(
			new discord.MessageEmbed().setColor('#0099ff').setTitle('Error').setDescription('Input some valid search term')
			);
		}

	}

});



