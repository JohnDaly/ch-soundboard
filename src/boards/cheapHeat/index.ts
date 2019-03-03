// tslint:disable

// Audio
import allAudio from '../../assets/audio/all_audio.wav';

// Morris
import notAWinner from '../../assets/audio/hes_not_a_winner.wav';
import iSee from '../../assets/audio/i_see_uhhuh.wav';
import soHappy from '../../assets/audio/i_was_so_happy.wav';
import imSorry from '../../assets/audio/oh_im_sorry.wav';
import hurtingMe from '../../assets/audio/youre_hurting_me.wav';

// Greg
import deliciousChicken from '../../assets/audio/i_like_delicious_chicken.wav';
import ohMyGoodness from '../../assets/audio/oh_my_goodness.wav';
import shawnTopTen from '../../assets/audio/shawn_top_ten.wav';
import itsProfessionalWrestling from '../../assets/audio/its_professional_wrestling.wav';
import guyWhoIsJustShady from '../../assets/audio/guy_who_is_just_shady.wav';
import thanksForNothingShaq from '../../assets/audio/thanks_for_nothing_shaq.wav';
import replicaBelts from '../../assets/audio/replica_belts_all_the_time.wav';

// Dip
import majOr from '../../assets/audio/maj-or.wav';
import mmmMaj from '../../assets/audio/m_m_m_maj.wav';
import theMajesty from '../../assets/audio/the_majesty.wav';
import mmmMail from '../../assets/audio/m_m_m_mail.wav';

export interface AudioSpriteData {
    id: string
    title: string
    start: number
    length: number
    audio: HTMLAudioElement
    categories: string[]
}

export const allAudioConfig = new Audio(allAudio);

export const soundboardConfig = (): { [key: string]: AudioSpriteData } => {
    return {
        notAWinner: {
            id: 'notAWinner',
            title: `He's not a winner.`,
            start: 0.331,
            length: 1.269,
            audio: new Audio(notAWinner),
            categories: ['Morris']
        },
        iSee: {
            id: 'iSee',
            title: `I see, uh huh.`,
            start: 4.485,
            length: 1.765,
            audio: new Audio(iSee),
            categories: ['Morris']
        },
        soHappy: {
            id: 'soHappy',
            title: `I was so happy.`,
            start: 9.421,
            length: 2.053,
            audio: new Audio(soHappy),
            categories: ['Morris']
        },
        imSorry: {
            id: 'imSorry',
            title: `Oh, I'm sorry.`,
            start: 14.326,
            length: 1.504,
            audio: new Audio(imSorry),
            categories: ['Morris']
        },
        hurtingMe: {
            id: 'hurtingMe',
            title: `You're hurting me.`,
            start: 19.144,
            length: 1.791,
            audio: new Audio(hurtingMe),
            categories: ['Morris']
        },
        deliciousChicken: {
            id: 'deliciousChicken',
            title: `I like delicious chicken.`,
            start: 23.750,
            length: 1.520,
            audio: new Audio(deliciousChicken),
            categories: ['Greg']
        },
        ohMyGoodness: {
            id: 'ohMyGoodness',
            title: `Oh my goodness.`,
            start: 28.353,
            length: 1.595,
            audio: new Audio(ohMyGoodness),
            categories: ['Greg']
        },
        shawnTopTen: {
            id: 'shawnTopTen',
            title: `I don't know if I have Shawn top ten.`,
            start: 32.882,
            length: 1.552,
            audio: new Audio(shawnTopTen),
            categories: ['Greg']
        },
        itsProfessionalWrestling: {
            id: 'itsProfessionalWrestling',
            title: `It's professional wrestling.`,
            start: 36.983,
            length: 1.945,
            audio: new Audio(itsProfessionalWrestling),
            categories: ['Greg']
        },
        guyWhoIsJustShady: {
            id: 'guyWhoIsJustShady',
            title: `He can't get past a guy who's just shady`,
            start: 41.835,
            length: 2.149,
            audio: new Audio(guyWhoIsJustShady),
            categories: ['Greg']
        },
        thanksForNothingShaq: {
            id: 'thanksForNothingShaq',
            title: 'Thanks for nothing, Shaq.',
            start: 46.823,
            length: 2.108,
            audio: new Audio(thanksForNothingShaq),
            categories: ['Greg']
        },
        replicaBelts: {
            id: 'replicaBelts',
            title: 'People buy replica belts all the time.',
            start: 51.778,
            length: 2.789,
            audio: new Audio(replicaBelts),
            categories: ['Greg']
        },
        majOr: {
            id: 'majOr',
            title: 'Maj-or',
            start: 57.879,
            length: 0.845,
            audio: new Audio(majOr),
            categories: ['Dip']
        },
        mmmMaj: {
            id: 'mmmMaj',
            title: 'M-m-m-maj',
            start: 61.838,
            length: 1.261,
            audio: new Audio(mmmMaj),
            categories: ['Dip']
        },
        theMajesty: {
            id: 'theMajesty',
            title: 'The Majesty',
            start: 66.485,
            length: 1.463,
            audio: new Audio(theMajesty),
            categories: ['Dip']
        },
        mmmMail: {
            id: 'mmmMail',
            title: 'M-m-m-mail',
            start: 71.025,
            length: 2.317,
            audio: new Audio(mmmMail),
            categories: ['Dip']
        }
    }
}