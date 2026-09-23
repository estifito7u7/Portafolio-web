import type { Translate } from '../types/translation';

export const getEducation = (t: Translate) => [
  {
    id: 0,
    img: '/assets/img/ctp.webp',
    school: 'Colegio Técnico Profesional de Aserrí',
    date: t('education.school1_date'),

    desc: t('education.school1_desc'),
    degree: t('education.school1_degree'),
  },
  {
    id: 1,
    img: '/assets/img/liceo.webp',
    school: 'Liceo de Aserri',
    date: t('education.school2_date'),

    desc: t('education.school2_desc'),
    degree: t('education.school2_degree'),
  },
  {
    id: 2,
    img: '/assets/img/escuela.webp',
    school: 'Escuela Manuel Hidalgo',
    date: t('education.school3_date'),

    desc: t('education.school3_desc'),
    degree: t('education.school3_degree'),
  },
];
