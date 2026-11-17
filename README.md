# Napoleon Bonaparte — The Emperor of Johto

A 25-chapter animated fan story in Brazilian Portuguese that imagines Napoleon arriving in Johto and learning to become a Pokémon trainer. JavaScript renders the scenes as animated SVG, with subtitles, optional browser narration, and generated ambient sound.

## Build and watch

1. Install Node.js and run `node montar.cjs` from this directory.
2. Open the generated `napoleao_johto_animacao.html` file in a browser and start playback.
3. Use the timeline to seek or the **Capítulos** menu to jump to a chapter. Press **Esc** to pause. Use the on-screen controls to adjust narration, sound, and subtitles.

The build uses Node.js built-in modules. The rendered episode draws its scenes from the source code. Narration uses the browser's available Portuguese voice.

## Source files

| File | Role |
| --- | --- |
| `johto_story.js`, `johto_journey.js`, `johto_survival.js` | Story chapters and narrative sequences. |
| `johto_art.js`, `johto_sets.js`, `johto_fx.js` | SVG drawings, scene composition, animation, and effects. |
| `johto_player.js` | Playback, timeline, subtitles, narration, and audio controls. |
| `johto_shell.html`, `montar.cjs` | Page layout and the script that assembles the standalone HTML. |

## References

The player includes the original historical and adaptation references. Johto and Pokémon are part of the Pokémon franchise. The setting reference is [A Visitor's Guide to Johto](https://www.pokemon.com/uk/features/a-visitors-guide-to-johto).
