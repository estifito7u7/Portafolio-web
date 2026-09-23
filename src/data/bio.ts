import type { Translate } from '../types/translation';

export const getBio = (t: Translate) => ({
  name: 'Michael Fernandez',
  roles: ['Full Stack', 'Android', 'Python', 'Java', 'C# .Net'],
  description: t('hero.description'),
  github: 'https://github.com/estifito7u7',
  resume: 'https://drive.google.com/file/d/1U1YRyrriEOirUIKRJNUU9Rh06uFPNdjZ/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/michael-fernández-garcia-177050233',
  insta: 'https://www.instagram.com/_estifito_/',
  facebook: 'https://www.facebook.com/profile.php?id=100028719188043',
});
