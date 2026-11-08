// Shared content for the /v1 (contact sheet) and /v2 (command palette) redesigns.
// Both versions read from this one file, so copy edits only need to happen here.

import aurora from "../images/web/aurora.jpg";
import bikes from "../images/web/bikes.jpg";
import bridge from "../images/web/bridge.jpg";
import dawn from "../images/web/dawn.jpg";
import dusk from "../images/web/dusk.jpg";
import flower from "../images/web/flower.jpg";
import fog from "../images/web/fog.jpg";
import lighthouse from "../images/web/lighthouse.jpg";
import milkyway from "../images/web/milkyway.jpg";
import pier from "../images/web/pier.jpg";
import skyline from "../images/web/skyline.jpg";
import train from "../images/web/train.jpg";
import headshotImg from "../icons/sreekar.jpeg";
import resumePdf from "../resume/Sreekar-Resume.pdf";

export const headshot: string = headshotImg;
export const resume: string = resumePdf;

export const person = {
  name: "Sai Sreekar Siddula",
  shortName: "Sreekar",
  role: "Senior Software Engineer",
  location: "Boston, MA",
  email: "ssiddula.jobs@gmail.com",
  linkedin: "https://linkedin.com/in/sreekarsiddula",
  linkedinHandle: "sreekarsiddula",
  github: "https://github.com/sreekar-ss",
  githubHandle: "sreekar-ss",
};

export type Photo = { id: string; title: string; src: string };

export const photos: Photo[] = [
  { id: "aurora", title: "Aurora", src: aurora },
  { id: "dawn", title: "Nubble at Dawn", src: dawn },
  { id: "milkyway", title: "Milky Way", src: milkyway },
  { id: "lighthouse", title: "Portland Head Light", src: lighthouse },
  { id: "bridge", title: "Brooklyn Bridge", src: bridge },
  { id: "skyline", title: "Boston", src: skyline },
  { id: "fog", title: "Manhattan Bridge", src: fog },
  { id: "train", title: "Conway Scenic Railroad", src: train },
  { id: "dusk", title: "Dusk", src: dusk },
  { id: "pier", title: "Quincy Pier", src: pier },
  { id: "bikes", title: "Biker Gang", src: bikes },
  { id: "flower", title: "Daisy", src: flower },
];

export const photoById = (id: string): Photo =>
  photos.find((p) => p.id === id) as Photo;

export type Job = {
  id: string;
  title: string;
  org: string;
  location: string;
  period: string;
  years: string;
  headline: string;
  summary: string;
  big?: string;
  bigLabel?: string;
  points: string[];
  tags: string[];
};

export const jobs: Job[] = [
  {
    id: "cvs",
    title: "Senior Software Engineer",
    org: "Branding Brand, for CVS Health",
    location: "Boston, MA",
    period: "Jan 2025 – present",
    years: "2025 → now",
    headline: "Modernizing a pharmacy app used in 10,000 stores",
    summary:
      "Helping rebuild the legacy Java pharmacy application CVS Health stores run on, in React, on workflows behind millions of prescriptions a day.",
    big: "10,000",
    bigLabel: "stores use this app",
    points: [
      "Rebuilding core workflows of CVS Health’s legacy Java pharmacy app in React, used across 10,000 stores",
      "Improved workflow efficiency by about 30% in high-traffic areas by cutting component re-renders",
      "Reduced duplicate UI logic by 40% across prescriber flows with reusable, accessible patterns",
      "Mentor 2–3 junior developers weekly on architecture, code quality, and best practices",
    ],
    tags: ["React", "Accessibility", "Mentorship", "Scalability"],
  },
  {
    id: "ductus",
    title: "Software Engineer II",
    org: "Ductus",
    location: "Maynard, MA",
    period: "Jun 2021 – Aug 2024",
    years: "2021 → 2024",
    headline: "Ten-plus apps for network automation",
    summary:
      "Built React and Angular applications for a client automating its network operations, and brought the UX design lifecycle into how the team planned work.",
    big: "10+",
    bigLabel: "projects delivered",
    points: [
      "Delivered 10+ React and Angular projects for a client automating its network",
      "Led frontend architecture discussions and raised testing standards with Jest and Testing Library",
      "Brought the UX lifecycle into planning: user flows, Figma wireframes, and usability testing",
      "Introduced Swagger mock servers, GitHub Copilot, and Figma dev mode to cut development time",
    ],
    tags: ["React", "Angular", "Testing", "UX"],
  },
  {
    id: "coop",
    title: "Software Engineer Co-op",
    org: "Ductus",
    location: "Maynard, MA",
    period: "May – Dec 2020",
    years: "2020",
    headline: "Co-op at Ductus",
    summary:
      "An internal CLI that generates AWS CloudFormation templates, and reusable web components that work in any framework.",
    points: [
      "Built an internal CLI that generates AWS CloudFormation templates",
      "Developed reusable vanilla JS web components that work across frameworks",
    ],
    tags: ["AWS", "CLI", "Angular"],
  },
  {
    id: "writer",
    title: "Technical Writer",
    org: "Smartprix",
    location: "Noida, India",
    period: "Sep 2018 – Jan 2019",
    years: "2018",
    headline: "Technical writing at Smartprix",
    summary:
      "Tech news and in-depth product reviews, including explainers on 5G and Wi-Fi 6.",
    points: [
      "Covered tech news and wrote in-depth product reviews, including explainers on 5G and Wi-Fi 6",
    ],
    tags: ["Writing", "Research"],
  },
];

