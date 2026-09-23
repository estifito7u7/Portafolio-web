import { useLanguage } from './useLocalization';
import { getBio } from '../data/bio';
import { getSkills } from '../data/skills';
import { getExperiences } from '../data/experience';
import { getEducation } from '../data/education';
import { getProjects } from '../data/projects';

export default function usePortfolio() {
  const { t } = useLanguage();
  return {
    bio: getBio(t),
    skills: getSkills(t),
    experiences: getExperiences(t),
    education: getEducation(t),
    projects: getProjects(t),
  };
}
