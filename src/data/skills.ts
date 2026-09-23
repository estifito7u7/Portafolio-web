import type { Translate } from '../types/translation';

export const getSkills = (t: Translate) => [
  {
    title: 'Frontend',
    skills: [
      { name: 'React Js', image: '/assets/img/react.webp' },
      { name: 'Redux', image: '/assets/img/redux.webp' },
      { name: 'Typescript', image: '/assets/img/typescript.webp' },
      { name: 'Angular Js', image: '/assets/img/angular.webp' },
      { name: 'HTML', image: '/assets/img/html5.webp' },
      { name: 'CSS', image: '/assets/img/css.webp' },
      { name: 'JavaScript', image: '/assets/img/javascript.webp' },
      { name: 'Bootstrap', image: '/assets/img/bootstrap.webp' },
      { name: 'Material UI', image: '/assets/img/material.webp' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node Js', image: '/assets/img/node.webp' },
      { name: 'Express Js', image: '/assets/img/express.webp' },
      { name: 'Python', image: '/assets/img/python.webp' },
      { name: 'Django', image: '/assets/img/django.webp' },
      { name: 'MySQL', image: '/assets/img/mysql.webp' },
      { name: 'Postgresql', image: '/assets/img/postgres.webp' },
      { name: 'MongoDB', image: '/assets/img/mongo.webp' },
      { name: 'Firebase', image: '/assets/img/firebase.webp' },
    ],
  },
  {
    title: 'Android',
    skills: [
      { name: 'Java', image: '/assets/img/java.webp' },
      { name: 'Android Studio', image: '/assets/img/android.webp' },
    ],
  },
  {
    title: t('skills.other'),
    skills: [
      { name: 'Git', image: '/assets/img/git.webp' },
      { name: 'GitHub', image: '/assets/img/github.webp' },
      { name: 'Netlify', image: '/assets/img/netlify.webp' },
      { name: 'VS Code', image: '/assets/img/code.webp' },
      { name: 'Postman', image: '/assets/img/postman.webp' },
      { name: 'Jira', image: '/assets/img/jira.webp' },
      { name: 'Figma', image: '/assets/img/figma.webp' },
    ],
  },
];
