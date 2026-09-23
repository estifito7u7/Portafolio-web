import type { Translate } from '../types/translation';

export const getExperiences = (t: Translate) => [
  {
    id: 0,
    img: '/assets/img/istmo.webp',
    role: 'experience.experience1_role',
    company: 'Istmo Center',
    date: t('experience.experience1_date'),
    desc: t('experience.experience1_desc'),

    skills: ['ReactJS', 'Django', 'VueJs', 'Material UI', 'HTML', 'CSS', 'JavaScript', 'PHP'],
  },

  {
    id: 1,
    img: '/assets/img/lose_job.webp',
    role: t('experience.coming_soon'),
    company: t('experience.coming_soon'),
    date: t('experience.coming_soon'),
    desc: t('experience.coming_soon'),
    skills: ['ReactJS', 'Django', 'VueJs', 'Material UI', 'HTML', 'CSS', 'JavaScript', 'PHP'],
  },
];
