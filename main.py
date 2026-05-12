import discord
from discord.ext import tasks
import aiohttp
import re
import requests
import asyncio
import os

TOKEN_DESTINY = os.environ['TOKEN_DESTINY']
TOKEN_EURO = os.environ['TOKEN_EURO']

# Функція для конвертації в жирний текст
def to_bold(text):
    normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    bold = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
    translation = str.maketrans(normal, bold)
    return text.translate(translation)

class DestinyClient(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())

    async def setup_hook(self):
        print(f'Destiny Bot logged in as {self.user} (ID: {self.user.id})')
        self.update_status_destiny.start()

    @tasks.loop(minutes=1)
    async def update_status_destiny(self):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get('https://aiondestiny.net/api/online') as response:
                    data = await response.json()
                    print(f"AionDestiny API Response: {data}")

                    total_online = data.get('total', 0)
                    light_online = data.get('light', 0)
                    dark_online = data.get('dark', 0)

                    status_text = f"{to_bold(str(total_online))} (Asm:{dark_online}/Ely:{light_online})"
                    emoji = discord.PartialEmoji(name="💻")
                    activity = discord.CustomActivity(name=status_text, emoji=emoji)
                    await self.change_presence(activity=activity)
                    print(f"Destiny Bot Status Updated: {status_text}")

        except Exception as e:
            print(f"Destiny status update error: {e}")

    @update_status_destiny.before_loop
    async def before_update_destiny(self):
        await self.wait_until_ready()

class EuroClient(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())

    async def setup_hook(self):
        print(f'Euro Bot logged in as {self.user} (ID: {self.user.id})')
        self.update_status_euro.start()

    @tasks.loop(minutes=1)
    async def update_status_euro(self):
        try:
            url = 'https://euroaion.com/en-US'
            response = requests.get(url)

            if response.status_code == 200:
                html = response.text

                online_match = re.search(r'<strong>ONLINE</strong>\s*(\d+)', html)
                elyos_match = re.search(r'status-race--elyos.*?(\d+)%', html, re.DOTALL)
                asmodians_match = re.search(r'status-race--asmo[^d].*?(\d+)%', html, re.DOTALL)

                online_count = online_match.group(1) if online_match else "0"
                elyos_percent = elyos_match.group(1) if elyos_match else "0"
                asmodians_percent = asmodians_match.group(1) if asmodians_match else "0"

                status_text = f"{to_bold(online_count)} (Asm:{asmodians_percent}%/Ely:{elyos_percent}%)"
                emoji = discord.PartialEmoji(name="🌐")
                activity = discord.CustomActivity(name=status_text, emoji=emoji)
                await self.change_presence(activity=activity)
                print(f"Euro Bot Status Updated: {status_text}")
            else:
                print("Failed to access EuroAion website")

        except Exception as e:
            print(f"Euro status update error: {e}")

    @update_status_euro.before_loop
    async def before_update_euro(self):
        await self.wait_until_ready()

async def main():
    destiny_client = DestinyClient()
    euro_client = EuroClient()

    await asyncio.gather(
        destiny_client.start(TOKEN_DESTINY),
        euro_client.start(TOKEN_EURO)
    )

if __name__ == "__main__":
    asyncio.run(main())
