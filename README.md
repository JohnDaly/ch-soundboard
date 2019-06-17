# React Soundboard

A soundboard application, built with React, and inspired by the frequent drops used on the [Cheap Heat](http://www.espn.com/espnradio/podcast/archive/_/id/10116533) podcast. The application is built so that new soundboards can be created easily with its general components.

## Built With:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Howler](https://howlerjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Styled Components](https://www.styled-components.com/)

## Example Application

The Cheap Heat soundboard application is hosted [here](https://johndaly.github.io/ch-soundboard/)

## Building your own Soundboard

There are two main ingredients to building a soundboard with this application:

1. An audio file comprised of sound clips
2. A configuration file, which includes information about the sound clips

### Creating the source audio file

Due to limitations of browser audio playback, the recommended approach is to have all of your sound clips (audio sprites) in one file. There are a lot of sound editing tools available to piece together your source track, I have used [Audacity](https://www.audacityteam.org/), but you can use whatever software you feel most comfortable with.

When putting together your audio track, be sure to provide some spacing between clips, so that you don't get clips that overlap one another. You are also going to want to take note of the timestamps of when clips stop, and how long each individual clip is; you will need this information for when you are building the configuration for your sound board.

Once you have your track put together, and exported in a valid file format (.mp3, .wav), you will be ready to create your configuration file.

### Create the soundboard configuration

The soundboard configuration object is a map of `AudioSpriteData` objects, with the objects being keyed by their `id` field. Here is what an `AudioSpriteData` object looks like:

```typescript
{
    id: string,
    title: string,
    start: number,
    length: number,
    categories: string[]
}
```

Here is what each field is used for:

|Name | Type | Description |
|-------|-------|----------|
| id | string | A unique identifier for the sound clip
| title | string | The text that will appear on the SoundPad component
| start | number | The time (in milliseconds) where the clip starts in the source file
| length | number | The duration (in milliseconds) of the sound clip
| categories | string[] | A list of categories that are related to the sound clip

### Putting it together

I would recommend putting the source audio file in the `assets/audio` directory. The configuration object can be placed in the `boards/<your-board-name-here>` directory. You can export both the source audio and the configuration object from the file in the `boards` directory, and then import them in the `App.tsx` file.

You can see how it is done for the Cheap Heat soundboard by looking at the `boards/cheapHeat/index.ts` file.