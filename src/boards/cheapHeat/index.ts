// tslint:disable

// Audio
import allAudio from '../../assets/audio/all_audio.wav';

export interface AudioSpriteData {
    id: string
    title: string
    start: number
    length: number
    categories: string[]
}

export const allAudioSrc = allAudio;

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
            title: `He can't get past a guy who's just shady`,
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
            title: 'Maj-or',
            start: 57879,
            length: 845,
            categories: ['Dip']
        },
        mmmMaj: {
            id: 'mmmMaj',
            title: 'M-m-m-maj',
            start: 61838,
            length: 1261,
            categories: ['Dip']
        },
        theMajesty: {
            id: 'theMajesty',
            title: 'The Majesty',
            start: 66485,
            length: 1463,
            categories: ['Dip']
        },
        mmmMail: {
            id: 'mmmMail',
            title: 'M-m-m-mail',
            start: 71025,
            length: 2317,
            categories: ['Dip']
        }
    }
}