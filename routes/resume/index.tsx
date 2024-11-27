import { Fragment } from "preact";

function Resume() {
  const userInfos = [
    {
      id: "email",
      value: "minmax.w1024@gmail.com",
      icon: "/sns_email.png",
    },
    {
      id: "linkedin",
      value: "linkedin.com/in/maxwellwang-dev",
      icon: "/sns_linkedin.png",
    },
    // {
    //   id: "phone",
    //   value: "778-990-0190",
    //   icon: "/phone.png",
    // },
    {
      id: "address",
      value: "New Westminster, BC",
      icon: "/map.png",
    },
  ];
  const languages = ["TypeScript", "JavaScript", "HTML", "CSS"];

  const frameworks = [
    "React",
    "Next.js",
    "Redux/Zustand",
    "Sass/Less/TailwindCSS",
    "Webpack/Vite",
    "Node.js",
    "Express.js",
    "Vue/Vuex",
    "Git/SVN",
    "Jest",
  ];

  const additionalSkills = [
    "React Native",
    "Swift",
    "Objective-C",
    "PHP/Yii",
    "SQL",
    "Docker",
    "Linux",
  ];
  // const tools = ["Git/SVN", "Linux", "Docker"];

  const experiences = [
    {
      job: "Front End Engineer",
      address: "Vancouver, British Columbia, Canada",
      company: "Deepcoin",
      link: "https://www.deepcoin.com",
      date: "Oct 2022 - Present",
      descriptions: [
        "Developed responsive, high-quality UI/UX implementations using React.js and Vue.js for both mobile and desktop platforms.",
        "Built and deployed three B2B ReactJS projects with Server-Side Rendering (SSR) using TypeScript, Next.js, TailwindCSS, and Node.js, enhancing user experience and performance.",
        "Created reusable React components and hooks, reducing development time by 30% in future projects.",
        "Revamped the company's front-end infrastructure, redesigning the CLI, Node.js packaging scripts, and development toolchain from the ground up.",
        "Developed over three web crawlers using NodeJS and Cheerio, providing real-time crypto news to support our AI application.",
        "Hosted a series of internal technical sharing sessions to increase the enthusiasm and technical skills of the team members.",
      ],
    },
    {
      job: "Front End Engineer",
      address: "Hangzhou, Zhejiang, China",
      company: "NoCode Inc",
      link: "https://www.nocode.com",
      date: "May 2020 - June 2022",
      descriptions: [
        "Contributed high-quality JavaScript code for a web application which has 1M daily active users as its major developer, ensured the product never broke down in the past two years.",
        "Optimized the project's compile time from 3+ minutes to less than 30 seconds through code refactoring and architecture migration.",
        "Successfully migrated legacy projects with over 100,000 lines of code from JavaScript to TypeScript and rewrote the compilation toolchain.",
        "Significantly enhanced team effectiveness by developing several utils: version update notification, GitLab report, 1-click CDN upload, 1-click packaging and publishing.",
        "Created and launched 3+ Golang-based crawler projects, gathering more than 200,000 pieces of data.",
      ],
    },
    {
      job: "Front End Engineer",
      address: "Hangzhou, Zhejiang, China",
      company: "Gezbox Inc",
      date: "Oct 2016 - Mar 2020",
      descriptions: [
        "Released 4+ React Native apps and 3+ websites with React/Redux/NextJS.",
        "Collaborated with UX/UI teams, developed 20+ common React UI components with TypeScript/Less, used by 70+ pages in different products.",
        "Encapsulated npm package about Baidu/Google Map API and Translate API, providing a seamless international experience for customers in different countries.",
        "Built the Gitlab CI workflow from scratch, saving at least 1 hour of compile time per day for my teammates.",
        "Using SQLite to add local cache for the company's in-house Mac desktop app, reducing load time by 75%.",
      ],
    },
    {
      job: "iOS Developer",
      address: "Beijing, China",
      company: "Beijing JianKeYan Software Inc",
      date: "Sep 2015 - Sep 2016",
      descriptions: [
        "Collaborated with app designers, back-end developers and UX designers to design, build, test and improve the company's iOS client.",
      ],
    },
    {
      job: "iOS Developer",
      address: "Beijing, China",
      company: "Beijing DAOEASY Science And Technology Co.,Ltd",
      date: "June 2013 - Sep 2015",
      descriptions: [
        "Worked alongside product managers and designers to define a rich iOS experience for the user. Developed and released a social network iOS application.",
      ],
    },
  ];

  const education = {
    title: "BACHELOR OF INFORMATION AND COMPUTATIONAL SCIENCE",
    date: "Sep 2009 - June 2013",
    school: "Henan Agricultural University ",
  };

  return (
    <article class="flex flex-col bg-white px-11 py-11 relative box-border font-alegreya">
      <section class="flex flex-col mb-4">
        <h1 class="text-4xl font-bold mb-2 font-resume">MAXWELL WANG</h1>
        <p class="text-base text-slate-700 mb-2">Front End Engineer</p>
        <div class="flex flex-row items-center flex-wrap">
          {userInfos.map((info) => (
            <Fragment key={info.id}>
              <div
                key={info.id}
                class="flex flex-row items-center py-2 px-3 bg-primary mr-3 mb-2 rounded-sm text-white"
              >
                <div class="h-5 w-5 rounded-[10px] bg-white flex items-center justify-center mr-3  flex-shrink-0">
                  <img
                    src={info.icon}
                    alt="info.id"
                    class="h-3 w-3"
                  />
                </div>
                {info.id === "email" && (
                  <a
                    href={`mailto:${info.value}`}
                    class="text-neutral-content text-xs underline"
                  >
                    {info.value}
                  </a>
                )}
                {(info.id === "phone" || info.id === "address") && (
                  <span class="text-xs">{info.value}</span>
                )}
                {info.id === "linkedin" && (
                  <a
                    href={`https://${info.value}`}
                    class="text-neutral-content text-xs underline"
                  >
                    {info.value}
                  </a>
                )}
              </div>
              {info.id === "linkedin" && (
                <div class="hidden print:block print:w-full"></div>
              )}
            </Fragment>
          ))}
        </div>
      </section>
      <section class="flex flex-col mb-4 max-w-[1200px]">
        <h2 class="text-2xl font-bold mb-2">PROFILE</h2>
        <div class="w-24 h-[2px] bg-secondary round-[1px] mb-2"></div>
        <p class="text-sm">
          A highly experienced and driven software engineer with over nine years
          of expertise in developing modern websites and iOS applications. Known
          for a strong sense of responsibility and adaptability, I have
          successfully collaborated with teams of all sizes, consistently
          delivering efficient, scalable, and maintainable code.
        </p>
      </section>
      <section class="flex flex-col mb-4">
        <h2 class="text-2xl font-bold mb-2">SKILLS</h2>
        <div class="w-20 h-[2px] bg-secondary round-[1px] mb-2"></div>
        <h3 class="text-lg font-semibold mb-1 font-resume">Languages</h3>
        <div class="flex flex-row items-center mb-1 flex-wrap">
          {languages.map((language) => (
            <div
              key={language}
              class="flex flex-row items-center py-1 px-2 bg-secondary mr-3 mb-1 rounded-sm"
            >
              <span class="text-xs text-[#F6F5F5] font-normal">
                {language}
              </span>
            </div>
          ))}
        </div>
        <h3 class="text-lg font-semibold mb-1 font-resume">
          Frameworks and Tools
        </h3>
        <div class="flex flex-row items-center mb-1 flex-wrap">
          {frameworks.map((framework) => (
            <div
              key={framework}
              class="flex flex-row items-center py-1 px-2 bg-secondary mr-3 mb-1 rounded-sm"
            >
              <span class="text-xs text-[#F6F5F5] font-normal">
                {framework}
              </span>
            </div>
          ))}
        </div>
        <h3 class="text-lg font-semibold mb-1 font-resume">
          Additional Skills
        </h3>
        <div class="flex flex-row items-center mb-1 flex-wrap">
          {additionalSkills.map((skill) => (
            <div
              key={skill}
              class="flex flex-row items-center py-1 px-2 bg-secondary mr-3 mb-1 rounded-sm"
            >
              <span class="text-xs text-[#F6F5F5] font-normal">
                {skill}
              </span>
            </div>
          ))}
        </div>
        {
          /* <h3 class="text-lg font-semibold mb-1">Tools</h3>
          <div class="flex flex-row items-center flex-wrap">
            {tools.map((tool) => (
              <div
                key={tool}
                class="flex flex-row items-center py-1 px-2 bg-secondary mr-3 mb-1"
              >
                <span class="text-xs text-slate-600 font-normal">{tool}</span>
              </div>
            ))}
          </div> */
        }
      </section>
      <section class="max-w-[1200px]">
        <h2 class="text-2xl font-bold mb-2">EXPERIENCES</h2>
        <div class="w-36 h-[2px] bg-secondary round-[1px] mb-2 first:print:break-before-page">
        </div>
        {experiences.map((experience) => (
          <div key={experience.company} class="flex flex-col mb-2">
            <div class="flex flex-row items-center font-semibold text-base mb-1 font-resume">
              <span class="mr-1">{experience.job},</span>
              <span>{experience.address}</span>
            </div>
            <div class="flex flex-row items-center mb-2">
              {experience.link
                ? (
                  <a
                    href={experience.link}
                    class="text-sm text-accent mr-2 cursor-pointer"
                  >
                    {experience.company}
                  </a>
                )
                : (
                  <span class="text-sm text-slate-600 mr-2">
                    {experience.company}
                  </span>
                )}
              <span class="text-sm text-slate-400">{experience.date}</span>
            </div>
            <ul class="list-disc list-inside text-slate-800 mb-2">
              {experience.descriptions.map((description) => (
                <li key={description} class="mb-1 text-sm">
                  {description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section class="flex flex-col">
        <h2 class="text-2xl font-bold mb-2">EDUCATION</h2>
        <div class="w-20 h-[2px] bg-secondary round-[1px] mb-2"></div>
        <h3 class="font-semibold text-base font-resume">
          {education.title}
        </h3>
        <div class="flex flex-row items-center mb-1">
          <span class="text-sm text-slate-600 mr-3">
            {education.school}
          </span>
          <span class="text-sm text-slate-400">{education.date}</span>
        </div>
      </section>
    </article>
  );
}

export default Resume;