export type Project = {
  id: string;
  slug: string;
  title: string;
  when: string;
  context: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    id: "vector",
    slug: "thevector.dev",
    title: "thevector.dev",
    when: "Now",
    context: "Personal project",
    summary: "An AI-friendly developer blog platform, built with Next.js 15.",
    points: [],
    tags: ["Next.js", "AI"],
    link: "https://thevector.dev",
    linkLabel: "Visit site",
  },
  {
    id: "sushi",
    slug: "sushi-go-ai",
    title: "AI players for Sushi Go",
    when: "2021",
    context: "Northeastern University",
    summary:
      "Game-playing agents built with Minimax and Q-learning, benchmarked against rule-based and random players at each stage of training.",
    points: [
      "Minimax with alpha-beta pruning",
      "Q-learning, including linear function approximation",
    ],
    tags: ["Python", "AI/ML", "Q-Learning"],
    link: "https://github.com/Ryan-Newell/CS5100_SushiGo_AI",
    linkLabel: "Source on GitHub",
  },
  {
    id: "flood",
    slug: "flood-iot",
    title: "Flood control with IoT",
    when: "2020",
    context: "Northeastern University",
    summary:
      "Raspberry Pi sensors send readings over CoAP to Java gateways, which relay them to the cloud and trigger actuators over MQTT.",
    points: [
      "Python on constrained devices, Java on the gateways",
      "Ubidots cloud aggregation, with email alerts to users over SMTP",
    ],
    tags: ["Python", "Java", "MQTT", "CoAP"],
    link: "https://bitbucket.org/sreekar_ss/iot-device/src/master/apps/project/",
    linkLabel: "Source on Bitbucket",
  },
  {
    id: "lms",
    slug: "lms",
    title: "A learning management system, built twice",
    when: "2020",
    context: "Northeastern University",
    summary:
      "The faculty side runs on React, Redux, and Spring with MySQL. The student side runs on Angular, Node.js, and MongoDB. Both deployed on Heroku.",
    points: ["Same product, two complete stacks, side by side"],
    tags: ["React", "Angular", "Node.js", "Spring Boot"],
  },
  {
    id: "alexa",
    slug: "alexa-daycare",
    title: "Alexa voice interface for day care",
    when: "2019",
    context: "Northeastern University",
    summary:
      "A Java MVC app for running a day care, with Alexa intents in Python that answer from its MySQL data.",
    points: [],
    tags: ["Java", "Python", "Alexa Skills"],
  },
  {
    id: "network",
    slug: "global-network",
    title: "Network for a global company",
    when: "2019",
    context: "Northeastern University",
    summary:
      "A simulated multinational network with VLANs, DHCP, OSPF routing, and RSTP and HSRP for redundancy.",
    points: [],
    tags: ["Cisco", "OSPF", "VLAN"],
  },
];

export type Paper = {
  id: string;
  key: string;
  title: string;
  venue: string;
  year: string;
  cites: string;
  authors: string;
  shortAuthors: string;
  summary: string;
};

export const papers: Paper[] = [
  {
    id: "p1",
    key: "siddula2018monitoring",
    title: "Water Level Monitoring and Management of Dams using IoT",
    venue: "IEEE IoT-SIU 2018",
    year: "2018",
    cites: "113",
    authors: "Sai Sreekar Siddula, Phaneendra Babu, P.C. Jain",
    shortAuthors: "Siddula, Babu, Jain",
    summary:
      "Real-time water-level data sent to a central command center that decides when to open the gates.",
  },
  {
    id: "p2",
    key: "siddula2018realtime",
    title: "Real Time Monitoring and Controlling of Water Level in Dams using IoT",
    venue: "IEEE IACC 2018",
    year: "2018",
    cites: "22",
    authors: "Sai Sreekar Siddula, P.C. Jain, Madhur Deo Upadhayay",
    shortAuthors: "Siddula, Jain, Upadhayay",
    summary:
      "Automating dam management, from reading water levels to controlling the gates themselves.",
  },
];

export const totalCitations = papers.reduce((n, p) => n + Number(p.cites), 0);

export type School = {
  id: string;
  school: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
  detail: string;
  coursework: string[];
};

export const schools: School[] = [
  {
    id: "neu",
    school: "Northeastern University",
    degree: "MS, Computer Systems Engineering (IoT)",
    location: "Boston, MA",
    period: "2019 – 2021",
    gpa: "4.0",
    detail:
      "President of NU IoTConnect, graduate student ambassador for the College of Engineering",
    coursework: ["Foundations of AI", "Data Mining", "UX Design", "Web Development"],
  },
  {
    id: "snu",
    school: "Shiv Nadar University",
    degree: "BTech, Electronics and Communication",
    location: "Delhi, India",
    period: "2014 – 2018",
    gpa: "3.7",
    detail: "Minor in computer science, chairperson of the food committee",
    coursework: ["Computer Networks", "Operating Systems", "Data Structures"],
  },
];
