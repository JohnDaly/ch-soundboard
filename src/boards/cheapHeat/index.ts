// tslint:disable

// Audio
// import allAudio from '../../assets/audio/all_audio.wav';
import allAudioMp3 from '../../assets/audio/all_audio_small.mp3';

export interface AudioSpriteData {
    id: string
    title: string
    start: number
    length: number
    categories: string[]
}

export const allAudioSrc = allAudioMp3;

export const soundboardConfig = (): { [key: string]: AudioSpriteData } => {
    return {
        notAWinner: {
            id: 'notAWinner',
            title: `He's not a winner.`,
            start: 331,
            length: 1269,
            categories: ['Morris']
        },
        iSee: {
            id: 'iSee',
            title: `I see, uh huh.`,
            start: 4485,
            length: 1765,
            categories: ['Morris']
        },
        soHappy: {
            id: 'soHappy',
            title: `I was so happy.`,
            start: 9421,
            length: 2053,
            categories: ['Morris']
        },
        imSorry: {
            id: 'imSorry',
            title: `Oh, I'm sorry.`,
            start: 14326,
            length: 1504,
            categories: ['Morris']
        },
        hurtingMe: {
            id: 'hurtingMe',
            title: `You're hurting me.`,
            start: 19144,
            length: 1791,
            categories: ['Morris']
        },
        deliciousChicken: {
            id: 'deliciousChicken',
            title: `I like delicious chicken.`,
            start: 23750,
            length: 1520,
            categories: ['Greg']
        },
        ohMyGoodness: {
            id: 'ohMyGoodness',
            title: `Oh my goodness.`,
            start: 28353,
            length: 1595,
            categories: ['Greg']
        },
        shawnTopTen: {
            id: 'shawnTopTen',
            title: `I don't know if I have Shawn top ten.`,
            start: 32882,
            length: 1552,
            categories: ['Greg']
        },
        itsProfessionalWrestling: {
            id: 'itsProfessionalWrestling',
            title: `It's professional wrestling.`,
            start: 36983,
            length: 1945,
            categories: ['Greg']
        },
        guyWhoIsJustShady: {
            id: 'guyWhoIsJustShady',
            title: `He can't get past a guy who's just shady.`,
            start: 41835,
            length: 2149,
            categories: ['Greg']
        },
        thanksForNothingShaq: {
            id: 'thanksForNothingShaq',
            title: 'Thanks for nothing, Shaq.',
            start: 46823,
            length: 2108,
            categories: ['Greg']
        },
        replicaBelts: {
            id: 'replicaBelts',
            title: 'People buy replica belts all the time.',
            start: 51778,
            length: 2789,
            categories: ['Greg']
        },
        majOr: {
            id: 'majOr',
            title: 'Maj-or.',
            start: 57879,
            length: 845,
            categories: ['Dip']
        },
        mmmMaj: {
            id: 'mmmMaj',
            title: 'M-m-m-maj.',
            start: 61838,
            length: 1261,
            categories: ['Dip']
        },
        theMajesty: {
            id: 'theMajesty',
            title: 'The Majesty.',
            start: 66485,
            length: 1463,
            categories: ['Dip']
        },
        mmmMail: {
            id: 'mmmMail',
            title: 'M-m-m-mail.',
            start: 71025,
            length: 2317,
            categories: ['Dip']
        },
        gargantch: {
            id: 'gargantch',
            title: 'Gargantch.',
            start: 76042,
            length: 549,
            categories: ['Dip']
        },
        itWasRepug: {
            id: 'itWasRepug',
            title: 'It was repug.',
            start: 79032,
            length: 940,
            categories: ['Rosenberg']
        },
        itsStillReal: {
            id: 'itsStillReal',
            title: 'Its still real to me.',
            start: 82192,
            length: 2508,
            categories: ['Emotional Fan']
        },
        itsStillRealLong: {
            id: 'itsStillRealLong',
            title: 'Its still real to me (long).',
            start: 87189,
            length: 12095,
            categories: ['Emotional Fan']
        },
        speculatch: {
            id: 'speculatch',
            title: 'Speculatch.',
            start: 101021,
            length: 784,
            categories: ['Rosenberg']
        },
        jeffHarvey: {
            id: 'jeffHarvey',
            title: 'Jeff Harvey.',
            start: 103010,
            length: 6792,
            categories: ['Misc']
        },
        sugarHillGang: {
            id: 'sugarHillGang',
            title: 'Sugar Hill Gang.',
            start: 111146,
            length: 3527,
            categories: ['Greg']
        },
        putThatCigOut: {
            id: 'putThatCigOut',
            title: 'Put that cigarette out.',
            start: 116358,
            length: 1411,
            categories: ['Mean Gene'],
        },
        itsNotABelt: {
            id: 'itsNotABelt',
            title: 'Its not a belt.',
            start: 120005,
            length: 1750,
            categories: ['Misc'],
        },
        hoganBotch1: {
            id: 'hoganBotch1',
            title: 'Hogan Botch 1.',
            start: 125135,
            length: 22309,
            categories: ['Hulk Hogan'],
        },
        hoganRock: {
            id: 'hoganRock',
            title: 'I had a match with a Rock.',
            start: 150934,
            length: 3579,
            categories: ['Hulk Hogan'],
        },
        bretHartArtform: {
            id: 'bretHartArtform',
            title: 'Bret Hart is the greatest professional wrestler.',
            start: 157792,
            length: 6818,
            categories: ['Greg'],
        },
        physicallyLarge: {
            id: 'physicallyLarge',
            title: 'The Physically Large.',
            start: 167014,
            length: 1269,
            categories: ['Rosenberg'],
        }
    }
}