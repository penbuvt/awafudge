# awafudge

A brainfuck-based esoteric programming language inspired by [Phase Connect][] talent [Jelly Hoshiumi][].

[Phase Connect]: https://phase-connect.com/
[Jelly Hoshiumi]: https://www.youtube.com/@JellyHoshiumi

## Original proposal

The [original proposal](https://discord.com/channels/857035276538609674/1108627547287199754/1148265859446493204) for the modern iteration of the language was sent by Penbu in the Phase Connect Discord server on September 4, 2023:

> I thought about it some more and I've come up with something I (mostly) like. It's not a trivial substitution so we'll have to write a dedicated compiler/transpiler for it, but it still maps back to brainfuck pretty easily.
> 
> The base mapping:
> ```
> > awa~
> < wa~
> + awa
> - wa
> . .
> , ,
> [ ?
> ] !
> ```
> 
> The number of `wa`s in the `awa`/`wa`-type operators indicates how many times to repeat, so `awawawa` translates to `+++` and `wawawawawa~` is `<<<<<`. `+` and `-` must be separated by whitespace from the next token if it would be ambiguous (i.e. `+-`, `+<` and `-<` combinations), but whitespace is otherwise optional.  The symbol-type operators repeat as normal by simply repeating the character.
> 
> The [Hello World program](<https://esolangs.org/wiki/Brainfuck#Hello,_World!>) on the Esolang wiki:
> ```brainfuck
> ++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
> ```
> translates to this using that awawawa scheme:
> ```
> awawawawawawawawa? awa~ awawawawa? awa~ awawa awa~ awawawa awa~ awawawa awa~ awa wawawawa~ wa! awa~ awa awa~ awa awa~ wa awawa~ awa? wa~! wa~ wa! awawa~. awa~ wawawa. awawawawawawawa.. awawawa. awawa~. wa~ wa. wa~. awawawa. wawawawawawa. wawawawawawawawa. awawa~ awa. awa~ awawa.
> ```
> Admittedly, formatting `?` and `!` this way without leading spaces makes the loop a little misleading, but it makes the text look better.
> 
> Here it is without unnecessary whitespace:
> ```
> awawawawawawawawa?awa~awawawawa?awa~awawaawa~awawawaawa~awawawaawa~awa wawawawa~wa!awa~awaawa~awaawa~waawawa~awa?wa~!wa~wa!awawa~.awa~wawawa.awawawawawawawa..awawawa.awawa~.wa~wa.wa~.awawawa.wawawawawawa.wawawawawawawawa.awawa~awa.awa~awawa.
> ```

## License

This work is licensed under the MIT. See the [LICENSE][] file for details.

[LICENSE]: ./LICENSE
