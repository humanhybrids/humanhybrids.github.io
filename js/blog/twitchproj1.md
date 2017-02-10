
# Concept

Today I am starting a new research project. It is my hope that this project will encompass various aspects of
data science and artificial intelligence in an interesting way.

The idea is to gather information from a streaming service that provides simultaneous feedback from viewers
and extract moments and quotes from the streaming video corresponding to greatest viewer response. I am hoping to
incorporate information from across the length of the stream and subsequent streams (cross references to specific
moments with user reaction).

# Step 1: Choosing a target platform

There are several streaming services that provide simultaneous viewer interaction. 

## Twitch

[Twitch](https://www.twitch.tv) is probably the most viable option for this project as it provides capabilities for viewing past broadcasts
with the chat logs from those broadcasts. However, their public API does not provide the ability to access stream data or chat logs so 
this information will need to be scraped using a 3rd party library or tool (or a tool will need to be developed). Twitch is primarily for
gaming streams so the scope of content will be limited.

## UStream

[UStream](http://www.ustream.tv) is another option. It offers live chat and the ability to view past broadcasts; however, the chat for 
past broadcasts does not appear to be included. UStream provides streaming services for a wide range of content material. UStream's 
public API does provide the ability to access stream data and chat logs.

## YouTube Live

[YouTube Live](https://www.youtube.com/live) offers live streaming and interactive chat. Will need to look into getting stream and chat data; 
however, they have a well developed API and libraries for almost every platform. This may be a better option if chat logs are available for 
previous broadcasts.
