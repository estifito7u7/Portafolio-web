import { useLanguage } from "../I18n/hooks/useLocalization";

const Constants = () => {
    const { t } = useLanguage();

    const bio = {
        name: "Michael Fernandez",
        roles: [
            "Full Stack Developer",
            "Android Developer",
            "Programador",
        ],
        description: t("hero.description"),
        github: "https://github.com/estifito7u7",
        resume: "https://drive.google.com/file/d/1U1YRyrriEOirUIKRJNUU9Rh06uFPNdjZ/view?usp=sharing",
        linkedin: "https://www.linkedin.com/in/michael-fernández-garcia-177050233",
        insta: "https://www.instagram.com/_estifito_/",
        facebook: "https://www.facebook.com/profile.php?id=100028719188043",
    };

    const skills = [
      {
        title: "Frontend",
        skills: [
          { name: "React Js", image: "/assets/img/react.png" },
          { name: "Redux", image: "/assets/img/redux.png" },
          { name: "Typescript", image: "/assets/img/typescript.png" },
          { name: "Angular Js", image: "/assets/img/angular.png" },
          { name: "HTML", image: "/assets/img/html5.png" },
          { name: "CSS", image: "/assets/img/css.png" },
          { name: "JavaScript", image: "/assets/img/javascript.png" },
          { name: "Bootstrap", image: "/assets/img/bootstrap.png" },
          { name: "Material UI", image: "/assets/img/material.png" },
        ],
      },
      {
        title: "Backend",
        skills: [
          { name: "Node Js", image: "/assets/img/node.png" },
          { name: "Express Js", image: "/assets/img/express.png" },
          { name: "Python", image: "/assets/img/python.png" },
          { name: "Django", image: "/assets/img/django.png" },
          { name: "MySQL", image: "/assets/img/mysql.png" },
          { name: "Postgresql", image: "/assets/img/postgres.png" },
          { name: "MongoDB", image: "/assets/img/mongo.png" },
          { name: "Firebase", image: "/assets/img/firebase.png" },
        ],
      },
      {
        title: "Android",
        skills: [
          { name: "Java", image: "/assets/img/java.png" },
          { name: "Android Studio", image: "/assets/img/android.png" },
        ],
      },
      {
        title: "Otros",
        skills: [
          { name: "Git", image: "/assets/img/git.png" },
          { name: "GitHub", image: "/assets/img/github.png" },
          { name: "Netlify", image: "/assets/img/netlify.png" },
          { name: "VS Code", image: "/assets/img/code.png" },
          { name: "Postman", image: "/assets/img/postman.png" },
          { name: "Jira", image: "/assets/img/jira.png" },
          { name: "Figma", image: "/assets/img/figma.png" },
        ],
      },
    ];
    

      const experiences = [

        {
          id: 0,
          img: "/assets/img/istmo.jpg",
          role: "experience.experience1_role",
          company: "Istmo Center",
          date: "Oct 2022 - En 2025",
          desc: t("experience.experience1_desc"), 
          
          skills: [
            "ReactJS",
            "Django",
            "VueJs",
            "Material UI",
            "HTML",
            "CSS",
            "JavaScript",
            "PHP",
          ],
          
        },
       
        {
          id: 1,
          img: "/assets/img/lose_job.jpg",
          role: "Pronto",
          company: "Pronto",
          date: "Pronto",
          desc: `
Pronto         
          
          `,
          skills: [
            "ReactJS",
            "Django",
            "VueJs",
            "Material UI",
            "HTML",
            "CSS",
            "JavaScript",
            "PHP",
          ],
          
        },
       
      ];

      const education = [
        {
          id: 0,
          img: "/assets/img/ctp.png",
          school: "Colegio Técnico Profesional de Aserrí",
          date: "Feb 2019 - Sep 2022",
        
          desc: t("education.school1_desc"),
          degree: t("education.school1_degree"),
        },
        {
          id: 1,
          img: "/assets/img/liceo.jpeg",
          school: "Liceo de Aserri",
          date: "Feb 2015 - Nov 2018",
          
          desc: t("education.school2_desc"),
          degree: t("education.school2_degree"),
        },
        {
          id: 2,
          img: "/assets/img/escuela.jpg",
          school: "Escuela Manuel Hidalgo",
          date: "Feb 2010 - Apr 2015",
         
          desc: t("education.school3_desc"),
          degree: t("education.school3_degree"),
        },
      ];

    
    return { bio, skills , experiences ,education};
};

export default Constants;